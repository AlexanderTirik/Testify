import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { ICreateQuestion } from '../../../../common/models/question/ICreateQuestion';
import { IQuestion } from '../../../../common/models/question/IQuestion';
import { IAppState } from '../../../../common/models/store/IAppState';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import CreateQuestionModal from '../CreateQuestionModal';
import Option from '../../components/Option';
import { createQuestionRoutine, fetchQuestionsRoutine } from '../../routines';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/Button';
import styles from './styles.module.sass';

interface IProps {
  isLoading: boolean;
  questions: IQuestion[];
  match: {
    params: {
      testId: string;
    };
  };

  fetchQuestions: IBindingCallback<string>;
  createQuestion: IBindingCallback<{ testId: string; question: ICreateQuestion }>;
}

const Questions: FunctionComponent<IProps> = ({ isLoading, questions, match, fetchQuestions, createQuestion }) => {
  const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false);
  useEffect(() => {
    const { testId } = match.params;
    fetchQuestions(testId);
  }, []);

  const submit = (question: ICreateQuestion) => {
    const { testId } = match.params;
    createQuestion({ question, testId });
    setShowCreateQuestionModal(false);
  };
  return (
    <LoaderWrapper loading={isLoading}>
      <div className="m-4">
        <Button onTap={() => setShowCreateQuestionModal(true)} size="big">
          <FormattedMessage
            id="questions.createQuestionButton"
            defaultMessage="Create question"
          />
        </Button>
        <div className="mt-3">
          {
            questions.map((q, i) => (
              <div className={`d-flex flex-column ${styles.question}`}>
                <span className="t-24 font-weight-bold">
                  <FormattedMessage id="question" defaultMessage="Question {number}" values={{ number: i + 1 }} />
                </span>
                <span className="t-20">{q.text}</span>
                <div className="ml-2">
                  {q.answerOptions.map(ao => <Option correct={ao.isCorrect}>{ao.text}</Option>)}
                </div>
              </div>
            ))
          }
        </div>
        <CreateQuestionModal
          show={showCreateQuestionModal}
          onClose={() => setShowCreateQuestionModal(false)}
          onSubmit={submit}
        />
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ questions }: IAppState) => ({
  questions: questions.questions,
  isLoading: questions.isLoading
});

const mapDispatchToProps = {
  fetchQuestions: fetchQuestionsRoutine,
  createQuestion: createQuestionRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);

