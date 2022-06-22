import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { existsUsername, updateUser } from "../firebase/firebase";

import { Center ,Spinner } from "@chakra-ui/react"; //Chakra ui

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [ state, setState ] = useState(0)
  const [ currentUser, setCurrentUser ] = useState({});
  const [ username, setUsername ] = useState('');


  function handleUserLoggedIn() {navigate('/dashboard') }
  function handleUserNotRegistered(user) {
    setState(3)
    setCurrentUser(user);
  }
  function handleUserNotLoggedIn() { navigate('/login') }
  function handleInputUsername(e) {
    setUsername(e.target.value);
  }
  async function handleContinue() {
    if(username !== '') {
      const exists = await existsUsername(username);
      if(exists) {
        setState(5);
      }else{
        const tmp = {...currentUser};
        tmp.username = username;
        tmp.processCompleted = true; 
        await updateUser(tmp)
        setState(6)
      }
    }
  }
  
  if(state === 3 || state === 5) {
    return (
      <div>
        <h1>Welcome {currentUser.displayName}</h1> 
        <p>Para Terminar el proceso elige un nombre de usuario</p>
        {state === 5 ? <p>El nombre de usuario ya existe, escoge otro</p> : ''}
        <div>
          <input 
            type="text"
            onChange={handleInputUsername} 
            placeholder="Nombre de usuario" />
        </div>
        <div>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    )
  }

  if(state === 6) {
    return (
      <div>
        <h1>Felicidades, ya puedes ir al dashboard a crear tus links</h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
  )}

  return (
      <AuthProvider 
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Center
          h='100vh'>
          <Spinner
            thickness='3px'
            speed='0.65s'
            emptyColor='whiteAlpha.100'
            color='#B5838D'
            size='xl'
          />
        </Center>
      </AuthProvider>
  )
}