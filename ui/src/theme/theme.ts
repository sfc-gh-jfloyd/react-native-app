import { createTheme, Theme } from "@mui/material";
import { snowflakeClient } from "@snowflake/native-apps";
import { useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e252f',
      paper: '#1e3f5d',
    },
    primary: {
      main: '#26a2cf',
      contrastText: '#fff',
    },
    secondary: {
      main: '#26a2cf'
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#29B5E8',
    },
  },
});

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    return snowflakeClient.setHandler('setTheme', snowflakeTheme => {
      console.log({snowflakeTheme})
      setTheme(snowflakeTheme === "dark" ? darkTheme : lightTheme);
      return Promise.resolve();
    });
  }, []);

  return theme;
};