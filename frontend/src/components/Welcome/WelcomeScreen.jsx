import React from 'react';
import { LogOut, User } from 'lucide-react';
import styles from './WelcomeScreen.module.scss';

export function WelcomeScreen({ user, onLogout }) {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <div className={styles.circle}>
          <User />
        </div>
      </div>
      <h1 className={styles.title}>Welcome back!</h1>
      <p className={styles.email}>{user.name || user.email}</p>
      {user.role && (
        <p className={styles.role}>Role: {user.role}</p>
      )}
      <button
        onClick={onLogout}
        className={styles.logoutButton}
      >
        <LogOut className={styles.icon} />
        Sign out
      </button>
    </div>
  );
}