import {  Box, Flex, Spacer} from "@chakra-ui/react"
import { Heart} from "lucide-react";
import type {  FC } from "react";
import { CustomAvatar } from "../ui/avatar";

type Props = {
    children:string;
    time:Date | string;
    category:string;
    goodCount:number;
    users: {
    user_name:string;
    avatar_url:string;
    user_id:string;
  } | null
}
export const ContentCard:FC<Props> = (props) => {
    const { children ,time,category,goodCount,users} = props;
    
    const formatDate = (dateStr: string|Date) => {
      const date = new Date(dateStr);
      if(isNaN(date.getTime())) return "日付不明" ;

      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2,"0");
      const d = String(date.getDay() + 1).padStart(2,"0");

      return `${y}年${m}月${d}日`
    }

    return (
        <>
        <Flex justify="center" w="100%" mt="20px">
         <Box mt="10px"  border="solid 1px gray" boxShadow="md" borderRadius="lg" w="90%" h="auto" minH="100px" bg="#F6F7F8" p="13px">
             <Flex gap="10px" align="center">
                <CustomAvatar src={users?.avatar_url} name={users?.user_name} size="40px"/>
                <p style={{fontWeight:"bold"}}>{users?.user_name}</p>
                <p style={{color:"gray"}}>@{users?.user_id}・投稿日：{formatDate(time)}</p>
                <div style={{background:"#cccccc" , borderRadius:"20px" , fontWeight:"bold" ,padding: "2px 10px"}}>#{category}</div>

                <Spacer/>

                <Flex align="center" gap="5px" mr="12px" >
                  <Box _hover={{opacity:0.4}}>
                  <Heart size={18} />
                  </Box>
                  <p style={{ fontWeight: "bold" }}>{goodCount}</p>
                </Flex>
              </Flex>
              <Box mt="13px" wordBreak="break-word">
                <p>{children}</p>
              </Box>
          </Box>        
        </Flex>
        </>
    )
}