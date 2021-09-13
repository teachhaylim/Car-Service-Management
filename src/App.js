
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'components/GlobalStyles';
import { useRoutes } from 'react-router-dom';
import theme from 'utils/theme';
import routes from "./routes";
import PerfectScrollbar from 'react-perfect-scrollbar';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <PerfectScrollbar>
        {routing}
      </PerfectScrollbar>
    </ThemeProvider>
  );
};

export default App;
