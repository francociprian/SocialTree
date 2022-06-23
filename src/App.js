import { Link } from 'react-router-dom';

import { Button,  Container, Flex, Heading, Tooltip, useColorModeValue  } from '@chakra-ui/react'; // Chakra UI
import './App.css';
import ToogleDarkMode from './components/toogleDarkMode/ToogleDarkMode';

import './fonts/PolySansMedium.woff2'
// import '../fonts/PolySansMedium.woff2'
// import '../fonts/PolySansRegular.woff2'

function App() {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const color = useColorModeValue("gray.900", "gray.100");

  return (
      <Container maxW='container.xl' >
        <Flex justify='flex-end' mt='4'>
          <Tooltip label="Sign in" aria-label='Sign in' bg={bg} color={color} borderWidth="1px">
            <Button size='md' mx='2' variant='outline' >
              <Link to="/login">Sign in</Link>
            </Button>
          </Tooltip>
          <ToogleDarkMode />
        </Flex>
        <Container h='90vh' centerContent  justifyContent='center' >
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection='column'  
          >
            <Heading
              fontSize="11vw"
              fontWeight='black'
              as='h1' 
              className='socialtree'
              bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
              bgClip="text"
            >
              SocialTree
            </Heading>
            <Heading 
              fontSize="3vw" 
              fontWeight='black'
              as='h2'
              className='heading-link'
            >Everything in one simple link.</Heading>
          </Flex>
        </Container>
      </Container>
  );
}

export default App;
