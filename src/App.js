
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'components/GlobalStyles';
import { useRoutes } from 'react-router-dom';
import theme from 'utils/theme';
import routes from "./routes";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Provider } from 'react-redux';
import store from 'store';
import { ToastContainer } from 'react-toastify';
import { CheckPermission } from 'utils/basicConfig';

const App = () => {
  const routing = useRoutes(routes(CheckPermission()));

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <PerfectScrollbar>
          {routing}
        </PerfectScrollbar>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
