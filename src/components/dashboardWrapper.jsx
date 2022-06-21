import { Link } from 'react-router-dom';
import ToogleDarkMode from './toogleDarkMode/ToogleDarkMode';

import { Box, Text, Flex, IconButton } from '@chakra-ui/react'; // chakra-ui
import { FiLogOut } from "react-icons/fi"; //React-icons

export default function DashboardWrapper({children, user}) {

  return (
    <Box>
      <Box 
        as='nav' 
        w='100%' 
        h='70px'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding='0 10%'
      >
        <Box display='flex' alignItems='center'>
          <Text fontSize='4xl' fontWeight='hairline'>SocialTree</Text>
        </Box>
        <Flex w='30%' justify='flex-end' align='center' gap='3'>
          <Box w='100%' display='flex' gap='10px' justifyContent='flex-end' mr='10px' fontSize='xl'>
            <Link to="/dashboard">Links</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <Link to={`/u/${user}`}>Public Profile</Link>
          </Box>
          <Link to="/signout" >
            <IconButton 
              size='md' 
              icon={<FiLogOut />}
              isRound='true'
            ></IconButton>
          </Link>
          <ToogleDarkMode />
        </Flex>
      </Box>
      <div>{children}</div>
    </Box>
  )
}
