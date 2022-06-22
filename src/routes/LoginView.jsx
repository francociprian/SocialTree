import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthProvider from '../components/authProvider';
import { useNavigate } from 'react-router-dom';
import ToogleDarkMode from '../components/toogleDarkMode/ToogleDarkMode'; 

import { Button, Flex, Center, Container, Spinner } from '@chakra-ui/react'; // chakra-ui

export default function LoginView() {
  const navigate = useNavigate();
  /* State
  0: inicializado
  1: login
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  5: usuario existe
  6: nuevo username, click para continuar
  7: username no existe
  */
  const [ state, setCurrentState ] = useState(0)

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider)
        console.log(res)
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleUserLoggedIn(user) {navigate('/dashboard')}
  function handleUserNotRegistered(user) {navigate('/choose-username')}
  function handleUserNotLoggedIn() {
    setCurrentState(4)
  }

  if(state === 4) {
      return (
        <Container maxW='container.xl'>
          <Flex justify='flex-end' pt='2'><ToogleDarkMode /></Flex>
          <Center
            w='100%'
            h='80vh' 
            color='white'>
            <Button 
              size='lg'
              m='4' 
              variant='solid' 
              colorScheme='pink' 
              onClick={handleOnClick}
            > Login With Google 
            </Button>
          </Center>
        </Container>
      )
  }
  
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
  );
}