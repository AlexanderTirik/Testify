import { push } from 'connected-react-router';
import { stringifyUrl } from 'query-string';
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes } from '../../../../common/enums/Routes';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITest } from '../../../../common/models/test/ITest';
import { fetchTestRoutine } from '../../routines';

interface IProps {
  test?: ITest;
  isLoading: boolean;
  isAuthorized: boolean;
  match: {
    params: {
      testId: string;
    };
  };
  router: (route: string) => void;
  fetchTest: IBindingCallback<string>;
}

const Test: FunctionComponent<IProps> = ({ test, isLoading, match, isAuthorized, router, fetchTest }) => {
  useEffect(() => {
    console.log(match);
    const { params } = match;
    const { testId } = params;
    if (!isAuthorized) {
      router(stringifyUrl({ url: Routes.LoginPage, query: { testId } }));
    } else {
      fetchTest(testId);
    }
  }, []);

  return <>chel</>;
};

const mapStateToProps = ({ test, user }: IAppState) => ({
  test: test.test,
  isLoading: test.isLoading,
  isAuthorized: user.isAuthorized
});

const mapDispatchToProps = {
  router: push,
  fetchTest: fetchTestRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

