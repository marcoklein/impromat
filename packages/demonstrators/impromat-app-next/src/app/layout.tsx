'use client';

import { withUrqlClient } from 'next-urql';
import { App } from '../components/App/App';
import RootStyleRegistry from './emotion-provider';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <RootStyleRegistry>
          <App>{children}</App>
        </RootStyleRegistry>
      </body>
    </html>
  );
}

export default withUrqlClient(() => ({ url: 'http://localhost:8080/graphql' }))(RootLayout);
