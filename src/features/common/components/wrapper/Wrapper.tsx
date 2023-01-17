import React, { PropsWithChildren, useEffect } from 'react';

const PageWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children as React.ReactElement;
};

export default PageWrapper;
