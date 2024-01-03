import { useSelector } from 'react-redux';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { selectWalletPhrase } from '@root/src/dApp/wallet/selectors';
import { PhraseContainer } from './components/PhraseContainer';
import { useNavigate } from 'react-router';
import { r } from '../../routes/routePaths';

export const CreateWalletPage = () => {
  const phrase = useSelector(selectWalletPhrase);
  const navigate = useNavigate();
  return (
    <div className="page create-wallet-page">
      <PageHeader title="Onboarding | New Wallet " />
      <div className="section">
        <h1 className="section-title">Your wallet created</h1>
        <p className="text-smd mt-2 text-weight-md">
          Below you can find your wallet mnemonic phrase. Please store it in safe place.
        </p>
        <p className="text-smd text-color-warning text-weight-md">
          If you will lose mnemonic phrase you won't be able to restore access tp your wallet.
        </p>
        <PhraseContainer phrase={phrase} />
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            navigate(r['/home']);
          }}>
          Finish Onboarding
        </button>
      </div>
    </div>
  );
};
