import { Box, IconButton, useColorMode, Tooltip } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ToogleDarkMode() {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Box>
      <Tooltip label="Theme" aria-label='theme'>
        <IconButton 
            size='md' 
            icon={colorMode === 'light' ? <MoonIcon color='#2C5282'/> : <SunIcon color='#F6AD55' />  }
            isRound='true'
            onClick={toggleColorMode}
        ></IconButton>
      </Tooltip>
    </Box>
  )
}