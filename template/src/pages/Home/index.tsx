/**
 *
 * Home Page
 *
 */

import { Empty } from 'antd';
import { PropsWithPublicLayout } from 'components/Layout/Public';
import { Link } from 'react-router-dom';

interface Props {}

function HomePage({ children }: PropsWithPublicLayout<Props>) {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 200,
        }}
        description={
          <div>
            <h2>HomePage</h2>
            <Link to="login">Login</Link>
          </div>
        }
      />
      {children}
    </div>
  );
}

export default HomePage;
