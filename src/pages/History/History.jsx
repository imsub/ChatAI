import {
  Typography,
  Box,
  Stack,
  Divider
} from "@mui/material";
import {  useState } from "react";
import ChatHistoryCard from "../../components/ChatHistoryCard/ChatHistoryCard";
import ChatFilter from "../../components/ChatFilter/ChatFilter";
import Navbar from "../../components/Navbar/Navbar";

const getInitialChats = () => {
  const localChats = localStorage.getItem("chat");
  return localChats ? JSON.parse(localChats) : [];
};
export default function History() {
  const chats = getInitialChats();
  const [filteredChats, setFilteredChats] = useState(chats);

  return (
    <Box
      height={"100vh"}
      overflow={"hidden"}
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(151, 133, 186,0.4)",
          borderRadius: "8px",
        },
      }}
    >
      <Navbar />

      <Box p={{ xs: 2, md: 3 }}>
        <Typography variant="h2" textAlign={"center"} mb={3}>
          Conversation History
        </Typography>

        {chats.length > 0 && (
          <ChatFilter allChats={chats} filterChats={setFilteredChats} />
        )}

        {chats.length == 0 && (
          <Typography
            textAlign={"center"}
            p={3}
            bgcolor={"primary.light"}
            borderRadius={2}
          >
            No saved chats.
          </Typography>
        )}

        {chats.length > 0 && filteredChats.length == 0 && (
          <Typography
            textAlign={"center"}
            p={3}
            bgcolor={"primary.light"}
            borderRadius={2}
          >
            No such chats.
          </Typography>
        )}

        {filteredChats.length > 0 && (
          <Stack
            spacing={4}
            divider={
              <Divider sx={{ borderColor: "primary.bg", opacity: 0.4 }} />
            }
          >
            {filteredChats.map((item, index) => (
              <ChatHistoryCard details={item} key={index} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}