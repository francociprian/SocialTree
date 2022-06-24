import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { existsUsername, updateUser } from "../firebase/firebase";
import ToogleDarkMode from "../components/toogleDarkMode/ToogleDarkMode";

import {  Center , Container, Flex, Input, Spinner, Text, VStack, Stack, Button, FormControl } from "@chakra-ui/react"; //Chakra ui

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [ state, setState ] = useState(0)
  const [ currentUser, setCurrentUser ] = useState({});
  const [ username, setUsername ] = useState('');


  function handleUserLoggedIn() {navigate('/dashboard') }
  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setState(3)
  }
  function handleUserNotLoggedIn() { navigate('/login') }
  function handleInputUsername(e) {
    if(e.target.value.length < 0) {
      console.log('error')
    }
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
      <Container maxW='container.xl'>
        <Flex justify='flex-end' mt='4'>
          <ToogleDarkMode />
        </Flex>
        <VStack h='85vh' w='full' justify='center' align='center' >
          <>
            <Stack 
              direction={['column', 'column', 'row', 'row']}
              align={['center', 'center', 'flex-start', 'flex-start']}
              fontSize={['5xl', '5xl', '4.8vw', '4.8vw']}
              my='10'
              fontWeight='black'
              letterSpacing='tight'
              >
              <Text as='h1' mr='4'>
                Welcome 
              </Text> 
              <Text 
                borderWidth='1px'
                borderRadius='xl'
                p='0.3rem 1.5rem'
                bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
                bgClip="text"
              >{currentUser.displayName}</Text>
            </Stack> 
            <Container maxW='container.sm'>
              <Text fontSize={['md', 'md', 'xl', 'xl']} >To finish the process choose a username</Text>
              <FormControl display='flex' flexDirection='column' alignItems='center' gap='3'>
                <Input
                  type="text"
                  mt='3'
                  variant='filled'
                  onChange={handleInputUsername} 
                  placeholder="@username" 
                />
                {username === '' ? <Text fontFamily='mono' fontSize='sm' bg='rgba(254, 178, 178, 0.16)' color='tomato' px='3px'>Please enter a username</Text> : null}
                {state === 5 ? <Text fontFamily='mono' fontSize='sm' bg='rgba(254, 178, 178, 0.16)' color='tomato' px='3px'>The username already exists, choose another!</Text> :   null }
                <Button onClick={handleContinue}>Continue</Button>
              </FormControl>
            </Container>
          </>
        </VStack>
      </Container>
    )
  }

  if(state === 6) {
    return (
      <Container maxW='container.xl'>
        <Flex justify='flex-end' mt='4'>
          <ToogleDarkMode />
        </Flex>
        <VStack h='80vh' justify='center' align='center' gap={5}>
          <Text
            fontSize='4.8vw' 
            fontWeight='black'
            letterSpacing='tight'
            p='0.3rem 1.5rem'
            bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
            bgClip="text"
          >Congratulations</Text>
          <Text fontSize='xl' >Go to the dashboard!!</Text>
          <Button>
            <Link to="/dashboard">Continue</Link>
          </Button>
        </VStack>
      </Container>
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