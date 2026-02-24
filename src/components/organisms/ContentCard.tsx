import { Box, Flex, Spacer} from "@chakra-ui/react"
import { Heart, Home} from "lucide-react";
import type {  FC } from "react";

type Props = {
    children:string;
    userIcon:string;
    userName:string;
    userId:string;
    time:Date | string;
    category:string;
    goodCount:number;

}
export const ContentCard:FC<Props> = (props) => {
    const { children , userIcon,userName,userId,time,category,goodCount} = props;
    console.log(userIcon)
    return (
        <>
        <Flex justify="center" w="100%" mt="20px">
         <Box mt="10px"  border="solid 1px gray" boxShadow="md" borderRadius="lg" w="90%" h="auto" minH="100px" bg="#F6F7F8" p="13px">
             <Flex gap="10px" align="center">
                <Home/>
                <p style={{fontWeight:"bold"}}>{userName}</p>
                <p style={{color:"gray"}}>@{userId}・投稿日：{time instanceof Date ? time.toLocaleString() : time}</p>
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