import { Loading3QuartersOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider as  AuthContextProvider } from "context";
import { Routes } from "constants/routes";
import { PublicRoute } from "Routes";


const Task_page = lazy(() => import("components/page/Task_page"));
const ChequeActivated = lazy(() => import("components/page/ChequeActivated"));

function App() {
  return (
    <Router>
      <Suspense fallback={ <Loading3QuartersOutlined /> }> 
      <AuthContextProvider>
      <Switch>
      <PublicRoute exact path="/" component={ Task_page as any } />
      <PublicRoute exact path="/reword_success" component={ ChequeActivated as any } />
      </Switch>
      </AuthContextProvider>
      </Suspense>
  </Router>
  );
}

export default App;
