import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('has correct Next.js theming section link', () => {
    render(<App />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
