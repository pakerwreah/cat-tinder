import { type ReactNode, createContext, useContext } from 'react';

import { CAT_API_KEY, CAT_API_URL } from '@/env';
import { BasicHttpClient } from '@/lib/http/client';
import { useUserStore } from '@/lib/user/store';

import { CatsClient } from './client';

export { type CatsClient };

const ClientContext = createContext<CatsClient>(null!);

type ProviderProps = { children: ReactNode; client: CatsClient };

export function CatsClientProvider({ children, client }: ProviderProps) {
  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>;
}

export const useCatsClient = () => useContext(ClientContext);

// Default Client

const httpClient = new BasicHttpClient(CAT_API_URL, { 'x-api-key': CAT_API_KEY });

const getUserId = () => useUserStore.getState().userId;

export const defaultCatsClient = new CatsClient(httpClient, getUserId);
