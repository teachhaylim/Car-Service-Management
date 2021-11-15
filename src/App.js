import GlobalStyles from 'components/GlobalStyles';
import { useRoutes } from 'react-router-dom';
import theme from 'utils/theme';
import routes from "./routes";
import PerfectScrollbar from 'react-perfect-scrollbar';
import store, { SetIsLogin, SetRole, SetUserInfo } from 'store';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, shallowEqual } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import basicConfig from 'utils/basicConfig';
import { LoggedInfo } from 'api/auth.api';
import { SetShopInfo } from 'store';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { useEffect, useState } from 'react';

document.title = basicConfig.appName + " - Management";

const CheckPermission = (token, isLogin) => {
  if (!token) {
    return false;
  }

  if (token && !isLogin) {
    return LoggedInfo()
      .then(res => {
        if (res.meta === 200) {
          store.dispatch(SetUserInfo(res.user));
          store.dispatch(SetShopInfo(res.shop));
          store.dispatch(SetIsLogin(true));
          store.dispatch(SetRole(res.user.type));
        }
      })
      .catch(err => {
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
  const [isLoading, setIsLoading] = useState(true);
  const routing = useRoutes(routes(isLoading, role));
  // const routing = useRoutes(routes(CheckPermission(token, isLogin), role));

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return
    }

    if (token && !isLogin) {
      LoggedInfo()
        .then(res => {
          if (res.meta === 200) {
            store.dispatch(SetUserInfo(res.user));
            store.dispatch(SetShopInfo(res.shop));
            store.dispatch(SetIsLogin(true));
            store.dispatch(SetRole(res.user.type));
            setIsLoading(true);
            return
          }
        })
        .catch(err => {
          toast.error(err.message);
          setIsLoading(false);
          return
        });
    }

    setIsLoading(true);
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
