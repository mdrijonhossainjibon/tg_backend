import { Loading3QuartersOutlined } from "@ant-design/icons";
import { lazy, Suspense, useEffect } from "react";
import { Redirect, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { AuthProvider as AuthContextProvider } from "context";
import { PrivateRoute, PublicRoute } from "Routes";
import { useDispatch, useSelector } from "react-redux";
import { getAccountRequest, RootState, setQueryParams } from "modules";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Routes } from "constants/routes";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
}

interface QueryParams {
  user?: User;
  chat_instance?: string;
  chat_type?: string;
  start_param?: string;
  auth_date?: string;
  hash?: string;
}

const Task_page = lazy(() => import("components/page/Task_page"));
const ChequeActivated = lazy(() => import("components/page/ChequeActivated"));
const auth = lazy(() => import('components/page/auth'))
function App() {

  const queryParams: any = {};
  const dispatch = useDispatch(); // Initialize dispatch
  const history = useHistory()

  useEffect(() => {
    if (window.Telegram) {
      const urlEncodedString = window.Telegram.WebApp.initData;
      const decodedString = decodeURIComponent(urlEncodedString);
      const queryParamsArray = decodedString.split('&');

      queryParamsArray.forEach(param => {
        const [key, value] = param.split('=');
        queryParams[key as keyof QueryParams] = value;
      });

      if (queryParams.user) {
        try {
          queryParams.user = JSON.parse(queryParams.user) as User;
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }

      // Dispatch the query params to Redux
      dispatch(setQueryParams(queryParams));
       
    }
  }, [dispatch, window.Telegram]);
 

  useEffect(() =>{
    if (window.Telegram.WebApp.initDataUnsafe.user) {
        history.push('/task')
    }
  },[ queryParams , history ])

  return (
    <>
      <GoogleOAuthProvider clientId="109113138013-tv5kg8bh40tub6lgqi1tpm5jofvn2dis.apps.googleusercontent.com">
        <Router>
          <Suspense fallback={<Loading3QuartersOutlined />}>
            <AuthContextProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Task_page as any} />
                <PublicRoute exact path="/task" component={Task_page as any} />
                <PublicRoute exact path="/reword_success" component={ChequeActivated as any} />
                <PublicRoute exact path={ Routes.Login } component={ auth } />
                 <Redirect to='/task' />
              </Switch>
            </AuthContextProvider>
          </Suspense>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
