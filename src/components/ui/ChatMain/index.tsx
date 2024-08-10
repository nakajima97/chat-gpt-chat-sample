import { Box } from "@mui/material"
import { ChatBubble } from "../ChatBubble"

export const ChatMain = () => {
  return (
    <Box sx={{width: '100%', height: '100%', padding: '16px'}}>
      <ChatBubble type='user' message='Hello' />
      <ChatBubble type='bot' message='Hello, how can I help you today?' />
    </Box>
  )
}