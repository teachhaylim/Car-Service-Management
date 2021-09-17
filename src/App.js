
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'components/GlobalStyles';
import { useRoutes } from 'react-router-dom';
import theme from 'utils/theme';
import routes from "./routes";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Provider, useDispatch } from 'react-redux';
import store from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetUserInfo } from 'api/user.api';
import { SetUserInfo } from 'store';
import { SetIsLogin } from 'store';

const CheckPermission = () => {
  if (!store.getState().token && !store.getState().isLogin) {
    return true;
  }

  if (store.getState().token && !store.getState().isLogin) {
    GetUserInfo()
      .then(res => {
        store.dispatch(SetUserInfo(res.data));
        store.dispatch(SetIsLogin(true));
        return true;
      })
      .catch(err => console.log(err));
  }

  return "dasdasd";
}

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
