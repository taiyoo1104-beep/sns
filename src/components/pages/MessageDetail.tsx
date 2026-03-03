import { memo, useContext, useEffect, useRef, useState, type FC } from "react";
import { Box, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { CustomAvatar } from "../ui/avatar";
import { useSendMessage } from "../../hooks/useSendMessage";

export const MessageDetail: FC = memo(() => {
  const navigate = useNavigate();
  const { getMessages, messages } = useGetMessages();
  const { roomId } = useParams<{ roomId: string }>();
  const { loginUser } = useContext(UserContext);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");
  const { sendMessage } = useSendMessage();

  if (!loginUser) return;
  const partnerName =
    roomId?.replace(loginUser.user_id, "").replace("-", "") || "相手";

  // useEffect(() => {
  //   if (roomId) getMessages(roomId);
  // }, [getMessages, roomId]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!roomId) return;
    sendMessage({
      roomId: roomId,
      senderId: loginUser.user_id,
      content: content,
    });
    setContent("");
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (roomId) {
      // getMessagesを実行し、戻り値（解除関数）を受け取る
      const setupSubscription = async () => {
        unsubscribe = await getMessages(roomId);
      };
      setupSubscription();
    }

    // コンポーネントがアンマウントされたら購読を停止
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getMessages, roomId]);
  return (
    <Box pt="90px" pb="90px" px={4}>
      <Flex
        position="fixed"
        top={0}
        w="100vw"
        h="70px"
        bg="white"
        px={4}
        align="center"
        borderBottom="1px solid"
        borderColor="gray.200"
        zIndex={10}
        backgroundColor="black"
        left={0}
      >
        <Box
          as="button"
          onClick={() => navigate(-1)}
          px={2}
          mr={2}
          fontSize="2xl"
          cursor="pointer"
          _hover={{ opacity: 0.7 }}
          color="white"
        >
          ‹
        </Box>
        <CustomAvatar name={partnerName} size="40px" />
        <Text ml={3} fontWeight="bold" fontSize="lg" color="white">
          {partnerName}
        </Text>
      </Flex>

      <Stack gap={3}>
        {messages.map((message) => {
          const isMe = message.sender_id === loginUser.user_id;

          return (
            <Flex key={message.id} justify={isMe ? "flex-end" : "flex-start"}>
              <Box p={3} bg={isMe ? "#b066ff" : "white"} borderRadius="40px">
                <Text>{message.content}</Text>
              </Box>
            </Flex>
          );
        })}
        <div ref={scrollEndRef} />
      </Stack>

      {/* --- 下部送信フォーム --- */}
      <Box
        position="fixed"
        bottom={4} // 少し浮かせる
        left="50%" // 画面の真ん中へ
        transform="translateX(-50%)" // 自分の幅の半分だけ左に戻して完全に中央寄せ
        w="90vw" // 横幅
        bg="white"
        p={2} // 内側の余白を少し調整
        border="1px solid"
        borderColor="gray.200"
        zIndex={10}
        borderRadius="full" // 完全に丸くする
        boxShadow="lg" // 影をつけて浮かせる
      >
        <Flex align="center">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="メッセージを入力..."
            flex={1}
            p={3}
            bg="gray.100"
            borderRadius="20px"
            resize="none"
            rows={1}
            minH="40px"
            maxH="120px"
            border="none"
            _focus={{
              bg: "white",
              outline: "none",
              border: "1px solid",
              borderColor: "#b066ff",
            }}
          />
          <Text
            ml={4}
            color="#b066ff"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ opacity: 0.7 }}
            marginLeft="20px"
            onClick={handleSendMessage}
          >
            送信
          </Text>
        </Flex>
      </Box>
    </Box>
  );
});
