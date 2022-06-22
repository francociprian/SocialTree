import { Link } from 'react-router-dom';
import ToogleDarkMode from './toogleDarkMode/ToogleDarkMode';

import { Box, Text, Flex, IconButton, Tooltip, Container, useTheme } from '@chakra-ui/react'; // chakra-ui
import { FiLogOut } from "react-icons/fi"; //React-icons

export default function DashboardWrapper({children}) {
  // const bg = useColorModeValue("link.light", "link.dark");
  // const text = useColorModeValue("text.light", "text.dark");

  const theme = useTheme()
  console.log(theme)
  return (
    <Box>
      <Container
        as='nav' 
        maxW='90rem'  
        h='70px'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box display='flex' alignItems='center'>
          <Text fontSize='2xl' fontWeight='hairline'>SocialTree</Text>
        </Box>
        <Flex w='30%' justify='flex-end' align='center' gap='3'>
          <Box w='100%' display='flex' gap='10px' justifyContent='flex-end'>
            <Tooltip label="Links" aria-label='Links'>
              <Link to="/dashboard">Links</Link>
            </Tooltip>
            <Tooltip label="Profile" aria-label='Profile'>
              <Link to="/dashboard/profile">Profile</Link>
            </Tooltip>
          </Box>
          <Tooltip label="Signout" aria-label='Signout'>
            <Link to="/signout" >
              <IconButton 
                size='md' 
                icon={<FiLogOut />}
                isRound='true'
              ></IconButton>
            </Link>
          </Tooltip>
          <ToogleDarkMode/>
        </Flex>
      </Container>
      <div>{children}</div>
    </Box>
  )
}
