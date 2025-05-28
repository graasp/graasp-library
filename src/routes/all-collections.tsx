import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/all-collections')({
  beforeLoad: () => {
    throw redirect({ to: '/search' });
  },
});
