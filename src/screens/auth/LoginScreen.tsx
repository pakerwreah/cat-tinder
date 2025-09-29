import { useCallback, useRef, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import { randomUUID } from 'expo-crypto';

import { twMerge } from 'tailwind-merge';

import Logo from '@/assets/images/logo.png';
import { FormScrollView } from '@/components/FormScrollView';
import { useUserStore } from '@/lib/user/store';

export function LoginScreen() {
  const passwordRef = useRef<TextInput>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = username.length > 0 && password.length > 0;

  const submit = useCallback(() => {
    useUserStore.setState({ userId: randomUUID() });
  }, []);

  return (
    <FormScrollView>
      <View className="size-full max-w-[60%] justify-center gap-8 self-center">
        <Image className="size-40 self-center" source={Logo} />
        <View className="gap-4">
          <TextInput
            className="h-10 w-full rounded-lg border-2 border-black px-2 text-base leading-tight"
            placeholder="Login"
            autoCapitalize="none"
            textContentType="username"
            keyboardType="ascii-capable"
            returnKeyType="next"
            defaultValue={username}
            onChangeText={setUsername}
            onSubmitEditing={() => passwordRef.current?.focus()}
            submitBehavior="submit"
          />
          <TextInput
            ref={passwordRef}
            className="h-10 w-full rounded-lg border-2 border-black px-2 text-base leading-tight"
            placeholder="Password"
            autoCapitalize="none"
            textContentType="password"
            keyboardType="visible-password"
            secureTextEntry
            returnKeyType="done"
            defaultValue={password}
            onChangeText={setPassword}
          />

          <Pressable
            className={twMerge('rounded-lg bg-primary p-2 active:opacity-50 disabled:opacity-50')}
            disabled={!canSubmit}
            onPress={submit}
          >
            <Text className="text-center font-extrabold text-base text-white">Log in</Text>
          </Pressable>
          <Text className="text-center font-semibold text-sm text-gray-dark">(type anything)</Text>
        </View>
      </View>
    </FormScrollView>
  );
}
