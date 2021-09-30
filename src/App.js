import GlobalStyles from 'components/GlobalStyles';
import { useRoutes } from 'react-router-dom';
import theme from 'utils/theme';
import routes from "./routes";
import PerfectScrollbar from 'react-perfect-scrollbar';
import store, { SetIsLogin, SetRole, SetUserInfo } from 'store';
import { toast, ToastContainer } from 'react-toastify';
import { GetUserInfo } from 'api/user.api';
import { useSelector, shallowEqual } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import basicConfig from 'utils/basicConfig';

document.title = basicConfig.appName + " - Management";

const CheckPermission = (token, isLogin) => {
  if (!token) {
    return false;
  }

  if (token && !isLogin) {
    return GetUserInfo()
      .then(res => {
        if (res.meta === 200) {
          store.dispatch(SetUserInfo(res.data));
          store.dispatch(SetIsLogin(true));
          store.dispatch(SetRole(res.data.type));

          //TODO get shop info

          return true;
        }

        return false;
      })
      .catch(err => {
        console.log(err);
        toast.error(err.message);

        return false;
      });
  }

  return true;
};

//REWORK route problem on reload
const App = () => {
  const token = useSelector(state => state.token, shallowEqual);
  const isLogin = useSelector(state => state.isLogin, shallowEqual);
  const role = useSelector(state => state.role, shallowEqual);
  const routing = useRoutes(routes(CheckPermission(token, isLogin), role));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={3000}
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
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
