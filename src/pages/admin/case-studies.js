import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import AdminPortfolio from '@/views/admin/Portfolio.jsx';

export default function AdminCaseStudiesPage() {
  return (
    <ProtectedRoute roles={["admin", "editor"]}>
      <AdminPortfolio />
    </ProtectedRoute>
  );
}

