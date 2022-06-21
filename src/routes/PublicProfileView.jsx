import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { existsUsername, getUserPublicProfileInfo, getProfilePhotoUrl } from '../firebase/firebase';
import PublicLink from '../components/publicLink';
import DashboardWrapper from '../components/dashboardWrapper';

import { Box, Text, Flex, Image } from '@chakra-ui/react'

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
    <DashboardWrapper>
      <Box
        h='90vh'
        display='flex'
        justifyContent='center'>
        <Flex
          justify='center'
          align='center'
          direction='column'>
          <Image 
            src={url} 
            alt="profile"
            boxSize='500px'
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
        </Flex>
      </Box>
    </DashboardWrapper>
  )
}
