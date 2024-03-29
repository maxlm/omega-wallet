import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentWallet } from '@root/src/dApp/wallet/selectors';

import { useActionAsync } from '@root/src/shared/redux/hooks/useAction';
import { initWalletRequestAction, restoreWalletRequestAction } from '@root/src/dApp/wallet/actions';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { CircularLoader } from '../../components/Loader/CircularLoader';
import { delay } from '@root/src/shared/utils';
import { notificationApi } from '../../components/notification';

export const HomePage = () => {
  const initWallet = useActionAsync(initWalletRequestAction<void>);
  const restoreWallet = useActionAsync(restoreWalletRequestAction);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        await initWallet();
        await restoreWallet({});
        // UI unpleasantly blinks on local network node
        await delay(300);
      } catch (e) {
        notificationApi.error(e.message, { duration: Infinity, position: 'bottom-center' });
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);
  const wallet = useSelector(selectCurrentWallet);

  if (isLoading) {
    return <CircularLoader inline={false} />;
  }
  return (
    <div className="page home-page">
      <PageHeader title="Ωmega ωallet" />
      <div className="section">
        <h2 className="section-title"> Wallet Address:</h2>
        <div className="text-clipping">{wallet.address}</div>
      </div>
      <div className="section">
        <h2 className="section-title"> Balance:</h2>
        <h3 className="section-subtitle">{wallet.balance} ETH</h3>
      </div>
    </div>
  );
};
