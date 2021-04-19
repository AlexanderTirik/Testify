import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITest } from '../../../../common/models/test/ITest';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import TestBlock from '../../components/TestBlock';
import { createTestRoutine, fetchTestsRoutine } from '../../routines';
import { ReactComponent as Plus } from '../../../../assets/images/plus.svg';
import styles from './styles.module.sass';
import LanguageBar from '../../../../containers/LanguageBar';
import CreateTestModal from '../../components/CreateTestModal';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';

interface IProps {
  tests: ITest[];
  fetchTests: IBindingAction;
  isLoading: boolean;
  createTest: IBindingCallback<ITest>;
}

const Dashboard: FunctionComponent<IProps> = ({ fetchTests, createTest, tests, isLoading }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    fetchTests();
  }, []);

  const submitCreateTestModal = (test: ITest) => {
    createTest(test);
    setShowCreateModal(false);
  };

  return (
    <LoaderWrapper loading={isLoading}>
      <div className="d-flex justify-content-end m-2"><LanguageBar /></div>
      <div
        className={`${styles.createTest} d-flex justify-content-center align-items-center`}
        onClick={() => setShowCreateModal(true)}
        role="presentation"
      >
        <Plus />
      </div>
      <div className="d-flex flex-row align-items-stretch flex-wrap">
        {
          tests.map(t => <TestBlock {...t} />)
        }
      </div>
      <CreateTestModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={submitCreateTestModal}
      />
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ dashboard }: IAppState) => ({
  tests: dashboard.tests,
  isLoading: dashboard.isLoading
});

const mapDispatchToProps = {
  fetchTests: fetchTestsRoutine,
  createTest: createTestRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

