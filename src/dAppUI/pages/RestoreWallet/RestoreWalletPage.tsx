import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useNavigate } from 'react-router';
import { r } from '../../routes/routePaths';
import { useState, useCallback, FormEvent } from 'react';

import { When } from 'react-if';

export const RestoreWalletPage = () => {
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const validatePhrase = useCallback(
    (phrase: string) => {
      // has at least 12 words
      const looksLikePhrase = phrase.split(/(\s+)/).length >= 12;
      console.log(phrase.trim().split(/(\s+)/), phrase.split(/(\s+)/).length);
      if (!looksLikePhrase) {
        setError('phrase must be at least 12 words length');
      }
      return looksLikePhrase;
    },
    [setError],
  );
  return (
    <div className="page create-wallet-page">
      <PageHeader title="Onboarding | Restore Wallet" />
      <div className="section">
        <h1 className="section-title">Enter mnemonic phrase</h1>
        <div className="text-smd mt-2">
          Type your seed phrase in the field below to recover your wallet (it should include 12 words seperated with
          spaces)
        </div>
        <div className="flex-center mt-2 mb-2">
          <textarea
            rows={8}
            cols={32}
            onInput={(e: FormEvent<HTMLTextAreaElement>) => {
              setPhrase(e.currentTarget.value);
              validatePhrase(e.currentTarget.value);
            }}
            value={phrase}
          />
        </div>
        <button
          disabled={!phrase.length}
          className="btn btn-primary w-full"
          onClick={() => {
            navigate(r['/restore-wallet/create-password'], {
              state: {
                phrase,
              },
            });
          }}>
          Next
        </button>
        <When condition={!!error}>
          <div className="text-color-warning text-smd">{error}</div>
        </When>
      </div>
    </div>
  );
};
