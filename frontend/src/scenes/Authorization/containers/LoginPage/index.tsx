import React, { FunctionComponent } from 'react';
import { env } from '../../../../env';

const LoginPage: FunctionComponent = () => (
  <>
    <a href={`${env.urls.server}/api/auth/login`}>Login</a>
  </>
);

export default LoginPage;
