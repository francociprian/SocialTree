import { Text, useColorModeValue, Flex } from '@chakra-ui/react' // chakra-ui
import { LinkIcon } from '@chakra-ui/icons' // chakra-ui


export default function PublicLink({url, title}) {

  const bg = useColorModeValue("text.light", "text.dark");
  const color = useColorModeValue("bg.light", "bg.dark");

  return (
    <Flex
      h='35px'
      w='18rem'
      m='2'
      bg={bg}
      color={color}
      rounded= "full"
      _hover={{ 
        bg: bg,
      }}
      justify='center'
      align='center'
      >
        <Text fontSize='xl' as='a' href={url}>
          <LinkIcon/> {title}
        </Text>
    </Flex>
  )
}
