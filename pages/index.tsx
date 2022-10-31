import Head from "next/head";
import Link from 'next/link';
import styles from "../styles/Home.module.css";

export default function Home() {
  const sections = [
    {
      slug: "/blog",
      title: "Lisez les articles",
      catchphrase: "Maximiser votre culture web",
      desc: "Chaque auteur tente de vous apporter le plus de valeur possible par article."
    },
    {
      slug: "/utilisateurs",
      title: "Faites un tour vers la liste des membres",
      catchphrase: "Faite-vous des amis",
      desc: "Ajouter, invitez et discutez avec les différents membres."
    },
  ]
  return (
    <>
      <Head>
        <title>Code.io</title>
        <meta name="description" content="Discover new articles about coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <section>
          <h1 className={styles.title}>Bienvenue sur Code.io</h1>
          <p>Le blog communautaire des afficionados de développement web.</p>
        </section>
        <section className={styles["grid-2"]}>
          {
            sections.map(section => (
            <Link href={section.slug} className={styles.card} key={section.slug}>
              <h2>{section.title}</h2>
              <p className={styles.catchphrase}>{section.catchphrase}</p>
              <p>{section.desc}</p>
            </Link>
            ))
          }
        </section>
      </main>
    </>
  );
}
