import { useNavigate } from 'react-router';
import { CircularLoader } from '../../components/Loader/CircularLoader';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useState } from 'react';
import { r } from '../../routes/routePaths';

export const OnboardingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <PageHeader title="Onboarding" />
      <div className="section">
        <h2 className="section-title"> Welcome to Omega Wallet</h2>
        <h3 className="section-subtitle">Please choose option to proceed</h3>
        <div className="section">
          <button
            className="btn btn-primary w-full"
            onClick={async () => {
              navigate(r['/create-wallet/create-password']);
            }}>
            Create Wallet
          </button>
        </div>
        <div className="section">
          <button
            className="btn w-full"
            onClick={() => {
              navigate(r['/restore-wallet']);
            }}>
            Sign In With Existing Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
