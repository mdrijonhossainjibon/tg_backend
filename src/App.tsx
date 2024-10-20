import { Loading3QuartersOutlined } from "@ant-design/icons";
import { lazy, Suspense, useEffect } from "react";
import { Redirect, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { AuthProvider as AuthContextProvider } from "context";
import { PublicRoute } from "Routes";
import { useDispatch, useSelector } from "react-redux";
import { getAccountRequest, RootState, setQueryParams } from "modules";


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

function App() {

  const queryParams: any = {};
  const dispatch = useDispatch(); // Initialize dispatch
  
  
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
      dispatch(getAccountRequest(queryParams))
      
    }
  }, [dispatch , window.Telegram ]);
 

 

  return (
    <Router>
      <Suspense fallback={<Loading3QuartersOutlined />}>
        <AuthContextProvider>
          <Switch>
            <PublicRoute exact path="/" component={Task_page as any} />
            <PublicRoute exact path="/reword_success" component={ChequeActivated as any} />
           
          </Switch>
        </AuthContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
