import { Link } from 'react-router-dom';

import { Button,  Container, Flex, Heading, Text  } from '@chakra-ui/react'; // Chakra UI
import './App.css';
import ToogleDarkMode from './components/toogleDarkMode/ToogleDarkMode';

function App() {
  return (
      <Container maxW='container.xl' >
        <Flex justify='flex-end' pt='2'><ToogleDarkMode /></Flex>
        <Container h='90vh' centerContent  justifyContent='center' >
          <Flex
            justifyContent="center"
            alignItems="center"
            bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
            bgClip="text"
          >
            <Heading fontSize="9vw" as='h1'>SocialTree</Heading>
          </Flex>
            <Button size='md' m='4' variant='outline' >
              <Link to="/login">Login</Link>
            </Button>
        </Container>
      </Container>
  );
}

export default App;
