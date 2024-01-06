import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useActionAsync } from '@root/src/shared/redux/hooks/useAction';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { AppState } from '@root/src/dApp/reducer';
import { selectSenderProviders } from '@root/src/dApp/inpage-interaction/selectors';
import { EIP6963ProviderInfo } from '@root/src/lib/EIP6963';
import { clearProviderSelection, providerSelectedAction } from '@root/src/dApp/inpage-interaction/actions';

export const ChooseProviderpage = () => {
  const [params] = useSearchParams();
  const senderId = parseInt(params.get('senderId'));
  const messageId = params.get('messageId');
  const selectedProviders = useSelector((state: AppState) => {
    return selectSenderProviders(state, senderId);
  });
  const [providers, setProviders] = useState<EIP6963ProviderInfo[]>([]);
  const clearProvidersInStore = useActionAsync(clearProviderSelection);
  const selectProvider = useActionAsync(providerSelectedAction);

  useEffect(() => {
    if (selectedProviders && selectedProviders.length && !providers.length) {
      setProviders(selectedProviders);

      clearProvidersInStore({
        senderId,
      });
    }
  }, [selectedProviders, setProviders]);

  return (
    <div className="page choose-provider-page">
      <PageHeader title="Ωmega ωallet"></PageHeader>
      <div className="section">
        <h2 className="section-title"> Choose wallet to use:</h2>
      </div>
      <div className="section">
        <div className="btn-list">
          {providers.map(provider => {
            return (
              <button
                onClick={async () => {
                  await selectProvider({
                    messageId,
                    senderId,
                    data: {
                      providerId: provider.uuid,
                    },
                  });
                  window.close();
                }}
                className="btn w-full">
                <div className="provider-icon-container">
                  <img className="provider-icon" src={provider.icon} />
                </div>

                <span>{provider.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
