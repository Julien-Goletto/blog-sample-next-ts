import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import styles from "../../styles/Home.module.css";

export interface Article {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface BlogProps {
  articles: Article[];
}

const blog: NextPage<BlogProps> = ({ articles }) => {

  if(articles.length === 0) return (
    <main className={styles.container}>
      <p>Chargement des données...</p>
    </main>
  );

  return (
    <>
      <Head>
        <title>Code.io - Blog</title>
        <meta name="description" content="Discover new articles about coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <section>
          <h1 className={styles.title}>Bienvenue sur le Blog.</h1>
          <p>Voici les articles</p>
        </section>
        <section className={styles["grid-3"]}>
          {
            articles.map(article => (
              <Link href={`/blog/${article.id}`} className={styles.card} key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.body.slice(0, 30) + '...'}</p>
            </Link>
            ))
          }
        </section>
      </main>
    </>
  );
}

export default blog;

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const articles = await data.json();

  return {
    props: {
      articles
    }
  }
};
