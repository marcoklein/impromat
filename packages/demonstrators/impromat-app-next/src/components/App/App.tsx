'use client';

import { AppShell } from '@mantine/core';

import { PropsWithChildren, useState } from 'react';
import { MainNavbar } from '../MainNavbar/MainNavbar';

interface ContainerProps extends PropsWithChildren {}

export const App: React.FC<ContainerProps> = ({ children }) => {
  const [opened] = useState(true);

  return (
    <AppShell
      layout="alt"
      padding="md"
      navbar={<MainNavbar hidden={!opened} />}
      // header={
      // <Header height={{ base: 50, md: 70 }} p="md">
      //   <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
      // </Header>
      // }
    >
      {children}
      {/* Your application here */}
      {/* {opened && <Overlay />} */}
    </AppShell>
  );
};
