import React from 'react';
import { AuthForms } from './components/Auth/AuthForms/AuthForms';
import { WelcomeScreen } from './components/Welcome/WelcomeScreen';
import { useAuth } from './hooks/useAuth';
import styles from './App.module.scss';

function App() {
  const { isAuthenticated, user, loading, error, login, register, logout } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {isAuthenticated ? 'Welcome back' : 'Sign in to your account'}
        </h2>
        <p className={styles.subtitle}>
          {isAuthenticated
            ? 'You are logged in'
            : 'Enter your details to access your account'}
        </p>
      </div>

      <div className={styles.content}>
        {isAuthenticated && user ? (
          <WelcomeScreen user={user} onLogout={logout} />
        ) : (
          <AuthForms
            onLogin={login}
            onRegister={register}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default App;