import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { createWalletRequestAction } from '@root/src/dApp/wallet/actions';
import { r } from '../../routes/routePaths';
import { CircularLoader } from '../../components/Loader/CircularLoader';
import { CreatePasswordForm } from '../../components/app/CreatePasswordForm';
import { useActionAsync } from '@root/src/shared/redux/hooks/useAction';
import { notificationApi } from '../../components/notification';

export const RestoreWalletCreatePasswordPage = () => {
  const {
    state: { phrase },
  } = useLocation();
  const restoreWallet = useActionAsync(createWalletRequestAction);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!phrase) {
      navigate('/onboarding');
    }
  }, []);

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      await restoreWallet({
        phrase,
        password: data.password,
      });
      navigate(r['/home']);
    } catch (e) {
      notificationApi.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page restore-wallet-create-password">
      {isLoading ? <CircularLoader inline={false} /> : null}
      <PageHeader title="Ωmega ωallet"></PageHeader>
      <CreatePasswordForm onSubmit={onSubmit} actionTitle="Restore Wallet" />
    </div>
  );
};
