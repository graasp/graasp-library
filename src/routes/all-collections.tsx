import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/all-collections')({
  beforeLoad: ({ search }) => {
    throw redirect({ to: '/search', search });
  },
});
