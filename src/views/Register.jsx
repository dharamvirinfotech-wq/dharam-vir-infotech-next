import { useState } from "react";
import { Link, useNavigate } from "@/lib/router-compat";
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, UserPlus, Shield, Loader2 } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/axios";
const oauthUrl = (provider) => `${API_BASE_URL.replace(/\/$/, "")}/auth/${provider}`;
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [enable2FA, setEnable2FA] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        fullName: "", email: "", phone: "", password: "", confirmPassword: "", role: "employee", companyName: "",
    });
    const { toast } = useToast();
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
            return;
        }
        if (form.password.length < 8) {
            toast({ title: "Weak password", description: "Password must be at least 8 characters.", variant: "destructive" });
            return;
        }
        setSubmitting(true);
        try {
            const user = await register({
                full_name: form.fullName,
                email: form.email,
                phone: form.phone || undefined,
                password: form.password,
                role: form.role,
                company_name: form.companyName || undefined,
                two_factor_enabled: enable2FA,
            });
            toast({ title: "User created successfully", description: `Welcome, ${user.full_name}! Your account has been created.` });
            if (user.role === "admin")
                navigate("/panel/admin", { replace: true });
            else
                navigate("/panel/user", { replace: true });
        }
        catch (err) {
            toast({
                title: "Registration failed",
                description: err instanceof Error ? err.message : "Please try again.",
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
        <div className="w-full max-w-lg">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-accent" size={28}/>
              </div>
              <h1 className="text-2xl font-bold text-primary">Create Account</h1>
              <p className="text-muted-foreground text-sm mt-1">Join Dharam Vir Infotech</p>
            </div>

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a href={oauthUrl("google")} className="flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 px-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </a>
              <a href={oauthUrl("facebook")} className="flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg py-2.5 px-3 text-sm font-medium hover:bg-[#166FE5] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground uppercase">Or register with email</span></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="fullName" name="fullName" placeholder="John Doe" className="pl-10" value={form.fullName} onChange={handleChange} required/>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-10" value={form.email} onChange={handleChange} required/>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 8750 299 299" className="pl-10" value={form.phone} onChange={handleChange} required/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                    <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={form.password} onChange={handleChange} required/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                    <Input id="confirmPassword" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={form.confirmPassword} onChange={handleChange} required/>
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirm ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select id="role" name="role" value={form.role} onChange={handleChange} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">                    
                    <option value="employee">Employee</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                    <Input id="companyName" name="companyName" placeholder="Your Company" className="pl-10" value={form.companyName} onChange={handleChange}/>
                  </div>
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <Shield className="text-accent flex-shrink-0" size={20}/>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Enable Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Recommended for extra security</p>
                </div>
                <button type="button" onClick={() => setEnable2FA(!enable2FA)} className={`w-11 h-6 rounded-full transition-colors relative ${enable2FA ? "bg-accent" : "bg-border"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enable2FA ? "left-[22px]" : "left-0.5"}`}/>
                </button>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1 rounded border-border"/>
                <span className="text-xs text-muted-foreground">
                  I agree to the <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                </span>
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                {submitting ? <Loader2 className="animate-spin" size={18}/> : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>);
};
export default Register;
