import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import useAuth from '../store/useAuth';
import useTheme from '../store/useTheme';
import Lottie from 'lottie-react';
import loadingSpinner from '../assets/lottie/spinner.json';
import spinnerDark from '../assets/lottie/spinnerDark.json';

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: string;
  dateOfBirth: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const { accessToken } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/users${search ? `?search=${search}` : ''}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('Raw response:', res);

        const text = await res.text();
        console.log('Raw response text:', text);

        const parsed = JSON.parse(text);
        if (!res.ok) throw new Error('Failed to fetch users');
        setUsers(parsed.result.data.users || []);
        console.log('Fetched users:', parsed.result.data.users);
      } catch (err) {
        setError('Could not load users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search]);

  return (
    <div className='p-md lg:p-base sm:p-xs'>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded text-black dark:text-white dark:bg-gray-800"
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Lottie animationData={theme === 'dark' ? spinnerDark : loadingSpinner} loop autoplay className="w-16 h-16" style={{width: "100%", height:"100%"}} />
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}