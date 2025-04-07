import Button from './Button';
import { Moon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      <h1 className="text-title font-bold">User Management</h1>
      <div className="flex gap-2">
        <Button variant='secondary'>Create User</Button>
        <Button variant="danger">Logout</Button>
        <Button variant='icon'>
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
        </Button>
      </div>
    </nav>
  );
}