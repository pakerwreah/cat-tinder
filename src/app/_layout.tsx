import { SplashManager } from '@/components/SplashManager';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query/client';
import { Application } from '@/components/Application';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SplashManager>
        <Application />
      </SplashManager>
    </QueryClientProvider>
  );
}
