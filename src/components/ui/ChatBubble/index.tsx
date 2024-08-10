'use client'

import { useTheme } from "@emotion/react"
import { Box, Typography } from "@mui/material"
import React from "react"

type Props = {
  'type': 'user' | 'bot',
  'message': string
}

export const ChatBubble: React.FC<Props> = ({type, message}) => {
  const theme = useTheme();

  const generateBackgroundColor = () => {
    if (type === 'user') return '#afeeee';
    if (type === 'bot') return '#d3d3d3'
  }

  const generateJustifyContent = () => {
    if (type === 'user') return 'end'
    if (type === 'bot') return 'start'
  }

  return (
    <Box sx={{width: '100%', display: "flex", justifyContent: generateJustifyContent()}}>
      <Box sx={{ backgroundColor: generateBackgroundColor(), borderRadius: '16px', padding: '8px' }}>
        <Typography>{message}</Typography>
      </Box>
    </Box>
  )
}