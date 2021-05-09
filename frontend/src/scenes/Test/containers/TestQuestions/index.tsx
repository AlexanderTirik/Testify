import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { ISendAnswer } from '../../../../common/models/answerOption/ISendAnswer';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { IStudentQuestion } from '../../../../common/models/question/IStudentQuestion';
import { IAppState } from '../../../../common/models/store/IAppState';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import QuestionsAnswers from '../../components/QuestionsAnswers';
import { fetchStudentQuestionsRoutine, sendAnswerRoutine } from '../../routines';

interface IProps {
  match: {
    params: {
      testId: string;
    };
  };
  isLoading: boolean;
  questions: IStudentQuestion[];
  fetchStudentQuestions: IBindingCallback<string>;
  sendAnswer: IBindingCallback<ISendAnswer>;
}

const TestQuestions: FunctionComponent<IProps> = ({
  match,
  isLoading,
  questions,
  fetchStudentQuestions,
  sendAnswer
}) => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  useEffect(() => {
    const { params } = match;
    const { testId } = params;
    fetchStudentQuestions(testId);
  }, []);

  const onAnswer = (answerIds: string[]) => {
    const { params } = match;
    const { testId } = params;
    sendAnswer({ testId, questionId: questions[currentQuestionNumber].id, answerIds });
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  return (
    <LoaderWrapper loading={isLoading}>
      { currentQuestionNumber < questions.length ? (
        <div className="d-flex justify-content-center mt-5">
          {
            questions[currentQuestionNumber] ? (
              <QuestionsAnswers
                type={questions[currentQuestionNumber].questionType}
                options={questions[currentQuestionNumber].answerOptions}
                {...questions[currentQuestionNumber]}
                onAnswer={onAnswer}
              />
            ) : null
          }
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <span className="t-36">
            <FormattedMessage id="test.endTest" defaultMessage="Thanks for taking the test!" />
          </span>
        </div>
      )}
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ test, user }: IAppState) => ({
  questions: test.questions,
  isLoading: test.isLoading,
  isAuthorized: user.isAuthorized
});

const mapDispatchToProps = {
  fetchStudentQuestions: fetchStudentQuestionsRoutine,
  sendAnswer: sendAnswerRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestQuestions);

