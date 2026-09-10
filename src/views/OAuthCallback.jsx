import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "@/lib/router-compat";
import { Loader2, AlertTriangle } from "lucide-react";
import { useDispatch } from "react-redux";
import { tokenStore, userStore } from "@/lib/axios";
import { setCredentials } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
const OAuthCallback = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const handled = useRef(false);
    const token = params.get("token");
    const userRaw = params.get("user");
    const error = params.get("error");
    useEffect(() => {
        if (handled.current)
            return;
        handled.current = true;
        if (error) {
            toast({ title: "Sign-in failed", description: error, variant: "destructive" });
            navigate("/login", { replace: true });
            return;
        }
        if (!token || !userRaw) {
            toast({ title: "Sign-in failed", description: "Missing credentials in callback.", variant: "destructive" });
            navigate("/login", { replace: true });
            return;
        }
        try {
            const user = JSON.parse(decodeURIComponent(userRaw));
            tokenStore.set(token);
            userStore.set(user);
            // Also hydrate Redux if the slice exposes setCredentials; otherwise the AuthContext
            // will pick it up from localStorage on next mount.
            try {
                dispatch(setCredentials({ token, user }));
            }
            catch { /* slice may not have this action — safe to ignore */ }
            toast({ title: "Welcome", description: `Signed in as ${user.full_name || user.email}` });
            navigate("/panel", { replace: true });
        }
        catch (e) {
            toast({
                title: "Sign-in failed",
                description: e instanceof Error ? e.message : "Could not parse response.",
                variant: "destructive",
            });
            navigate("/login", { replace: true });
        }
    }, [token, userRaw, error, navigate, dispatch, toast]);

    return (<div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            {error ? (<>
                <AlertTriangle className="text-destructive mx-auto mb-4" size={32} />
                <h1 className="text-xl font-bold text-primary">Sign-in failed</h1>
                <p className="text-muted-foreground text-sm mt-2">{error}</p>
                <Button className="mt-6" onClick={() => navigate("/login")}>Back to Login</Button>
            </>) : (<>
                <Loader2 className="text-accent mx-auto mb-4 animate-spin" size={32} />
                <h1 className="text-xl font-bold text-primary">Signing you in…</h1>
                <p className="text-muted-foreground text-sm mt-2">Completing authentication, please wait.</p>
            </>)}
        </div>
    </div>);
};
export default OAuthCallback;
