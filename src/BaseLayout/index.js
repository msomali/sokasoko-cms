import { Layout, Menu } from "antd";
import { Link, Switch, Route } from "react-router-dom";
import Player from "../Players";
import Playlist from "../Playlist";

import Advert from "../Advert";
import YTPage from "../YT";
import "./App.css";

const { Footer, Sider } = Layout;

const BaseLayout = ({ match: { url: baseUrl } }) => {
  return (
    <Layout hasSider>
      <Sider
        width="256"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <div style={{ height: "200px" }}></div>
          {/* <Menu.Item key="1">
            <Link to={`${baseUrl}/dashboard`}>Dashboard</Link>
          </Menu.Item> */}
          <Menu.Item key="1">
            <Link to={`${baseUrl}/players`}>Users</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`${baseUrl}/adverts`}>Advert</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`${baseUrl}/top-videos`}>Top Videos</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`${baseUrl}/yt-video`}>Youtube Video</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: "220px", backgroundColor: "" }}>
        <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Switch>
            {/* <Route
              exact
              path={`${baseUrl}/dashboard`}
              component={() => <h1>Dashboard</h1>}
            /> */}
            <Route path={`${baseUrl}/players`} component={Player} />
            <Route path={`${baseUrl}/adverts`} component={Advert} />
            <Route path={`${baseUrl}/top-videos`} component={Playlist} />
            <Route path={`${baseUrl}/yt-video`} component={YTPage} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
