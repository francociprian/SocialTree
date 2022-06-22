import { useState } from 'react';
import AuthProvider from "../components/authProvider";
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from '../components/dashboardWrapper';
import {v4 as uuidv4} from 'uuid';
import { getLinks, insertNewLink, updateLink, deleteLink } from '../firebase/firebase';
import Link from '../components/link';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  Container,
  Text,
  Center,
  Spinner
} from '@chakra-ui/react' //Chakra ui

export default function DashboardView() {
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState({});
  const [ state, setState ] = useState(0)

  const [ title, setTitle ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ links, setLinks ] = useState([]);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user)
    setState(2)
    const respLinks = await getLinks(user.uid);
     setLinks([...respLinks]);
  }
  function handleUserNotRegistered(user) { navigate('/login')}
  function handleUserNotLoggedIn() { navigate('/login') }

  if(state === 0) {
    return (
      <AuthProvider 
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Center
          h='100vh'>
          <Spinner
            thickness='3px'
            speed='0.65s'
            emptyColor='whiteAlpha.100'
            color='#B5838D'
            size='xl'
          />
        </Center>
      </AuthProvider>
    )
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }

  function addLink(){
    if(title!=='' && url!==''){
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle('');
      setUrl('');
      setLinks([...links, newLink]);
    }
  }
  function handleOnChange(e) {
    const value = e.target.value;
    if(e.target.name === 'title'){
      setTitle(value);
    }
    if(e.target.name === 'url'){
      setUrl(value);
    }
  }

  async function handleDeleteLink(docId) {
    await deleteLink(docId)
    const tmp = links.filter(link => link.docId !== docId);
    setLinks([...tmp]);
  }

  async function handleUpdateLink(docId, title, url) {
    const link = links.find(item => item.docId === docId);
    console.log(link, docId ,title, url)
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  }

  return (
    <DashboardWrapper>
      <div>
        <Container maxW="container.xl">
          <Text fontSize='3xl'>Dashboard</Text>
          <form onSubmit={handleOnSubmit}>
            <FormControl>  
              <FormLabel htmlFor='title'>Social Network</FormLabel>
              <Input variant='filled'  type="text" name="title" id='title' onChange={handleOnChange} />

              <FormLabel htmlFor='url'>Url</FormLabel>
              <Input variant='filled'  type="text" name="url" id='url' onChange={handleOnChange}/>

              {/* <Input colorScheme='teal' type="submit" value="Create new link"  /> */}
              <Button variant='solid' type="submit" colorScheme='teal'>Create new link</Button>
            </FormControl>
          </form>
        </Container>

        <Container maxW='container.xl'>
          <h2>Links</h2>
          <SimpleGrid
            minChildWidth={{ base: "240px", md: "800px" }}
            spacing={{ base: "10px", sm: "30px" }}
            m="5"
          >
            {
              links.map(link => (
                <Link 
                  key={link.id} 
                  docId={link.docId}
                  title={link.title}
                  url={link.url}
                  onDelete={handleDeleteLink}
                  onUpdate={handleUpdateLink} 
                /> 
              ))
            }
          </SimpleGrid>
        </Container>
      </div>
    </DashboardWrapper> 
  )
}