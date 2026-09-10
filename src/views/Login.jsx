import { useState } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/axios";
const oauthUrl = (provider) => `${API_BASE_URL.replace(/\/$/, "")}/auth/${provider}`;
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const user = await login(email, password);
            toast({ title: "Welcome back", description: `Signed in as ${user.full_name}` });
            const from = location.state?.from;
            if (from)
                return navigate(from, { replace: true });
            // Dynamic role-based panel — works for admin, employee, employer, client, etc.
            console.log("User role:", user.role);
            if (user.role === "admin")
                navigate("/panel/admin", { replace: true });
            else
                navigate("/panel/user", { replace: true });
        }
        catch (err) {
            toast({
                title: "Login failed",
                description: err instanceof Error ? err.message : "Please try again.",
                variant: "destructive",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-accent" size={28}/>
              </div>
              <h1 className="text-2xl font-bold text-primary">Welcome Back</h1>
              <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <a href={oauthUrl("google")} className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2.5 px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </a>
              <a href={oauthUrl("facebook")} className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-lg py-2.5 px-4 text-sm font-medium hover:bg-[#166FE5] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Sign in with Facebook
              </a>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground uppercase">Or sign in with email</span></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border"/>
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-accent hover:underline font-medium">Forgot Password?</Link>
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                {submitting ? <Loader2 className="animate-spin" size={18}/> : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent font-semibold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>);
};
export default Login;
