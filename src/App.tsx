import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import NewUser from './pages/NewUser'
import EditUser from './pages/EditUser'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/new" element={<NewUser />} />
        <Route path="/dashboard/edit/:id" element={<EditUser />} />
      </Route>
    </Routes>
  )
}

export default App