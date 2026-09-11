import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import RolePanelRouter from '@/views/panel/RolePanelRouter.jsx';
import RoleDashboard from '@/views/panel/RoleDashboard.jsx';
import AdminDashboard from '@/views/admin/Dashboard.jsx';
import { useRouter } from 'next/router';

export default function PanelPage() {
  const router = useRouter();
  const { role } = router.query;
  const currentRole = Array.isArray(role) ? role[0] : role;

  if (currentRole === 'admin') {
    return (
      <ProtectedRoute roles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      {!role || role.length === 0 ? <RolePanelRouter /> : <RoleDashboard />}
    </ProtectedRoute>
  );
}
