import Button from './Button';

interface User {
  firstName: string;
  lastName?: string | null;
  email: string;
  status: string;
  dob: string;
}

export default function UserCard({ user }: { user: User }) {
  const firstInitial = user.firstName[0]?.toUpperCase();
  const lastInitial = user.lastName?.[0]?.toUpperCase() || '';
  const initials = `${firstInitial}${lastInitial}`;

  return (
    <div className="p-base sm:p-base rounded-md shadow-md bg-white dark:bg-dark transition-colors">
      <div className="flex justify-center mb-base">
        <div className="bg-primary text-white w-20 h-20 flex items-center justify-center rounded-full font-semibold text-title">
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
          <p>Date of birth: {user.dob}</p>
        </div>

        <div className="flex justify-end gap-xs sm:gap-sm">
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    </div>
  );
}