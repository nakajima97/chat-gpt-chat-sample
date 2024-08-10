'use client';

import { ChatForm } from "@/components/ui/ChatForm";
import { ChatMain } from "@/components/ui/ChatMain";
import { Header } from "@/components/ui/Header";
import { ChatHistories } from "@/types";
import { Box } from "@mui/material";
import React, { useState } from "react";

export const Chat = () => {
  // 会話履歴を管理するためのstate
  const [chatHistories, setChatHistories] = useState<ChatHistories>([]);

  // チャット入力欄の値を管理するためのstate
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message === "") return;

    // 会話履歴の更新
    setChatHistories((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1]?.id + 1 || 0,
        message: message,
        role: "user",
      },
    ]);

    // APIを叩いてbotの返答を取得
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return false;

    setChatHistories((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1]?.id + 1 || 0,
        message: "",
        role: "bot",
      },
    ]);

    while(true) {
      const { done, value } = await reader.read();

      if (done) break;
      if (!value) continue;

      const decodedValue = decoder.decode(value);

      const lines = decodedValue.split("data: ")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      for (const line of lines) {
        try {
          const chunk = JSON.parse(line);
          const text = chunk.choices[0].delta.content || '';

          setChatHistories((prev) => (
            prev.map((chatHistory, index) => {
              const lastIndex = prev.length - 1;
              if (index === lastIndex) {
                return {
                  id: chatHistory.id,
                  message: chatHistory.message + text,
                  role: "bot",
                };
              }
              return chatHistory
            }
          )));
        } catch (error) {
          console.error(error);
        }
      }
    }

    // チャット入力欄の初期化
    setMessage("");
  };

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
        <ChatMain chatHistories={chatHistories}/>
      </Box>
      <Box sx={{ width: "100%" }}>
        <ChatForm message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </Box>
    </Box>
  );
};
