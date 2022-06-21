import { Link } from 'react-router-dom';

import { Button, Text } from '@chakra-ui/react'; // Chakra UI
import './App.css';

function App() {
  return (
    <div>
      <Text fontSize='5xl'>Hello World</Text>
      <Button size='lg' m='4' variant='solid' colorScheme='pink'>
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
}

export default App;
