import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageBar from '../../../../containers/LanguageBar';
import { env } from '../../../../env';
import styles from './styles.module.sass';

const LoginPage: FunctionComponent = () => (
  <div className="d-flex flex-column justify-content-center align-items-center">
    <div className={`${styles.loginPageBlock} d-flex align-items-center justify-content-center`}>
      <a href={`${env.urls.server}/api/auth/login`} className={`${styles.signInLink} t-36`}>
        <FormattedMessage id="loginPage.signIn" defaultMessage="Sign in" />
      </a>
    </div>
    <LanguageBar />
  </div>
);

export default LoginPage;
