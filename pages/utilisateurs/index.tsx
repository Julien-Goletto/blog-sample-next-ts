import React from "react";
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from "../../styles/Home.module.css";

export interface Utilisateur{
  name: string;
  username: string;
  email: string;
  website: string;
  phone: string;
};

interface UtilisateursProps{
  users : Utilisateur[];
};

const utilisateurs: NextPage<UtilisateursProps> = ({ users }) => {
  if(users.length === 0) return(
    <main className={styles.container}>
      <p>Chargement des données...</p>
    </main>
  );

  return (
    <>
      <Head>
        <title>Code.io - Utilisateurs</title>
        <meta name="description" content="Discover new articles about coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>La liste des utilisateurs :</h1>
        <section className={styles["grid-1"]}>
          {
            users.map(user => (
              <Link href={`utilisateurs/${user.username}`} className={`${styles.card} ${styles["card-small"]}`} key={user.username}>
                <p>{user.username}</p>
              </Link>
            ))
          }
        </section>
      </main>
    </>
  );
}

export default utilisateurs;

export const getStaticProps = async() => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();

  return {
    props: {
      users,
    }
  }
}
