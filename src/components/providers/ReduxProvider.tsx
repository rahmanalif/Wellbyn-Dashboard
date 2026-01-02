"use client";

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/lib/store/store';

/**
 * REDUX PROVIDER
 *
 * This component wraps your app with the Redux Provider.
 * It makes the Redux store available to all components in your app.
 *
 * We mark it as "use client" because Redux needs client-side JavaScript.
 * This is important in Next.js 13+ with the App Router.
 *
 * Uses useRef to ensure the store is only created once per client session.
 * This prevents the store from being recreated on every render, which would
 * lose all state including authentication tokens.
 */
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    // The auth slice will automatically load tokens from localStorage
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
