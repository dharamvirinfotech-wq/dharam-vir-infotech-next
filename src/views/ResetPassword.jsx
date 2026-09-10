import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "@/lib/router-compat";
import { Eye, EyeOff, Lock, Loader2, ShieldCheck } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
const ResetPassword = () => {
    const [params] = useSearchParams();
    const token = params.get("token") ?? "";
    const navigate = useNavigate();
    const { toast } = useToast();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [show, setShow] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast({ title: "Invalid link", description: "Reset token is missing or expired.", variant: "destructive" });
            return;
        }
        if (password.length < 8) {
            toast({ title: "Weak password", description: "Password must be at least 8 characters.", variant: "destructive" });
            return;
        }
        if (password !== confirm) {
            toast({ title: "Passwords don't match", description: "Please confirm your new password.", variant: "destructive" });
            return;
        }
        setSubmitting(true);
        try {
            await api.post("/auth/reset-password", { token, password });
            toast({ title: "Password updated", description: "You can now sign in with your new password." });
            navigate("/login", { replace: true });
        }
        catch (err) {
            toast({
                title: "Reset failed",
                description: err instanceof Error ? err.message : "Reset link may have expired.",
                variant: "destructive",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<div className="min-h-screen flex flex-col bg-background">
      <AnimatedNavbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-accent" size={28}/>
              </div>
              <h1 className="text-2xl font-bold text-primary">Reset Password</h1>
              <p className="text-muted-foreground text-sm mt-1">Choose a strong new password for your account.</p>
            </div>

            {!token && (<div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                This reset link is invalid or has expired. Please request a new one.
              </div>)}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required/>
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">At least 8 characters.</p>
              </div>

              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="confirm" type={show ? "text" : "password"} placeholder="••••••••" className="pl-10" value={confirm} onChange={(e) => setConfirm(e.target.value)} required/>
                </div>
              </div>

              <Button type="submit" disabled={submitting || !token} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                {submitting ? <Loader2 className="animate-spin" size={18}/> : "Update Password"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Remembered your password?{" "}
              <Link to="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>);
};
export default ResetPassword;
