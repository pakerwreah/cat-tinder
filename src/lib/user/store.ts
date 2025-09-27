import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { randomUUID } from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type StoreApi } from 'zustand/vanilla';

type UserState = {
  userId: string;
  _hydrated: boolean;
};

type UserActions = {
  update: StoreApi<UserState>['setState'];
};

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set): UserStore => ({
      userId: '',
      _hydrated: false,
      update: set,
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!state || error) {
          console.error('Hydration error', error);
          return;
        }
        const userId = state.userId || randomUUID();
        state.update({ userId, _hydrated: true });
      },
    },
  ),
);
