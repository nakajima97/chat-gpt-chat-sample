import { Box, Button, TextField } from "@mui/material"

export const ChatForm = () => {
  return (
    <Box sx={{width: '100%', height: '100%', display: "flex", gap: '8px', padding: '16px'}}>
      <TextField sx={{ flexGrow: 1 }} placeholder="何か聞きたいことhあありますか？"/>
      <Button variant='contained'>送信</Button>
    </Box>
  )
}