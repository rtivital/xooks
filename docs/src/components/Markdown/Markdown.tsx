import React from 'react';
import cx from 'clsx';
import MD from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/pojoaque';
import classes from './Markdown.styles.less';

interface MarkdownProps {
  className?: string;
  children: string;
}

const renderers = {
  code: ({ language, value }: { language: string; value: string }) => (
    <SyntaxHighlighter style={theme} language={language}>
      {value}
    </SyntaxHighlighter>
  ),
};

export default function Markdown({ className, children }: MarkdownProps) {
  return (
    <MD
      className={cx(classes.markdown, className)}
      allowDangerousHtml
      renderers={renderers}
      plugins={[gfm]}
    >
      {children}
    </MD>
  );
}

Markdown.displayName = '@ioa/docs/Markdown';
