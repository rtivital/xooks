import React from 'react';
import Navbar from '../Navbar/Navbar';
import classes from './AppContainer.styles.less';

export default function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className={classes.appContainer}>
      <Navbar className={classes.navbar} />
      <div className={classes.content}>{children}</div>
    </main>
  );
}
