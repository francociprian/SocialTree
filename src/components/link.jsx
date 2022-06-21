import { useState, useRef, useEffect } from "react";

import { Button, Text, Box, Input, useColorModeValue, Flex, IconButton } from '@chakra-ui/react' // chakra-ui
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);


  useEffect(() => {
    if(titleRef.current){
      titleRef.current.focus();
    }
  }, [editTitle]);
  
  useEffect(() => {
    if(urlRef.current){
      urlRef.current.focus();
    }
  }, [editUrl]);

  function handleEditTitle() {
    setEditTitle(true);
  }
  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleChangeTitle(e) {
    const value = e.target.value;
    setCurrentTitle(value);
  }

  function handleChangeUrl(e) {
    const value = e.target.value;
    setCurrentUrl(value);
  }
  function handleBlurTitle (e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleBlurUrl (e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }

  const bg = useColorModeValue("link.light", "link.dark");
  
  return (
    <Box 
      key={docId} 
      p='4'
      bg={bg}
      w='full' 
      borderWidth="2px"
      shadow="sm"
      rounded="lg"
      overflow="hidden"
      mx="auto"
      >
      <div>
        <Flex justify='flex-end'>
            <IconButton
              colorScheme='red'
              size='md'
              aria-label='Search database'
              icon={<DeleteIcon />}
              onClick={handleDelete}
            />
        </Flex>
        <div>
          {editTitle ? (
            <>
              <Input
                ref={titleRef} 
                value={currentTitle} 
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle} 
                variant='flushed' 
                mb='4'
              />
            </>
          ) : (
            <Flex gap='5'>
              <Button leftIcon={<EditIcon />} colorScheme='linkedin' variant='solid' size='xs'  onClick={handleEditTitle}>Edit</Button>
              <Text fontSize='xl'> {currentTitle} </Text>
            </Flex>
          )}
        </div>
        <div>
          {editUrl ? (
            <>
              <Input 
                url={urlRef} 
                value={currentUrl} 
                onChange={handleChangeUrl} 
                onBlur={handleBlurUrl} 
                variant='flushed' 
                mb='4' 
              />
            </>
          ) : (
            <Flex gap='5'>
              <Button leftIcon={<EditIcon />} colorScheme='linkedin' variant='solid' size='xs' onClick={handleEditUrl}>Edit</Button>
              <Text fontSize='xl'> {currentUrl} </Text>
            </Flex>
          )}
        </div>
      </div>
    </Box>
  )
}
