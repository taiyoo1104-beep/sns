import { memo, useContext, useEffect, useState, type FC } from "react";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useGetRooms } from "../../hooks/useGetRooms";
import { UserContext } from "../../providers/UserProvider";
import { CustomAvatar } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { AddRoomModal } from "../organisms/modal/AddRoomModal";
import { useCreateRoom } from "../../hooks/useCreateRoom";

export const Message: FC = memo(() => {
  const { getRooms, rooms } = useGetRooms();
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const {createRoom} = useCreateRoom()

  useEffect(() => {
  let unsubscribe: (() => void) | undefined;

  const setup = async () => {
    unsubscribe = await getRooms();
  };
  
  setup();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, [getRooms]);

  if (!loginUser) return null;

  const onClickAdd = () => setOpen(true)

  const handleSelectUser = (targetUserId : string) => {
    if(!loginUser) return;
    createRoom({myId:loginUser.user_id,targetUserId:targetUserId})
    setOpen(false)
  }

  return (
    <Box pt="90px" pb="40px" px={4}>
      <Stack gap={3}>
        {rooms.map((room) => {
          // 1. 相手の情報を判定
          const isUserOne = room.user_one === loginUser?.user_id;
          const partner = isUserOne ? room.user_two_info : room.user_one_info;

          return (
            <Flex
              key={room.id}
              p={4}
              align="center"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              borderBottom="solid 1px gray"
              onClick={() => navigate(`/message/${room.id}`)}
            >
              <CustomAvatar
                src={partner.avatar_url}
                name={partner.user_name}
                size="50px"
              />
              <Box ml={4} flex={1}>
                <Flex justify="space-between">
                  <Text fontWeight="bold">{partner.user_name}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {/* 時間の表示 */}
                  </Text>
                </Flex>
                <Text fontSize="sm" color="gray.600" truncate>
                  {room.last_message}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Stack>

      <Button
        borderRadius="full"
        position="fixed"
        zIndex={10}
        bottom="30px"
        right="30px"
        w="60px"
        h="60px"
        bg="#b066ff" 
        color="white"
        boxShadow="xl"
        fontSize="2xl"
        _hover={{ transform: "scale(1.1)" }}
        onClick={onClickAdd}
      >
        ＋
      </Button>
      <AddRoomModal isOpen={open} onClose={() => setOpen(false)} loginUserId={loginUser?.user_id} onSelectUser={handleSelectUser}/>
    </Box>
    
    
  );
  
});
