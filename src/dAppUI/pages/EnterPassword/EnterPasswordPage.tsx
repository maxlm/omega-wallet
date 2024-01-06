import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PasswordInput } from '../../components/form/PasswordInput';
import { initWalletRequestAction, setPasswordAction } from '@root/src/dApp/wallet/actions';
import { useSearchParams } from 'react-router-dom';
import { delay, makePasswordValidator } from '@root/src/shared/utils';
import { r } from '../../routes/routePaths';
import { useAction, useActionAsync } from '@root/src/shared/redux/hooks/useAction';
import { CircularLoader } from '../../components/Loader/CircularLoader';

export const EnterPasswordPage = () => {
  const sendPasswordToBg = useActionAsync(setPasswordAction);
  const initWallet = useAction(initWalletRequestAction<void>);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const openedFromBackground = Boolean(params.get('__bg'));
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

      //emulate latency
      await delay(300);

      await sendPasswordToBg({
        password,
      });

      await initWallet();

      if (openedFromBackground) {
        window.close();
      } else {
        navigate(r['/home']);
      }
    } catch (e) {
      setError(e.message);
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
        <button disabled={isLoading} onClick={submitPassword} className="btn btn-primary w-full">
          Submit
        </button>
      </div>
    </div>
  );
};
