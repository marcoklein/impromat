import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  like: {
    // TODO switch color index for dark and light automatically
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 3],
  },
}));
