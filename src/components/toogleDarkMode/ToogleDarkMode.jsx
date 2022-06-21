import { Box, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ToogleDarkMode() {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Box display='inline'>
      <IconButton 
          size='md' 
          icon={colorMode === 'light' ? <MoonIcon color='#2C5282'/> : <SunIcon color='#F6AD55' />  }
          isRound='true'
          onClick={toggleColorMode}
      ></IconButton>
    </Box>
  )
}