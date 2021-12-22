import { ReactRouterContext } from 'react-router-context';
import { Layout } from 'components';
import { HomePage, LoginPage, PrivatePage } from 'pages';

function Routing() {
  return (
    <ReactRouterContext
      routes={[
        {
          path: 'private',
          element: <Layout.Private pageComponent={PrivatePage} />,
          roles: [],
          params: { title: 'Private' },
        },
        {
          path: 'login',
          element: <Layout.Public pageComponent={LoginPage} />,
          roles: [],
          params: { title: 'Login' },
        },
        {
          path: '/',
          element: <Layout.Public pageComponent={HomePage} />,
          roles: [],
          params: { title: 'Home' },
        },
      ]}
    />
  );
}

export default Routing;
