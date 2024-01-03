import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PasswordInput } from '../../components/form/PasswordInput';
import { initWalletRequestAction, restoreWalletRequestAction, setPasswordAction } from '@root/src/dApp/wallet/actions';
import { useSearchParams } from 'react-router-dom';
import { makePasswordValidator } from '@root/src/shared/utils';
import { r } from '../../routes/routePaths';
import { useAction } from '@root/src/shared/redux/hooks/useAction';
import { CircularLoader } from '../../components/Loader/CircularLoader';

export const EnterPasswordPage = () => {
  const restoreWallet = useAction(restoreWalletRequestAction);
  const sendPasswordToBg = useAction(setPasswordAction);
  const initWallet = useAction(initWalletRequestAction<void>);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isPopup = Boolean(params.get('__bg'));
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const passwordValidator = makePasswordValidator('Password cannot be empty');

  const isValidPassword = useCallback(
    (password: string) => {
      const validationError = passwordValidator(password);
      if (validationError) {
        setError(validationError);
        return false;
      }
      return true;
    },
    [passwordValidator, setPassword],
  );

  const submitPassword = async () => {
    try {
      setIsloading(true);
      if (!isValidPassword(password)) {
        return;
      }
      await sendPasswordToBg({
        password,
      });
      await initWallet();
      await restoreWallet({ password });

      if (isPopup) {
        window.close();
      } else {
        navigate(r['/home']);
      }
    } catch (e) {
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="page home-page">
      <PageHeader title="Ωmega ωallet"></PageHeader>
      {isLoading ? <CircularLoader inline={false} /> : null}
      <div className="section">
        <h2 className="section-title">Enter password</h2>
        <PasswordInput
          onInput={e => {
            isValidPassword(e.currentTarget.value);
            setPassword(e.currentTarget.value);
          }}
          error={error}
          label=""
        />
      </div>
      <div className="section">
        <button onClick={submitPassword} className="btn btn-primary w-full">
          Submit
        </button>
      </div>
    </div>
  );
};
