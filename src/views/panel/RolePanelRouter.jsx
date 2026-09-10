import { Navigate } from "@/lib/router-compat";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import RoleDashboard from "./RoleDashboard";
import { rolePanels } from "@/config/rolePanels";
/**
 * Smart entry point at /panel — sends users to /panel/<their-role>.
 * If already on /panel/<role>, renders the unified dashboard.
 */
const RolePanelRouter = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32}/>
      </div>);
    }
    if (!user)
        return <Navigate to="/login" replace/>;
    const role = user.role in rolePanels ? user.role : "user";
    const target = `/panel/${role}`;
    if (window.location.pathname === "/panel") {
        return <Navigate to={target} replace/>;
    }
    return <RoleDashboard />;
};
export default RolePanelRouter;
