import { QueryClientProvider } from '@tanstack/react-query';

import { Application } from '@/components/Application';
import { SplashManager } from '@/components/SplashManager';
import { queryClient } from '@/lib/query/client';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SplashManager>
        <Application />
      </SplashManager>
    </QueryClientProvider>
  );
}
