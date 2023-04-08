import { render, screen } from '@testing-library/react';
import { AppWrapper } from './AppShell';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<AppWrapper />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
