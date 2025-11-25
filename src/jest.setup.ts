import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import { queryClient } from '@/lib/query/client';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

beforeAll(() => {
  // https://github.com/TanStack/query/issues/1847
  // this prevents hanging after all tests finish
  queryClient.setDefaultOptions({ queries: { gcTime: 0 } });
});

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.reject());
});
