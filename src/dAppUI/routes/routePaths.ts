import { popupRoutes } from '@root/src/shared/routing/popupRoutes';

export const appPaths = {
  ...popupRoutes,

  ['/onboarding']: '/onboarding',

  ['/restore-wallet']: '/restore-wallet',
  ['/restore-wallet/create-password']: '/restore-wallet/create-password',

  ['/create-wallet']: '/create-wallet',
  ['/create-wallet/create-password']: '/create-wallet/create-password',

  ['/home']: '/home',
} as const;

export const r = appPaths;
