import {  useEffect, type FC } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../ui/dialog"
import { Box , Flex, Stack,Text} from "@chakra-ui/react";
import { CustomAvatar } from "../../ui/avatar";
import { useusersAll } from "../../../hooks/useAllUsers";

type Props = {
  isOpen : boolean;
  onClose : () => void;
  loginUserId : string;
  onSelectUser : (targetUserId : string) => void ;
}

export const AddRoomModal:FC<Props> = (props) => {
  const { isOpen,onClose,loginUserId,onSelectUser } = props;
  const { users,getUsers} = useusersAll();

  useEffect(() => {
    if(isOpen){
      getUsers(loginUserId)
    }
  },[isOpen,getUsers,loginUserId])

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogContent maxW="500px" w="90%" borderRadius="2xl"  maxH="80vh" overflow="hidden">
        <DialogHeader>新しいトークを開始する</DialogHeader>

        <DialogCloseTrigger/>

        <DialogBody pb={6} py={4} overflowY="auto">
          <Stack gap={4}>
            {users.map((user) => (
              <Flex
                key={user.user_id}
                align="center"
                p={4}
                cursor="pointer"
                borderRadius="lg"
                _hover={{ bg: "gray.50" }}
                onClick={() => {
                  onSelectUser(user.user_id);
                  onClose();
                }}
              >
                <CustomAvatar src={user.avatar_url} name={user.user_name} size="45px" />
                <Box ml={4}>
                  <Text fontWeight="bold">{user.user_name}</Text>
                  <Text fontSize="xs" color="gray.500">@{user.user_id}</Text>
                </Box>
              </Flex>
              ))}
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}