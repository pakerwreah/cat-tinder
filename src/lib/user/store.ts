import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type StoreApi } from 'zustand/vanilla';

type UserState = {
  userId: string;
  _hydrated: boolean;
};

type UserActions = {
  update: StoreApi<UserState>['setState'];
  reset(): void;
};

const initialState = (): Omit<UserState, '_hydrated'> => ({
  userId: '',
});

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set): UserStore => ({
      ...initialState(),
      _hydrated: false,
      update: set,
      reset() {
        set(initialState);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!state || error) {
          console.error('Hydration error', error);
          return;
        }
        state.update({ _hydrated: true });
      },
    },
  ),
);
