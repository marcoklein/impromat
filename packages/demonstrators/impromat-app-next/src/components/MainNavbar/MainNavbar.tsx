import { Code, Group, NavLink, Navbar, ScrollArea, Transition } from '@mantine/core';

import {
  IconBooks,
  IconInfoCircle,
  IconLogin,
  IconShare,
  IconUser,
  IconWallpaper,
} from '@tabler/icons-react';
import Link from 'next/link';
import useStyles from './MainNavbar.styles';

interface ContainerProps {
  hidden: boolean;
  user?: { name: string };
}

export const MainNavbar: React.FC<ContainerProps> = ({ hidden, user }) => {
  const { classes } = useStyles();

  return (
    <Transition mounted={!hidden} transition="fade" duration={400} timingFunction="ease">
      {(styles) => (
        <Navbar width={{ sm: 300 }} className={classes.navbar} style={styles}>
          <Navbar.Section className={classes.toolbar}>
            <Group position="apart">
              Impromat
              <IconShare />
            </Group>
          </Navbar.Section>
          <Navbar.Section p="md" grow component={ScrollArea}>
            {user ? (
              <NavLink label="Profile" icon={<IconUser />} />
            ) : (
              <NavLink label="Sign Up" icon={<IconLogin />} />
            )}
            <NavLink label="Workshops" icon={<IconWallpaper />} />
            <NavLink
              label="Element Library"
              icon={<IconBooks />}
              component={Link}
              href="/element-library"
            />
            <NavLink label="About" icon={<IconInfoCircle />} />
          </Navbar.Section>
          <Navbar.Section p="md">
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Navbar.Section>
        </Navbar>
      )}
    </Transition>
  );
};
