import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import RolePanelRouter from '@/views/panel/RolePanelRouter.jsx';
import RoleDashboard from '@/views/panel/RoleDashboard.jsx';
import { useRouter } from 'next/router';

export default function PanelPage() {
  const router = useRouter();
  const { role } = router.query;
  return (
    <ProtectedRoute>
      {!role || role.length === 0 ? <RolePanelRouter /> : <RoleDashboard />}
    </ProtectedRoute>
  );
}
