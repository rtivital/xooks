import React from 'react';
import cx from 'clsx';
import classes from './Navbar.styles.less';

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cx(classes.navbar, className)}>
      <header className={classes.header}>
        <h1 className={classes.logo}>Xooks</h1>
        <p className={classes.description}>General purpose React hooks collection</p>
      </header>
      <div className={classes.body}>Body</div>
      <footer className={classes.footer}>Footer</footer>
    </nav>
  );
}
