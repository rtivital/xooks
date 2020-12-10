import React from 'react';
import Markdown from '../../components/Markdown/Markdown';
import docs from './GettingStarted.md';

export default function GettingStartedRoute() {
  return <Markdown>{docs}</Markdown>;
}
