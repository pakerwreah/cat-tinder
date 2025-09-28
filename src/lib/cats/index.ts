import { CAT_API_KEY, CAT_API_URL } from '@/env';
import { BasicHttpClient } from '@/lib/http/client';
import { useUserStore } from '@/lib/user/store';

import { CatsClient } from './client';

const httpClient = new BasicHttpClient(CAT_API_URL, { 'x-api-key': CAT_API_KEY });

const getUserId = () => useUserStore.getState().userId;

export const catsClient = new CatsClient(httpClient, getUserId);
