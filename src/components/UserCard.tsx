import Button from './Button';
import { User } from '../types/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/users';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserCard({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      toast.success('User deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setConfirming(false);
    },
    onError: () => {
      toast.error('Failed to delete user.');
      setConfirming(false);
    },
  });

  const isLoading = status === 'pending';

  const handleDelete = () => {
    mutate();
  };

  const initials = `${user.firstName[0]?.toUpperCase()}${user.lastName?.[0]?.toUpperCase() || ''}`;

  return (
    <div className="p-base sm:p-base rounded-md shadow-md bg-white dark:bg-dark transition-colors">
      <div className="flex justify-center mb-base">
        <div className="bg-primary text-white w-20 h-20 flex items-center justify-center rounded-full font-semibold text-title dark:bg-dark_primary">
          {initials}
        </div>
      </div>

      <div className="text-left">
        <p className="font-semibold text-heading sm:text-title mb-xs sm:mb-sm">
          {user.firstName}{user.lastName ? ` ${user.lastName}` : ''}
        </p>

        <div className="flex flex-col gap-xs sm:gap-sm text-xs sm:text-sm text-muted mb-base sm:mb-md">
          <p>Email: {user.email}</p>
          <p>Status: {user.status}</p>
          <p>Date of birth: {user.dateOfBirth}</p>
        </div>

        <div className="flex justify-end gap-xs sm:gap-sm">
          <Button variant="primary" onClick={() => navigate(`/dashboard/edit/${user.id}`)}>Edit</Button>
          <Button variant="danger" onClick={() => setConfirming(true)}>Delete</Button>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-dark p-lg rounded-md flex flex-col items-center gap-base">
            <p className="text-center text-heading">Are you sure you want to delete?</p>
            <div className="flex gap-base">
              <Button variant="secondary" onClick={() => setConfirming(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Deleting...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}