import { useState } from "react";
import { Bell, Save, Globe, Lock, Palette, Mail as MailIcon, Database, Bell as BellIcon, Upload, } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
const AdminSettings = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { toast } = useToast();
    const [general, setGeneral] = useState({
        siteName: "Dharam Vir Infotech",
        tagline: "IT Services & Solutions",
        contactEmail: "info@dharamvir.com",
        contactPhone: "+91 98765 43210",
        address: "Mohali, Punjab, India",
        timezone: "Asia/Kolkata",
        language: "en",
        description: "Leading IT services company specializing in web, mobile and AI development.",
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
    const [smtp, setSmtp] = useState({
        host: "smtp.gmail.com",
        port: "587",
        user: "noreply@dharamvir.com",
        password: "",
        fromName: "Dharam Vir Infotech",
        encryption: "tls",
    });
    const handleSave = (section) => {
        toast({ title: "Settings saved", description: `${section} settings updated successfully.` });
    };
    return (<div className="min-h-screen bg-muted/30 flex">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}/>

      <main className="flex-1 min-h-screen">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your platform configuration</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20}/>
            </button>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">A</div>
          </div>
        </header>

        <div className="p-6 max-w-5xl">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full h-auto">
              <TabsTrigger value="general" className="gap-2"><Globe size={14}/> General</TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2"><BellIcon size={14}/> Notifications</TabsTrigger>
              <TabsTrigger value="security" className="gap-2"><Lock size={14}/> Security</TabsTrigger>
              <TabsTrigger value="email" className="gap-2"><MailIcon size={14}/> Email</TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2"><Palette size={14}/> Appearance</TabsTrigger>
            </TabsList>

            {/* General */}
            <TabsContent value="general" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">General Settings</CardTitle>
                  <CardDescription>Basic information about your site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Site Name</Label>
                      <Input value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Tagline</Label>
                      <Input value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Email</Label>
                      <Input type="email" value={general.contactEmail} onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Phone</Label>
                      <Input value={general.contactPhone} onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}/>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address</Label>
                      <Input value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={general.timezone} onValueChange={(v) => setGeneral({ ...general, timezone: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">America/New_York</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Language</Label>
                      <Select value={general.language} onValueChange={(v) => setGeneral({ ...general, language: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Site Description</Label>
                      <Textarea rows={3} value={general.description} onChange={(e) => setGeneral({ ...general, description: e.target.value })}/>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Site Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-accent font-bold">DV</div>
                      <Button variant="outline" size="sm" className="gap-2"><Upload size={14}/> Upload Logo</Button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("General")} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"><Save size={16}/> Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Notification Preferences</CardTitle>
                  <CardDescription>Choose which alerts you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
            { key: "newInquiry", title: "New Contact Inquiries", desc: "Get notified when a visitor submits the contact form." },
            { key: "newUser", title: "New User Registrations", desc: "Receive an email when a new user signs up." },
            { key: "weeklyReport", title: "Weekly Reports", desc: "A weekly summary of site activity and analytics." },
            { key: "securityAlerts", title: "Security Alerts", desc: "Critical security events such as failed logins." },
            { key: "marketing", title: "Marketing Updates", desc: "Product news and tips from the platform." },
        ].map((item) => (<div key={item.key} className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <Switch checked={notifications[item.key]} onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}/>
                    </div>))}
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("Notification")} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"><Save size={16}/> Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Security Settings</CardTitle>
                  <CardDescription>Protect your platform and admin accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start justify-between gap-4 py-2 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Require 2FA for all admin accounts.</p>
                    </div>
                    <Switch checked={security.twoFactor} onCheckedChange={(v) => setSecurity({ ...security, twoFactor: v })}/>
                  </div>
                  <div className="flex items-start justify-between gap-4 py-2 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground text-sm">Login Alerts</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Email me when a new device logs in.</p>
                    </div>
                    <Switch checked={security.loginAlerts} onCheckedChange={(v) => setSecurity({ ...security, loginAlerts: v })}/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Session Timeout (minutes)</Label>
                      <Input type="number" value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Password Policy</Label>
                      <Select value={security.passwordPolicy} onValueChange={(v) => setSecurity({ ...security, passwordPolicy: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (min 6 chars)</SelectItem>
                          <SelectItem value="medium">Medium (min 8, mixed case)</SelectItem>
                          <SelectItem value="strong">Strong (12+, symbols)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-medium text-foreground text-sm mb-2">Danger Zone</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="gap-2"><Database size={14}/> Export Database</Button>
                      <Button variant="outline" size="sm" className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/10">Revoke All Sessions</Button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("Security")} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"><Save size={16}/> Save Security</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email / SMTP */}
            <TabsContent value="email" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Email (SMTP) Configuration</CardTitle>
                  <CardDescription>Used for transactional emails like password resets and inquiries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMTP Host</Label>
                      <Input value={smtp.host} onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Port</Label>
                      <Input value={smtp.port} onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input value={smtp.user} onChange={(e) => setSmtp({ ...smtp, user: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" placeholder="••••••••" value={smtp.password} onChange={(e) => setSmtp({ ...smtp, password: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>From Name</Label>
                      <Input value={smtp.fromName} onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })}/>
                    </div>
                    <div className="space-y-2">
                      <Label>Encryption</Label>
                      <Select value={smtp.encryption} onValueChange={(v) => setSmtp({ ...smtp, encryption: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => toast({ title: "Test email sent", description: "Check your inbox." })}>Send Test Email</Button>
                    <Button onClick={() => handleSave("Email")} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"><Save size={16}/> Save SMTP</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Appearance</CardTitle>
                  <CardDescription>Customize the look of your admin panel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Light", "Dark", "System"].map((t) => (<button key={t} className="border border-border rounded-lg p-4 text-sm font-medium hover:border-accent hover:bg-accent/5 transition-colors">
                          {t}
                        </button>))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-3">
                      {["bg-accent", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500"].map((c) => (<button key={c} className={`w-9 h-9 rounded-full ${c} ring-offset-2 hover:ring-2 ring-foreground/20`}/>))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("Appearance")} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"><Save size={16}/> Save Appearance</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>);
};
export default AdminSettings;
