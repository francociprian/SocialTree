import { logOut } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/authProvider';

export default function SignoutView() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logOut();
    navigate('/login');
  }

    return (
      <AuthProvider
        onUserLoggedIn={handleLogout}
        onUserNotLoggedIn={() => navigate('/login')}
      ></AuthProvider>
    )
}
