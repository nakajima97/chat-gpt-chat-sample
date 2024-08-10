import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
