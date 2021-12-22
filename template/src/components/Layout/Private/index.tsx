import { Button, Col, Layout, Menu, PageHeader, Row } from 'antd';
import AuthStorage from 'modules/services/auth/authStorage';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRoutes } from 'react-router-context';
import './style.less';

interface Props {
  pageComponent?: React.ComponentType<PropsWithPrivateLayout>;
}

export type PropsWithPrivateLayout<P = {}> = P & {
  children: React.ReactElement | null;
};

function PrivateLayout({ pageComponent: Component }: Props) {
  const authStorage = new AuthStorage();
  const [visible, setVisible] = useState(!!authStorage.getAccessToken());
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useRoutes<{ title: string }>();

  useEffect(() => {
    if (!authStorage.getAccessToken()) {
      setVisible(false);
      navigate('/');
    } else {
      setVisible(true);
    }
  }, [location]);

  function logout() {
    authStorage.setAccessToken('');
    authStorage.setCurrentUser(null);
    navigate('/');
  }

  function renderContent() {
    if (Component) {
      return (
        <Component>
          <>
            <Outlet />
            <div style={{ height: 1000 }} />
          </>
        </Component>
      );
    }

    return <Outlet />;
  }

  if (!visible) return null;

  return (
    <Layout hasSider className="layout-private">
      <Layout.Sider width={250}>
        <PageHeader title="Rotas" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          {routes.map((item) => (
            <Menu.Item
              onClick={({ key }) => navigate(key === '//' ? '/' : key)}
              key={`/${item.path}`}
            >
              {item.params?.title}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Row justify="end">
            <Col>
              <Button type="primary" danger onClick={logout}>
                Sair
              </Button>
            </Col>
          </Row>
        </Layout.Header>
        {renderContent()}
      </Layout>
    </Layout>
  );
}

export default PrivateLayout;
