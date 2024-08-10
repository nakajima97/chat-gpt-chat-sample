import { ChatForm } from "@/components/ui/ChatForm";
import { ChatMain } from "@/components/ui/ChatMain";
import { Header } from "@/components/ui/Header";
import { Box, Button } from "@mui/material";
import React from "react";

export const Chat = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        width: "100vhw",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Header />
      </Box>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <ChatMain />
      </Box>
      <Box sx={{ width: "100%" }}>
        <ChatForm />
      </Box>
    </Box>
  );
};
