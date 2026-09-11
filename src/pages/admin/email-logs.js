import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import EmailLogs from '@/views/admin/EmailLogs.jsx';

export default function AdminEmailLogsPage() {
  return (
    <ProtectedRoute roles={["admin", "editor"]}>
      <EmailLogs />
    </ProtectedRoute>
  );
}
