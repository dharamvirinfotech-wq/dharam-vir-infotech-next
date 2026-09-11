import { useState, useEffect } from "react";
import { 
  Bell, Save, Globe, Lock, Palette, Mail as MailIcon, Database, 
  Upload, CheckCircle2, RefreshCw, Send, ShieldCheck, AlertCircle 
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { emailApi } from "@/lib/api";

const AdminSettings = () => {
  const { toast } = useToast();

  const [general, setGeneral] = useState({
    siteName: "Dharam Vir Infotech",
    tagline: "Next-Gen IT Services & Engineering",
    contactEmail: "info@dharamvirinfotech.com",
    contactPhone: "+91 98765 43210",
    address: "Mohali, Punjab, India",
    timezone: "Asia/Kolkata",
    language: "en",
    description: "Leading IT services company specializing in web, mobile, and enterprise AI engineering.",
  });

  const [notifications, setNotifications] = useState({
    newInquiry: true,
    newUser: true,
    weeklyReport: false,
    securityAlerts: true,
    marketing: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30",
    passwordPolicy: "strong",
  });

  // SMTP Settings directly saved to database
  const [smtp, setSmtp] = useState({
    host: "smtp.gmail.com",
    port: "465",
    user: "mukesh.vin99@gmail.com",
    password: "",
    fromName: "Dharam Vir Infotech",
    adminNotifyEmail: "mukesh.vin99@gmail.com",
    secure: "true",
  });

  const [loadingSmtp, setLoadingSmtp] = useState(false);
  const [savingSmtp, setSavingSmtp] = useState(false);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testEmailTarget, setTestEmailTarget] = useState("");

  // Load SMTP from DB on mount
  useEffect(() => {
    const fetchSmtp = async () => {
      setLoadingSmtp(true);
      try {
        const res = await emailApi.getSettings();
        if (res.success && res.settings) {
          const s = res.settings;
          setSmtp({
            host: s.smtp_host || "smtp.gmail.com",
            port: s.smtp_port || "465",
            user: s.smtp_user || "mukesh.vin99@gmail.com",
            password: s.smtp_password || "",
            fromName: s.smtp_from_name || "Dharam Vir Infotech",
            adminNotifyEmail: s.admin_notify_email || "mukesh.vin99@gmail.com",
            secure: s.smtp_secure ? "true" : "false",
          });
          setTestEmailTarget(s.admin_notify_email || s.smtp_user || "");
        }
      } catch (err) {
        console.warn("Could not fetch remote SMTP settings, using default state", err);
      } finally {
        setLoadingSmtp(false);
      }
    };
    fetchSmtp();
  }, []);

  const handleSaveSmtp = async () => {
    setSavingSmtp(true);
    try {
      const res = await emailApi.saveSettings({
        smtp_host: smtp.host,
        smtp_port: smtp.port,
        smtp_user: smtp.user,
        smtp_password: smtp.password,
        smtp_from_name: smtp.fromName,
        admin_notify_email: smtp.adminNotifyEmail,
        smtp_secure: smtp.secure === "true",
      });

      if (res.success) {
        toast({
          title: "SMTP Settings Saved",
          description: "Sending credentials updated directly in database. Emails will use this account.",
        });
      }
    } catch (err) {
      toast({
        title: "Failed to save SMTP",
        description: err?.response?.data?.message || "Could not save email settings.",
        variant: "destructive",
      });
    } finally {
      setSavingSmtp(false);
    }
  };

  const handleTestSmtp = async () => {
    if (!testEmailTarget.trim()) {
      toast({ title: "Recipient required", description: "Please enter an email address to send the test email to.", variant: "destructive" });
      return;
    }

    setTestingSmtp(true);
    try {
      const res = await emailApi.testSmtp({
        testEmail: testEmailTarget.trim(),
        smtp_user: smtp.user,
        smtp_password: smtp.password,
        smtp_host: smtp.host,
        smtp_port: smtp.port,
        smtp_from_name: smtp.fromName,
      });

      if (res.success) {
        toast({
          title: "Test Email Dispatched!",
          description: res.message || `Delivered test verification message to ${testEmailTarget}. Please check inbox/spam.`,
        });
      }
    } catch (err) {
      toast({
        title: "SMTP Connection Failed",
        description: err?.response?.data?.message || err?.message || "Verify your Gmail Address & Google App Password.",
        variant: "destructive",
      });
    } finally {
      setTestingSmtp(false);
    }
  };

  const handleSave = (section) => {
    toast({ title: "Settings saved", description: `${section} preferences updated successfully.` });
  };

  return (
    <AdminLayout
      title="Admin Settings"
      subtitle="Configure platform settings, SMTP emails, notifications & security"
    >
      <div className="max-w-5xl">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full h-auto p-1 bg-slate-100 dark:bg-slate-900 border border-border rounded-xl">
              <TabsTrigger value="email" className="gap-2 py-2 font-semibold">
                <MailIcon size={15} /> Email (SMTP)
              </TabsTrigger>
              <TabsTrigger value="general" className="gap-2 py-2 font-semibold">
                <Globe size={15} /> General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 py-2 font-semibold">
                <Bell size={15} /> Alerts
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 py-2 font-semibold">
                <Lock size={15} /> Security
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2 py-2 font-semibold">
                <Palette size={15} /> Theme
              </TabsTrigger>
            </TabsList>

            {/* Email / SMTP Configuration */}
            <TabsContent value="email" className="mt-6 space-y-6">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <MailIcon size={18} className="text-amber-500" />
                        Live Gmail / SMTP Account Configuration
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Control which Gmail email address dispatches Welcome Mails to clients and receives lead alerts.
                      </CardDescription>
                    </div>
                    {loadingSmtp && <RefreshCw size={16} className="animate-spin text-amber-500" />}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
                    <ShieldCheck size={18} className="text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Active Sending Account Configured</p>
                      <p className="mt-0.5">
                        Emails are sent from <strong>{smtp.user || "mukesh.vin99@gmail.com"}</strong>. You can change the sender email and Google App Password here at any time. Changes are stored in MySQL and take effect instantly.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Gmail Sender Address (MAIL_USER)</Label>
                      <Input
                        type="email"
                        placeholder="e.g. mukesh.vin99@gmail.com"
                        value={smtp.user}
                        onChange={(e) => setSmtp({ ...smtp, user: e.target.value })}
                        className="font-mono text-xs"
                      />
                      <p className="text-[11px] text-muted-foreground">The Gmail address used to authenticate and send.</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Google App Password (MAIL_PASS)</Label>
                      <Input
                        type="text"
                        placeholder="16-character app password (e.g. ntff lcpo esyc jmqp)"
                        value={smtp.password}
                        onChange={(e) => setSmtp({ ...smtp, password: e.target.value })}
                        className="font-mono text-xs"
                      />
                      <p className="text-[11px] text-muted-foreground">16-character Google App Password (2-Step Verification enabled).</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Admin Notification Email</Label>
                      <Input
                        type="email"
                        placeholder="mukesh.vin99@gmail.com"
                        value={smtp.adminNotifyEmail}
                        onChange={(e) => setSmtp({ ...smtp, adminNotifyEmail: e.target.value })}
                        className="font-mono text-xs"
                      />
                      <p className="text-[11px] text-muted-foreground">Admin will receive instant email alerts whenever a new client submits an inquiry.</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Sender Display Name</Label>
                      <Input
                        value={smtp.fromName}
                        onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })}
                        className="text-xs"
                      />
                      <p className="text-[11px] text-muted-foreground">Name shown to clients in inbox (e.g. "Dharam Vir Infotech").</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">SMTP Host</Label>
                      <Input
                        value={smtp.host}
                        onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                        className="font-mono text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">SMTP Port</Label>
                        <Input
                          value={smtp.port}
                          onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
                          className="font-mono text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">SSL / TLS</Label>
                        <Select value={smtp.secure} onValueChange={(v) => setSmtp({ ...smtp, secure: v })}>
                          <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">SSL (Port 465)</SelectItem>
                            <SelectItem value="false">STARTTLS (Port 587)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Test Connection Box */}
                  <div className="p-4 rounded-xl border border-border bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Send size={13} className="text-amber-500" /> Test Live SMTP Delivery
                      </h4>
                      <span className="text-[11px] text-muted-foreground">Verifies handshake & sends sample mail</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter email to receive test message..."
                        value={testEmailTarget}
                        onChange={(e) => setTestEmailTarget(e.target.value)}
                        className="text-xs flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleTestSmtp}
                        disabled={testingSmtp}
                        className="text-xs font-semibold shrink-0 gap-1.5 border-amber-500/30 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      >
                        {testingSmtp ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" /> Verifying Connection...
                          </>
                        ) : (
                          <>
                            <Send size={13} /> Send Test Email
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      onClick={handleSaveSmtp}
                      disabled={savingSmtp}
                      className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6"
                    >
                      {savingSmtp ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save size={15} /> Save SMTP Settings
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* General */}
            <TabsContent value="general" className="mt-6">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base font-bold">General Settings</CardTitle>
                  <CardDescription className="text-xs">Basic information about the platform and brand</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Site Name</Label>
                      <Input value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Tagline</Label>
                      <Input value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Contact Email</Label>
                      <Input type="email" value={general.contactEmail} onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Contact Phone</Label>
                      <Input value={general.contactPhone} onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-xs font-semibold">Address</Label>
                      <Input value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-xs font-semibold">Site Description</Label>
                      <Textarea rows={3} value={general.description} onChange={(e) => setGeneral({ ...general, description: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("General")} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                      <Save size={15} /> Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="mt-6">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Notification Preferences</CardTitle>
                  <CardDescription className="text-xs">Select alerts and email notifications for your admin account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "newInquiry", title: "New Contact Inquiries", desc: "Instant email to Admin whenever a visitor submits contact form." },
                    { key: "newUser", title: "New User Registrations", desc: "Notification whenever a new user or client signs up." },
                    { key: "securityAlerts", title: "Security Alerts", desc: "Critical security events such as multiple failed logins." },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-slate-50/50 dark:bg-slate-800/40">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <Switch checked={notifications[item.key]} onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })} />
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSave("Notification")} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                      <Save size={15} /> Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="mt-6">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Security Settings</CardTitle>
                  <CardDescription className="text-xs">Protect your platform and admin accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-slate-50/50 dark:bg-slate-800/40">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Require 2FA for all administrative accounts.</p>
                    </div>
                    <Switch checked={security.twoFactor} onCheckedChange={(v) => setSecurity({ ...security, twoFactor: v })} />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSave("Security")} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                      <Save size={15} /> Save Security
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="mt-6">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Appearance</CardTitle>
                  <CardDescription className="text-xs">Customize your admin workspace theme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Theme Mode</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Light", "Dark", "System"].map((t) => (
                        <button key={t} className="border border-border rounded-xl p-4 text-xs font-bold hover:border-amber-500 hover:bg-amber-500/5 transition-colors">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </AdminLayout>
  );
};

export default AdminSettings;
