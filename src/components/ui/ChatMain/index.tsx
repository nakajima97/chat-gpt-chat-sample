import { Box } from "@mui/material";
import { ChatBubble } from "../ChatBubble";
import { ChatHistories } from "@/types";
import { FC } from "react";

type Props = {
  chatHistories: ChatHistories;
}

export const ChatMain: FC<Props> = ({chatHistories}) => {
  return (
    <Box sx={{ width: "100%", height: "100%", padding: "16px" }}>
      {chatHistories.map((chatHistory) => (
        <ChatBubble key={chatHistory.id} type={chatHistory.role} message={chatHistory.message} />
      ))}
    </Box>
  );
};
