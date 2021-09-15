
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'components/GlobalStyles';
import { useRoutes } from 'react-router-dom';
import theme from 'utils/theme';
import routes from "./routes";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Provider } from 'react-redux';
import store from 'store';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <GlobalStyles />
      <CssBaseline />
      <PerfectScrollbar>
        {routing}
      </PerfectScrollbar>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
