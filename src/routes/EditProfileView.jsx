import { useState, useRef } from 'react';
import AuthProvider from '../components/authProvider';
import DashboardWrapper from '../components/dashboardWrapper';
import { useNavigate } from 'react-router-dom';
import { setUserProfilePhoto, getProfilePhotoUrl, updateUser } from '../firebase/firebase';
import { Link} from 'react-router-dom';


import {
  Flex,
  Input,
  Button,
  Container,
  Center,
  Text,
  Image
} from '@chakra-ui/react' //Chakra ui
import { ArrowForwardIcon } from '@chakra-ui/icons'; //Chakra ui

export default function EditProfileView() {
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState({});
  const [ state, setState ] = useState(0)
  const [ profileUrl, setProfileUrl ] = useState(null);

  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setState(2);
  }
  function handleUserNotRegistered(user) { navigate('/login')}
  function handleUserNotLoggedIn() { navigate('/login') }

  function handleOpenFilePicker(){
    if(fileRef.current){
      fileRef.current.click();
    }
  }
  function handleChangeFile(e){
    const files = e.target.files;
    const fileReader = new FileReader();

    if(fileReader && files && files.length > 0){
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload =  async  () => {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        if(res){
          const tmpUser = {...currentUser};
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({...tmpUser});
          const url = await getProfilePhotoUrl(currentUser.profilePicture)
          setProfileUrl(url);
        }
      }
    }
  }

  if(state !== 2){
    return(
      <AuthProvider 
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      ><div>Loading....</div></AuthProvider>
    )
  }
   return (
      <DashboardWrapper>
        <Container maxW="container.xl" h='100vh'>
          <Text fontSize='4xl' align='center'>Edit Profile Picture</Text>
          <Center my='5'>
            <div>
              <div>
                <Image 
                  src={profileUrl} 
                  alt='profile'
                  boxSize='500px'
                  objectFit='cover'
                  />
              </div>
              <Flex justify='center' mt='4'>
                <Button
                  onClick={handleOpenFilePicker}
                >
                  Choose New Profile Picture
                </Button>
                <Input 
                  ref={fileRef} 
                  type="file" 
                  onChange={handleChangeFile}
                  style={{display: 'none'}} 
                />
              </Flex>
            </div>
          </Center>
          <Text align='center' textDecoration='underline'  fontSize='2xl'>
            <Link to={`/u/${currentUser.username}`}><ArrowForwardIcon/>Public Profile</Link>
          </Text>
        </Container>
      </DashboardWrapper>
  )
}
