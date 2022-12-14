import React from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head'; 
import { Utilisateur } from './index';
import { ParsedUrlQuery } from 'querystring';
import styles from '../../styles/Home.module.css';

interface UtilisateurProps {
  userToRender: Utilisateur;
};

const Contact: NextPage<UtilisateurProps> = ({ userToRender }) => {

  if(!userToRender) return (
    <main className={styles.container}>
      <p>Chargement des données...</p>
    </main>
  )

  const { name, username, email, website, phone} = userToRender;

  return (
    <>
      <Head>
        <title>{'Code.io - ' + username}</title>
        <meta name="description" content="Discover new articles about coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <section className={styles.card}>
          <h2>{name}</h2>
          <p>Username : {username}</p>
          <table>
            <tbody>
              <tr><td>Username: {username}</td></tr>
              <tr><td>Email: {email}</td></tr>
              <tr><td>Site Web: {website}</td></tr>
              <tr><td>Téléphone: {phone}</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}

export default Contact;

interface Params extends ParsedUrlQuery{
  contact: string;
}

export const getStaticPaths : GetStaticPaths<Params> = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();
  const paths = users.map(
    (user: Utilisateur) => ({
      params: { contact: user.username}
    })
  )

  return {
    paths,
    fallback: false,
  }
};

export const getStaticProps: GetStaticProps<UtilisateurProps, Params> = async (context) => {
  const { contact: username } = context.params!;

  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();

  const userToRender = users.find( (user: Utilisateur) => user.username === username);

  if (!userToRender) return { notFound: true }

  return {
    props: {
      userToRender,
    }
  }
}


