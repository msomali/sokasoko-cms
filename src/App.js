import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BaseLayout from "./BaseLayout";
import { createBrowserHistory } from "history";
import { StoreProvider } from "./State";
import SignIn from "./SignIn";

const history = createBrowserHistory();
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

const App = () => {
  return (
    <StoreProvider>
      <HashRouter hashType="hashbang" history={history}>
        <Switch>
          <Route path="/app" component={BaseLayout} />
          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
