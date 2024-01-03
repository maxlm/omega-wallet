import { Navigate, Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { r } from './routes/routePaths';
import { OnboardingPage } from './pages/Onboarding/OnboardingPage';
import { CreateWalletPage } from './pages/CreateWallet/CreateWalletPage';
import { RestoreWalletPage } from './pages/RestoreWallet/RestoreWalletPage';
import { HomePage } from './pages/Home/HomePage';
import { useAction } from '../shared/redux/hooks/useAction';
import { initWalletRequestAction, restoreWalletRequestAction } from '../dApp/wallet/actions';
import { CircularLoader } from './components/Loader/CircularLoader';
import { selectIsWalletStored, selectRequirePassword } from '../dApp/wallet/selectors';
import { ChooseProviderpage } from './pages/ChooseProvider/ChooseProviderpage';
import { EnterPasswordPage } from './pages/EnterPassword/EnterPasswordPage';
import { NewWalletCreatePasswordPage } from './pages/NewWalletCreatePassword/NewWalletCreatePasswordPage';
import '../assets/style/all.scss';
import { delay } from '../shared/utils';
import { RestoreWalletCreatePasswordPage } from './pages/RestoreWalletCreatePassword/RestoreWalletCreatePasswordPage';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const initWallet = useAction(initWalletRequestAction<void>);
  const restoreWallet = useAction(restoreWalletRequestAction);
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        await initWallet();
        await restoreWallet({});
        // simulate network delay for demonstration purpose
        await delay(1000);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const hasWallet = useSelector(selectIsWalletStored);
  const requirePassword = useSelector(selectRequirePassword);

  return isLoading ? (
    <CircularLoader inline={false} />
  ) : (
    <Routes>
      <Route path={r['/home']} element={<HomePage />} />

      <Route path={r['/select-wallet-provider']} element={<ChooseProviderpage />} />
      <Route path={r['/enter-password']} element={<EnterPasswordPage />} />

      <Route path={r['/onboarding']} element={<OnboardingPage />} />

      <Route path={r['/create-wallet']} element={<CreateWalletPage />} />
      <Route path={r['/create-wallet/create-password']} element={<NewWalletCreatePasswordPage />} />

      <Route path={r['/restore-wallet']} element={<RestoreWalletPage />} />
      <Route path={r['/restore-wallet/create-password']} element={<RestoreWalletCreatePasswordPage />} />

      <Route
        element={
          hasWallet ? (
            requirePassword ? (
              <Navigate to={r['/enter-password']} />
            ) : (
              <Navigate to={r['/home']} />
            )
          ) : (
            <Navigate to={r['/onboarding']} />
          )
        }
        index
      />
    </Routes>
  );
};
