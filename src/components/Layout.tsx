import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
    return (
        <div className="bg-secondary dark:bg-gray-900 text-black dark:text-white min-h-screen">
            <Navbar />
            <main className="p-base">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout