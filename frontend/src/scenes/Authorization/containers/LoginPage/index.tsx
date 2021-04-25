import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { IAppState } from '../../../../common/models/store/IAppState';
import LanguageBar from '../../../../containers/LanguageBar';
import { env } from '../../../../env';
import styles from './styles.module.sass';

interface IProps {
  search: string;
}

const LoginPage: FunctionComponent<IProps> = ({ search }) => (
  <div className="d-flex flex-column justify-content-center align-items-center">
    <div className={`${styles.loginPageBlock} d-flex align-items-center justify-content-center`}>
      <a href={`${env.urls.server}/api/auth/login${search}`} className={`${styles.signInLink} t-36`}>
        <FormattedMessage id="loginPage.signIn" defaultMessage="Sign in" />
      </a>
    </div>
    <LanguageBar />
  </div>
);

const mapStateToProps = ({ router }: IAppState) => ({
  search: router.location.search
});

export default connect(mapStateToProps)(LoginPage);
