import { useState, useCallback } from 'react';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { createWalletRequestAction } from '@root/src/dApp/wallet/actions';
import { r } from '../../routes/routePaths';
import { CircularLoader } from '../../components/Loader/CircularLoader';
import { CreatePasswordForm } from '../../components/app/CreatePasswordForm';
import { useActionAsync } from '@root/src/shared/redux/hooks/useAction';
import { useNavigate } from 'react-router';
import { notificationApi } from '../../components/notification';

export const NewWalletCreatePasswordPage = () => {
  const createWallet = useActionAsync(createWalletRequestAction);

  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const submitPassword = async data => {
    try {
      setIsloading(true);
      await createWallet({ password: data.password });
    } catch (e) {
      notificationApi.error(e.message, { position: 'bottom-center' });
    } finally {
      setIsloading(false);
    }
    navigate(r['/create-wallet']);
  };

  const onSubmit = useCallback(
    async data => {
      await submitPassword(data);
    },
    [submitPassword],
  );

  return (
    <div className="page new-wallet-create-password">
      {isLoading ? <CircularLoader inline={false} /> : null}
      <PageHeader title="Ωmega ωallet"></PageHeader>
      <CreatePasswordForm onSubmit={onSubmit} actionTitle="Create Wallet" />
    </div>
  );
};
