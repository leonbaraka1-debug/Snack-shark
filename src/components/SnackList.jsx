import { useSnacks } from '../hooks/useSnacks';
import SnackCard from './SnackCard';

export default function SnackList({ isAdmin = false }) {
  const { snacks, loading } = useSnacks();

  if (loading) {
    return <p>Loading snacks...</p>;
  }

  if (snacks.length === 0) {
    return <p>No snacks found.</p>;
  }

  return (
    <div className="snack-grid">
      {snacks.map((snack) => (
        <SnackCard key={snack.id} snack={snack} isAdmin={isAdmin} />
      ))}
    </div>
  );
}