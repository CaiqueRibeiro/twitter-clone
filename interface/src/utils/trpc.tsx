
'use client'

import { httpLink } from '@trpc/client';
import SuperJSON from 'superjson';
import type { AppRouter } from './server-types';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function getBaseUrl() {
  return `http://localhost:3333`;
}

let token: string;

export function setToken(newToken: string) {
  localStorage.setItem('access_token', newToken);
  token = newToken;
}

export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});


export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpLink({
          url: `${getBaseUrl()}/trpc`,
          headers() {
            return token ? {
              Authorization: `Bearer ${token}`,
            } : {};
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}