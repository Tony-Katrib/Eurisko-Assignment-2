import Button from './Button';
import { Moon } from 'lucide-react';
import useTheme from '../store/useTheme';
import { useNavigate } from 'react-router-dom';
import useAuth from '../store/useAuth';

export default function Navbar() {
  const { logout } = useAuth();
  const { resetTheme } = useTheme();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    resetTheme();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 dark:bg-dark_primary">
      <h1 className="text-title font-bold">User Management</h1>
      <div className="flex gap-2">
        <Button variant='secondary'>Create User</Button>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
        <Button variant='icon' onClick={toggleTheme}>
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 01-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 009 9c.239 0 .254.018.488 0A9.004 9.004 0 0112 21Z"
              />
            </svg>
          )}
        </Button>
      </div>
    </nav>
  );
}