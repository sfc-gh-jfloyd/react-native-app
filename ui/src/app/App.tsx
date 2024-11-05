import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from '../theme/theme';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
