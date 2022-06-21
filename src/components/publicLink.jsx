import { Box, Text, useColorModeValue } from '@chakra-ui/react' // chakra-ui
import { LinkIcon } from '@chakra-ui/icons' // chakra-ui


export default function PublicLink({url, title}) {

  const bg = useColorModeValue("link.light", "link.dark");
  return (
    <Box
      p='5px 30px'
      m='2'
      bg={bg}
      rounded= "lg"
      borderWidth="2px"
      _hover={{ 
        bg: "teal.300",
      }}
      >
        <Text fontSize='xl' as='a' href={url}>
          <LinkIcon/> {title}
        </Text>
    </Box>
  )
}
