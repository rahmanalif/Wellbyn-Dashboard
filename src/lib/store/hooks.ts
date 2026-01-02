import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * CUSTOM REDUX HOOKS
 *
 * These are typed versions of the standard Redux hooks.
 * Using these instead of plain `useDispatch` and `useSelector`
 * gives you better TypeScript autocomplete and type safety.
 *
 * Usage:
 * - Instead of: const dispatch = useDispatch()
 *   Use: const dispatch = useAppDispatch()
 *
 * - Instead of: const user = useSelector((state) => state.auth.user)
 *   Use: const user = useAppSelector((state) => state.auth.user)
 */

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Use throughout your app instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
