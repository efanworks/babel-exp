import { Layout, Menu } from "antd";
import { useNavigate, useLocation, useRoutes } from "react-router-dom";
import { routes } from "../../routes";
import s from "./index.module.scss";

const { Sider, Content } = Layout;

const menuItems = [
  { key: "/tasks-zustand", label: "Tasks for Zustand", path: "/tasks-zustand" },
  {
    key: "/useSyncExternalTest",
    label: "External store",
    path: "/useSyncExternalTest"
  },
  {
    key: "/tasks-with-redux",
    label: "Tasks for Redux",
    path: "/tasks-with-redux"
  }
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const routesElement = useRoutes(routes);

  return (
    <Layout className={s.layout}>
      <Sider className={s.sider} theme="light" width={200}>
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems.map(({ key, label }) => ({ key, label }))}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Content className={s.content}>{routesElement}</Content>
      </Layout>
    </Layout>
  );
}
