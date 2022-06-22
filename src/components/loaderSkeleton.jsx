import { SkeletonCircle, Skeleton, Flex } from '@chakra-ui/react'

export default function LoaderSkeleton() {
  return (
    <Flex
      justify='center'
      align='center'
      direction='column'
      h='90vh'
      >
      <SkeletonCircle size='250px' /> 
      <Skeleton mt='4' height='40px' w='350px' rounded='xl' />
      <Skeleton mt='2' height='40px' w='250px' rounded='xl' />
      <Skeleton mt='2' height='35px' w='150px' rounded='xl' />
      <Skeleton mt='2' height='35px' w='150px' rounded='xl' />
    </Flex>
  )
}
