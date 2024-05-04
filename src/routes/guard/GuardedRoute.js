import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner'

const GuardedRoute = ({ auth }) => {
  if (auth()) {
    return <Outlet />
  } else {
    toast.error('Unauthorized!');
    return <Navigate to="/login"/>
  }
}

export default GuardedRoute