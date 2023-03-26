'use client';

import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import NextApp from 'next/app';

export const UrqlProvider = ({ children }: { children: NextPage<any, any> | typeof NextApp }) =>
  withUrqlClient(() => ({ url: 'http://localhost:8080/graphql' }))(children);

const
  withUrqlClient(() => ({ url: 'http://localhost:8080/graphql' }))(children);
