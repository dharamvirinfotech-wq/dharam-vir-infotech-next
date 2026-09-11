import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import UniqueVisitors from '@/views/admin/UniqueVisitors.jsx';

export default function AdminVisitorsPage() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <UniqueVisitors />
    </ProtectedRoute>
  );
}
