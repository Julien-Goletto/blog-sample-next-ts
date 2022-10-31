import React from 'react';
import Header from '../Header';

import styles from '../../styles/Home.module.css';

export default function Container(props: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
