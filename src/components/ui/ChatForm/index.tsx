import { Box, Button, TextField } from "@mui/material";
import { FC } from "react";

type Props = {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}

export const ChatForm: FC<Props> = ({message, setMessage, sendMessage}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "8px",
        padding: "16px",
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        placeholder="何か聞きたいことhあありますか？"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" onClick={sendMessage}>送信</Button>
    </Box>
  );
};
