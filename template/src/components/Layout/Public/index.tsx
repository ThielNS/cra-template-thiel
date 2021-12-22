import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  pageComponent?: React.ComponentType<PropsWithPublicLayout<any>>;
}

export type PropsWithPublicLayout<P> = P & {
  children: React.ReactElement | null;
};

function PublicLayout({ pageComponent: Component }: Props) {
  function renderChildren() {
    if (Component) {
      return (
        <Component>
          <Outlet />
        </Component>
      );
    }

    return <Outlet />;
  }

  return <>{renderChildren()}</>;
}

export default PublicLayout;
