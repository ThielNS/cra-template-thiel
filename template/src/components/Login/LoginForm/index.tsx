/**
 *
 * LoginForm Component
 *
 */
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'modules/services';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const [form] = Form.useForm<FormValues>();
  const authService = new AuthService();
  const navigate = useNavigate();

  async function onSubmit(values: FormValues) {
    try {
      // TODO: Create a connection authentication here
      // const { data } = await authService.access(values);

      // FIXME: Remove this, as the access method already handles it.
      authService.authStorage.setAccessToken('ACCESS_TOKEN');
      authService.authStorage.setCurrentUser({
        id: 'USER_ID',
        name: 'USER_NAME',
      });

      navigate('/private');
    } catch {
      message.error('Não foi possível fazer a autenticação!');
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="email" label="E-mail" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Senha">
        <Input.Password />
      </Form.Item>

      <Button block type="primary" htmlType="submit">
        Acessar
      </Button>
    </Form>
  );
}

export default LoginForm;
