import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import AdminPortfolio from '@/views/admin/Portfolio.jsx';

export default function AdminPortfolioPage() {
  return (
    <ProtectedRoute roles={["admin", "editor"]}>
      <AdminPortfolio />
    </ProtectedRoute>
  );
}
