import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { existsUsername, getUserPublicProfileInfo, getProfilePhotoUrl } from '../firebase/firebase';
import PublicLink from '../components/publicLink';
import ToogleDarkMode from '../components/toogleDarkMode/ToogleDarkMode';
import LoaderSkeleton from '../components/loaderSkeleton';

import { Box, Text, Flex, Image, Container } from '@chakra-ui/react' // chakra-ui

export default function PublicProfileView() {
  const params = useParams();
  const [ profile, setProfile ] = useState(null);
  const [ url, setUrl ] = useState('');
  const [ state, setState ] = useState(0);

  useEffect(() => {
    getProfile()

    async function getProfile () {
      const username = params.username;
      try {
        const userUid = await existsUsername(username);
        if(userUid){
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
          setUrl(url);
        } else{
          setState(7);
        }
      } catch(error) {
        console.error(error);
      }
    }
  }, [params]);

  if(state === 7){
    return(
      <div>
        <h1>User Doesn't Exist</h1>
      </div>
    )
  }

  return (
    
    <Container
      maxW="container.xl" 
      h='100vh'
      >
      <Flex justify='flex-end' pt='2'><ToogleDarkMode /></Flex>

      { url==='' ? 
        <LoaderSkeleton /> 
      : 
        <Flex
        justify='center'
        align='center'
        direction='column'
        h='90vh'
        >
        <Image 
          src={url} 
          borderRadius='full'
          alt="profile"
          boxSize='250px'
          objectFit='cover' 
        />
        <Text decoration='underline' fontSize='4xl'>{profile?.profileInfo?.displayName}</Text>
        <Text fontSize='3xl'>@{profile?.profileInfo?.username}</Text>
        <Box>
          {
            profile?.linksInfo.map(link => (
              <PublicLink key={link.docId} url={link.url} title={link.title} />
            ))
          }
        </Box>
      </Flex>}




      {/* <Flex
        justify='center'
        align='center'
        direction='column'
        h='90vh'
      >
        <Image 
          src={url} 
          borderRadius='full'
          alt="profile"
          boxSize='250px'
          objectFit='cover' 
        />
        <Text decoration='underline' fontSize='4xl'>{profile?.profileInfo?.displayName}</Text>
        <Text fontSize='3xl'>@{profile?.profileInfo?.username}</Text>
        <Box>
          {
            profile?.linksInfo.map(link => (
              <PublicLink key={link.docId} url={link.url} title={link.title} />
            ))
          }
        </Box>
      </Flex> */}
    </Container>
  )
}
