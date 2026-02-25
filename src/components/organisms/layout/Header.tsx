import { useCallback, useContext, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box,  Flex, Heading,  Link } from "@chakra-ui/react";
import { Home, LogOut, MessageCircle, PlusCircle, SettingsIcon } from "lucide-react";
import { UserContext } from "../../../providers/UserProvider";
import { CustomAvatar } from "../../ui/avatar";

export const Header:FC = () => {
  //変数
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext)

  //関数
  //リンクの遷移
  const onClickProfile = useCallback(() => {
    navigate("/profile");
  },[]);

  const onClickTimeline = useCallback(() => {
    navigate("/timeline");
  },[]);

  const onClickNewpost = useCallback(() => {
    navigate("/newpost");
  },[]);

  const onClickMessage = useCallback(() => {
    navigate("/message");
  },[]);
  
  const onClickSetting = useCallback(() => {
    navigate("/setting");
  },[]);

  return (
    <>
    <Flex as="nav" bg="black" color="gray.50" align="center" justify="space-between" padding={{base:3,md:5}}>

      <Flex align="center" as="a" mr={8} _hover={{cursor:"pointer"}} onClick={onClickTimeline}>
      <Heading as="h1" fontSize={{ base:"md",md:"lg"}}>Y</Heading>
      </Flex>

      <Flex align="center" fontSize="sm" flexGrow={2} display={{base:"none",md:"flex"}} justifyContent="right">
        <Box pr={10}>
        <Link color="white" onClick={onClickProfile}><CustomAvatar src={loginUser?.avatar_url} size="30px"/></Link>
        </Box>
        <Box pr={10}>
        <Link  color="white"onClick={onClickTimeline}><Home/></Link>
        </Box>
        <Box pr={10}>
        <Link color="white" onClick={onClickNewpost}><PlusCircle/></Link>
        </Box>
        <Box pr={10}>
        <Link color="white" onClick={onClickMessage}><MessageCircle/></Link>
        </Box>
        <Box pr={10}>
        <Link color="white" onClick={onClickSetting}><SettingsIcon/></Link>
        </Box>
        <Box>
          <LogOut/>
        </Box>
      </Flex>  

    </Flex>
    </>
  )
}