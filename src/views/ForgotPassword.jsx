import { useState } from "react";
import { Link } from "@/lib/router-compat";
import { Mail, KeyRound, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const { toast } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
            toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
            return;
        }
        setSubmitting(true);
        try {
            await api.post("/auth/forgot-password", { email: trimmed });
            setSent(true);
            toast({
                title: "Check your inbox",
                description: "If an account exists for this email, a reset link has been sent.",
            });
        }
        catch (err) {
            // For security, treat as success even if backend errors out — but show toast for network issues.
            const message = err instanceof Error ? err.message : "Something went wrong.";
            toast({ title: "Request received", description: message, variant: "destructive" });
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
                {sent ? <CheckCircle2 className="text-accent" size={28}/> : <KeyRound className="text-accent" size={28}/>}
              </div>
              <h1 className="text-2xl font-bold text-primary">
                {sent ? "Email Sent" : "Forgot Password?"}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {sent
            ? "We've sent password reset instructions to your inbox."
            : "Enter your email and we'll send you a reset link."}
              </p>
            </div>

            {!sent ? (<form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                    <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"/>
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                  {submitting ? <Loader2 className="animate-spin" size={18}/> : "Send Reset Link"}
                </Button>
              </form>) : (<div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  <p>
                    Didn't get the email? Check your spam folder, or{" "}
                    <button type="button" onClick={() => setSent(false)} className="text-accent font-medium hover:underline">
                      try again
                    </button>
                    .
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full h-11">
                  <Link to="/login">Back to Login</Link>
                </Button>
              </div>)}

            {!sent && (<p className="text-center text-sm text-muted-foreground mt-6">
                <Link to="/login" className="inline-flex items-center gap-1 text-accent font-semibold hover:underline">
                  <ArrowLeft size={14}/> Back to Login
                </Link>
              </p>)}
          </div>
        </div>
      </div>
      <Footer />
    </div>);
};
export default ForgotPassword;
