import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';

export default function NavBar() {
  return (
    <div className={styles.header}>
      <nav className={styles.navbar}>
        <Link href='/'>Accueil</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/utilisateurs'>Utilisateurs</Link>
      </nav>
    </div>
  )
}
