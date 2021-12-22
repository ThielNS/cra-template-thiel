/**
 *
 * Private Page
 *
 */

import { Empty } from 'antd';
import { PropsWithPrivateLayout } from 'components/Layout/Private';

interface Props {}

function PrivatePage({ children }: PropsWithPrivateLayout<Props>) {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 200,
        }}
        description={<h2>PrivatePage</h2>}
      />
      {children}
    </div>
  );
}

export default PrivatePage;
