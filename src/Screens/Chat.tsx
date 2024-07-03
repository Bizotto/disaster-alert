import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { FlatList, Platform } from "react-native";
import { IAlert } from "./Home";

type MessageProps = {
  id: number;
  message: string | undefined;
};

interface ChatProps {
  data: IAlert; // Assuming IAlert is defined elsewhere
}

export function Chat() {
  const { params } = useRoute() as { params: ChatProps };

  // Define the state for messages with the correct initial value and type
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: 1,
      message: "Passei pelo Local, está complicado",
    },
    {
      id: 2,
      message: "Alguém ferido ?",
    },
    {
      id: 3,
      message: "Alguma noticia se o problema já foi resolvido ?",
    },
  ]);

  const [message, setMessage] = useState<string | undefined>();
  function handleSendMessage() {
    if (message) {
      // Ensure message is not undefined before proceeding
      const newMessage: MessageProps = {
        id: messages.length + 1,
        message: message,
      };
      setMessages([...messages, newMessage]);
      resetMessage();
    }
  }

  function resetMessage() {
    setMessage("");
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView
        flex="1"
        h={{
          base: "400px",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack
          safeArea
          justifyContent="space-between"
          bg="trueGray.900"
          flex="1"
        >
          <Center>
            <Heading color="white">Chat</Heading>
          </Center>

          <VStack mx="4">
            <FlatList
              data={messages}
              renderItem={({ item, index }) => (
                <ChatCard text={item?.message} index={index} />
              )}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => <Box h="4" />}
            />

            <HStack
              mt="8"
              space="4"
              alignItems="center"
              justifyContent="center"
            >
              <Input
                value={message}
                onChangeText={setMessage}
                rounded="md"
                minH="12"
                borderColor="trueGray.700"
                placeholder="Digite sua mensagem aqui..."
                color="white"
                flex="1"
                _focus={{
                  borderColor: "violet.700",
                  bg: "trueGray.800",
                  selectionColor: "violet.700",
                }}
              />
              <Pressable onPress={handleSendMessage}>
                <Icon as={Feather} name="send" size="2xl" color="violet.700" />
              </Pressable>
            </HStack>
          </VStack>
        </VStack>
      </KeyboardAvoidingView>
    </>
  );
}

interface ChatCardProps {
  text: string | undefined;
  index: number;
}
function ChatCard({ text, index }: ChatCardProps) {
  return (
    <Box
      w="80%"
      bg={index % 2 === 0 ? "violet.900" : "darkBlue.900"}
      h="16"
      justifyContent="center"
      p="4"
      roundedBottom="xl"
      roundedTopRight="xl"
    >
      <Text color="white" fontSize="xl">
        {text}
      </Text>
    </Box>
  );
}
