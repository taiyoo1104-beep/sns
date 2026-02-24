import { Box, Image as ChakraImage } from "@chakra-ui/react";

// 自作のAvatarコンポーネント
export const CustomAvatar = ({ src, name, size = "32px" }: { src?: string; name?: string; size?: string }) => {
  return (
    <Box
      w={size}
      h={size}
      borderRadius="full"
      overflow="hidden"
      bg="gray.300"
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px solid #ccc"
    >
      {src ? (
        <ChakraImage src={src} alt={name} w="100%" h="100%" objectFit="cover" />
      ) : (
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "white" }}>
          {name?.charAt(0) || "?"}
        </span>
      )}
    </Box>
  );
};