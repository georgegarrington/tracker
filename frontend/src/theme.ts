import { createTheme } from "@mui/material";

export const THEME = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#E2E4F6" },
    secondary: { main: "#E7C8DD" },
    ggtest: { main: "#471f11ff" },
    background: {
      paper: "#f0f0f0",
      default: "#f8f8f8ff",
    },
    text: {
      primary: "#000000ff",
      secondary: "#555555ff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
