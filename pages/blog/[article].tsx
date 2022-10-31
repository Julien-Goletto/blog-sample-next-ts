import React from "react";
import Head from 'next/head';
import { Article } from "./index";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { ParsedUrlQuery } from "querystring";

interface ArticleProps {
  articleToRender: Article;
}

const Article: NextPage<ArticleProps> = ({ articleToRender }) => {
  if (!articleToRender)
    return (
      <main className={styles.container}>
        <p>Chargement des données...</p>
      </main>
    );

  const { title, body } = articleToRender;

  return (
    <>
      <Head>
        <title>{'Code.io - ' + title}</title>
        <meta name="description" content="Discover new articles about coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p>{body}</p>
      </main>
    </>
  );
};

export default Article;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const articles = await data.json();

  // Using ISR on the 25 first articles, the 75 others need a fetch first to hydrate the article component
  const paths = articles
    .map((article: Article) => ({
      params: { article: "" + article.id },
    }))
    .slice(0, 25);

  return {
    paths,
    fallback: true,
  };
};

interface Params extends ParsedUrlQuery {
  article: string;
}

export const getStaticProps: GetStaticProps<ArticleProps, Params> = async (
  context
) => {
  const { article: articleId } = context.params!;

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${articleId}`
  );
  const articleToRender = await data.json();

  if (Object.keys(articleToRender).length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      articleToRender,
      revalidate: 60,
    },
  };
};
