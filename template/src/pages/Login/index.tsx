/**
 *
 * Login Page
 *
 */

import { Card, Col, Row } from 'antd';
import { PropsWithPublicLayout } from 'components/Layout/Public';
import { LoginForm } from 'components/Login';
import AuthStorage from 'modules/services/auth/authStorage';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.less';

interface Props {}

function LoginPage(props: PropsWithPublicLayout<Props>) {
  const authStorage = new AuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStorage.getAccessToken()) {
      navigate('/private');
    }
  }, []);

  return (
    <Row align="middle" justify="center" className="login-page">
      <Col span={24} md={6}>
        <Card>
          <h2>Login</h2>
          <LoginForm />
          <Link to="/">Ir para home</Link>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginPage;
