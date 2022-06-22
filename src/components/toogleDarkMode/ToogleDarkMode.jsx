import { Box, IconButton, useColorMode, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ToogleDarkMode() {
  const {colorMode, toggleColorMode} = useColorMode()

  const bg = useColorModeValue("bg.light", "bg.dark");
  const color = useColorModeValue("gray.900", "gray.100");

  return (
    <Box>
      <Tooltip label="Theme" aria-label='theme' bg={bg} color={color} borderWidth="1px">
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