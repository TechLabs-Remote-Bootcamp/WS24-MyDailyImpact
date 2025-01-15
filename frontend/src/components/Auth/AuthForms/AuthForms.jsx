import React, { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import styles from './AuthForms.module.scss';

export function AuthForms({ onLogin, onRegister, loading, error }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.container}>
      {showLogin ? (
        <LoginForm
          onSubmit={onLogin}
          loading={loading}
          error={error}
          onShowRegister={() => setShowLogin(false)}
        />
      ) : (
        <RegisterForm
          onSubmit={onRegister}
          loading={loading}
          error={error}
          onShowLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
}