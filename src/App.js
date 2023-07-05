import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import './App.css';
import Router from './router/Router';

function App() {

  const blogs = useSelector(state => state.blogs);

  const theme = createTheme({
    palette: {
      mode: (blogs.darkMode)?'dark':'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router/>
    </ThemeProvider>
    
  );
}

export default App;
