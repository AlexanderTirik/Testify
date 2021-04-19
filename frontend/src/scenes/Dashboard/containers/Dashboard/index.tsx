import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITest } from '../../../../common/models/test/ITest';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import TestBlock from '../../components/TestBlock';
import { fetchTestsRoutine } from '../../routines';
import { ReactComponent as Plus } from '../../../../assets/images/plus.svg';
import styles from './styles.module.sass';
import LanguageBar from '../../../../containers/LanguageBar';

interface IProps {
  tests: ITest[];
  fetchTests: IBindingAction;
  isLoading: boolean;
}

const Dashboard: FunctionComponent<IProps> = ({ fetchTests, tests, isLoading }) => {
  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <LoaderWrapper loading={isLoading}>
      <div className="d-flex justify-content-end m-2"><LanguageBar /></div>
      <div className={`${styles.createTest} d-flex justify-content-center align-items-center`}>
        <Plus />
      </div>
      <div className="d-flex flex-row align-items-stretch flex-wrap">
        {
          tests.map(t => <TestBlock {...t} />)
        }
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ dashboard }: IAppState) => ({
  tests: dashboard.tests,
  isLoading: dashboard.isLoading
});

const mapDispatchToProps = {
  fetchTests: fetchTestsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

