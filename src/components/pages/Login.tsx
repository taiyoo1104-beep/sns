import { Box, Flex, Heading, Spacer, Stack} from "@chakra-ui/react";
import { useContext, useEffect, useState, type ChangeEvent, type FC } from "react";
import { LabelWithForm } from "../organisms/LabelWithForm";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useLoginAuth } from "../../hooks/useLoginAuth";
import { AddUserModal } from "../organisms/modal/AddUserModal";
import { UserContext } from "../../providers/UserProvider";

export const Login:FC = () => {
    //変数
    const [userId,setUserId] = useState("");
    const [password,setPassword] = useState("");
    const [open , setOpen] = useState(false);
    const { loginUser ,setLoginUser} = useContext(UserContext);

    useEffect(() => {
        if(loginUser){
            setLoginUser(null)
        }
    },[])
    console.log(loginUser)
    const {login} = useLoginAuth();

    //関数
    const onChangeUserId = (e : ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)
    const onChangePassword = (e : ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) 
    const onClickLogin = () => login({id:userId,password:password})
    const onClickAdd = () => setOpen(true)
    

    return (
        <>
        <Flex justify="center" align="center" height="100dvh" direction="column" overflow="hidden">
            <Spacer/>
            <Box bg="white" borderRadius="30px" border="solid gray 2px" h="400px" w="550px" p={4} >
                <Heading as="h1" size="5xl" fontWeight="bold" textAlign="center">Y</Heading>
                <Stack spaceY={7} py={4} px={10}>
                <LabelWithForm placeHolder="ログインIDを入力" onChange={onChangeUserId} value={userId}>ログインID</LabelWithForm>
                <LabelWithForm placeHolder="パスワードを入力" type="password" onChange={onChangePassword} value={password}>パスワード</LabelWithForm>
                <PrimaryButton onClick={onClickLogin}>ログイン</PrimaryButton>
                </Stack>
            </Box>
            <Spacer/>
            <label style={{cursor:"pointer",display:"block",textAlign:"center",color:"gray",textDecoration:"underline",marginTop:"auto", marginBottom:"10px"}} onClick={onClickAdd}>新規登録はこちら</label>
        </Flex>
        
        <AddUserModal isOpen={open} onClose={() => setOpen(false)}/>
        </>
    )
}