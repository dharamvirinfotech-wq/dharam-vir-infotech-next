import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import JobPostings from '@/views/admin/JobPostings.jsx';

export default function AdminJobsPage() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <JobPostings />
    </ProtectedRoute>
  );
}
