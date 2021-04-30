import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { QuestionType } from '../../../../common/enums/QuestionType';
import { IOptionList } from '../../../../common/models/answerOption/IOptionList';
import { IStudentOption } from '../../../../common/models/answerOption/IStudentOption';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import Button from '../../../../components/Button';
import StudentOption from '../StudentOption';
import styles from './styles.module.sass';

interface IProps {
  text: string;
  options: IStudentOption[];
  type: QuestionType;
  onAnswer: IBindingCallback<string[]>;
}

const QuestionsAnswers: FunctionComponent<IProps> = ({ text, options, type, onAnswer }) => {
  const [checkedMap, setCheckedMap] = useState({} as IOptionList);

  const getChosedAnswers = () => Object.keys(checkedMap).filter(k => checkedMap[k]);

  const changeOption = (id: string) => {
    const mapCopy = { ...checkedMap };
    if (type === QuestionType.SingleChoise) {
      Object.keys(mapCopy).forEach(k => { mapCopy[k] = false; });
    }
    if (mapCopy[id] !== undefined) {
      mapCopy[id] = !mapCopy[id];
    } else {
      mapCopy[id] = true;
    }
    setCheckedMap(mapCopy);
  };

  const onNext = () => {
    const answers = getChosedAnswers();
    if (answers.length > 0) {
      onAnswer(answers);
    }
  };

  return (
    <div>
      <span className="t-30">{text}</span>
      <div className="d-flex flex-column mt-3 mb-3">
        {
          options.map(o => (
            <StudentOption
              onChange={() => changeOption(o.id)}
              checked={checkedMap[o.id] || false}
              type={type === QuestionType.SingleChoise ? 'radio' : 'checkbox'}
            >
              {o.text}
            </StudentOption>
          ))
        }
      </div>
      <Button
        size="big"
        onTap={() => onNext()}
      >
        <FormattedMessage id="next" defaultMessage="Next" />
      </Button>
    </div>
  );
};

export default QuestionsAnswers;

