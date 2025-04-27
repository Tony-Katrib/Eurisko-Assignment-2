import { useState } from 'react';
import UserCard from './UserCard';
import useAuth from '../store/useAuth';
import useTheme from '../store/useTheme';
import Lottie from 'lottie-react';
import loadingSpinner from '../assets/lottie/spinner.json';
import spinnerDark from '../assets/lottie/spinnerDark.json';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export default function UserList() {
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  const { data: users = [], isLoading, isFetching, isError, error } = useQuery<User[], Error>({
    queryKey: ['users', search],
    queryFn: () => getUsers(search),
    placeholderData: [],
  });

  return (
    <div className='p-md lg:p-base sm:p-xs'>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded text-black dark:text-white dark:bg-gray-800"
      />

      {isLoading || isFetching ? (
        <div className="flex justify-center items-center h-40">
          <Lottie animationData={theme === 'dark' ? spinnerDark : loadingSpinner} loop autoplay className="w-16 h-16" style={{ width: "100%", height: "100%" }} />
        </div>
      ) : isError ? (
        <p className="text-danger text-center">{(error as Error).message}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}