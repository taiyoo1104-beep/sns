import { memo, useContext, useState, type ChangeEvent, type FC } from "react"
import { UserContext } from "../../providers/UserProvider"
import { Heading, Box, Stack, Flex } from "@chakra-ui/react";
import { CustomAvatar } from "../ui/avatar";
import { LabelWithForm } from "../organisms/LabelWithForm";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";


export const Profile:FC = memo(() => {
  const { loginUser,setLoginUser } = useContext(UserContext);
  if(!loginUser){
    return
  }

  const [ password , setPassword ] = useState("");
  const [ newUserName , setNewUserName ] = useState(loginUser.user_name);
  const [ newUserId , setNewUserId ] = useState(loginUser.user_id);
  const [ newPassword , setNewPassword ] = useState("");
  const {update} = useUpdateProfile();

  const onChangeName = (e:ChangeEvent<HTMLInputElement>) => setNewUserName(e.target.value)
  const onChangeId = (e:ChangeEvent<HTMLInputElement>) => setNewUserId(e.target.value)
  const onChangePass = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onChangeNewPass = (e:ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)
  
  const onClickUpdate = async () => {
    const isSuccess = await update({userName:newUserName,currentUserId:loginUser.user_id,newUserId:newUserId,currentPassword:password,newPassword:newPassword}) 

    if(isSuccess !== false){
      const newUserInfo = {...loginUser!,user_name:newUserName,user_id:newUserId}
      setLoginUser(newUserInfo)

      localStorage.setItem("user",JSON.stringify(newUserInfo))
      setPassword("")
      setNewPassword("")
    }

    
  }
  
  return (
  <>
  <Box pt="90px" pb="40px" px={4}>
    <Stack gap={8} align="center" maxW="600px" mx="auto" border="solid 2px" borderColor="gray.200" borderRadius="xl" py={10}  px={8}  bg="#FFFEF6" shadow="sm">
      <Heading as="h1" size="2xl" fontWeight="bold">プロフィール</Heading>
      <Box position="relative">
      <CustomAvatar src={loginUser.avatar_url} size="100px" name={loginUser?.user_name} />
      </Box>

      <Stack gap={4} w="full" px={10}>
      <LabelWithForm value={newUserName} onChange={onChangeName}>ユーザー名</LabelWithForm>
      <LabelWithForm value={newUserId} onChange={onChangeId}>ユーザーID</LabelWithForm>

      <LabelWithForm value={password} onChange={onChangePass} type="password">現在のパスワード</LabelWithForm>
      <LabelWithForm value={newPassword} onChange={onChangeNewPass} type="password">新しいパスワード</LabelWithForm>
      </Stack>

      <Flex w="full" justify="flex-end" px={10}>
      <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
      </Flex>
    </Stack>
  </Box>
  </>
  )
})