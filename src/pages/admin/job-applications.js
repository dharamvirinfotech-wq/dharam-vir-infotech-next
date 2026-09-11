import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import JobApplications from '@/views/admin/JobApplications.jsx';

export default function AdminJobApplicationsPage() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <JobApplications />
    </ProtectedRoute>
  );
}
