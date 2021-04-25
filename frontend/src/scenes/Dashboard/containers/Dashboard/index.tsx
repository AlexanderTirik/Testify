import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import { IAppState } from '../../../../common/models/store/IAppState';
import { ITest } from '../../../../common/models/test/ITest';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import TestBlock from '../../components/TestBlock';
import { createTestRoutine, deleteTestRoutine, fetchTestsRoutine } from '../../routines';
import { ReactComponent as Plus } from '../../../../assets/images/plus.svg';
import styles from './styles.module.sass';
import LanguageBar from '../../../../containers/LanguageBar';
import CreateTestModal from '../CreateTestModal';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { ICreateTest } from '../../../../common/models/test/ICreateTest';
import { push } from 'connected-react-router';
import { Routes } from '../../../../common/enums/Routes';

interface IProps {
  tests: ITest[];
  fetchTests: IBindingAction;
  isLoading: boolean;
  router: (route: string) => void;
  createTest: IBindingCallback<ICreateTest>;
  deleteTest: IBindingCallback<string>;
}

const Dashboard: FunctionComponent<IProps> = ({ fetchTests, createTest, deleteTest, router, tests, isLoading }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    fetchTests();
  }, []);

  const submitCreateTestModal = (test: ICreateTest) => {
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
          tests.map(t => (
            <TestBlock
              {...t}
              toQuestions={() => router(Routes.Questions.replace(':testId', t.id))}
              onDelete={() => deleteTest(t.id)}
            />
          ))
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
  router: push,
  fetchTests: fetchTestsRoutine,
  createTest: createTestRoutine,
  deleteTest: deleteTestRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

