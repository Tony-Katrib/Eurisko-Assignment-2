import { useState } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar />
      <main className="px-base sm:px-md lg:px-lg py-md">
        <UserList />
      </main>
    </div>
  );
}