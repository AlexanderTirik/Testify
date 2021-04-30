import { push } from 'connected-react-router';
import { stringifyUrl } from 'query-string';
import React, { FunctionComponent, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Routes } from '../../../../common/enums/Routes';
import { isTestAvailable } from '../../../../common/helpers/timeHelper';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITest } from '../../../../common/models/test/ITest';
import Button from '../../../../components/Button';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import LanguageBar from '../../../../containers/LanguageBar';
import { fetchTestRoutine } from '../../routines';

const getTestQuestionsPage = (testId: string) => Routes.QuestionTest.replace(':testId', testId);
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

const IntroTest: FunctionComponent<IProps> = ({ test, isLoading, match, isAuthorized, router, fetchTest }) => {
  useEffect(() => {
    const { params } = match;
    const { testId } = params;
    if (!isAuthorized) {
      router(stringifyUrl({ url: Routes.LoginPage, query: { testId } }));
    } else {
      fetchTest(testId);
    }
  }, []);

  return (
    <LoaderWrapper loading={isLoading}>
      {
    isTestAvailable({ ...test }) ? (
      <div className="d-flex flex-column align-items-center mt-5">
        <span className="t-36 mb-3">{test?.name}</span>
        <div className="mb-3">
          <Button variant="light" size="big" onTap={() => router(getTestQuestionsPage(match.params.testId))}>
            <FormattedMessage id="test.startTest" defaultMessage="Start test" />
          </Button>
        </div>
        <LanguageBar />
      </div>
    ) : (
      <FormattedMessage id="test.unavailable" defaultMessage="Test has not started yet" />
    )
  }
    </LoaderWrapper>
  );
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
)(IntroTest);

