import React, { FunctionComponent, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { QuestionType } from '../../../../common/enums/QuestionType';
import { IAnswerOption } from '../../../../common/models/answerOption/IAnswerOption';
import { ICreateAnswerOption } from '../../../../common/models/answerOption/ICreateAnswerOption';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { ICreateQuestion } from '../../../../common/models/question/ICreateQuestion';
import { IQuestion } from '../../../../common/models/question/IQuestion';
import Option from '../../components/Option';
import Button from '../../../../components/Button';
import styles from './styles.module.sass';

interface IProps {
  show: boolean;
  onSubmit: IBindingCallback<ICreateQuestion>;
  onClose: IBindingAction;
}

const CreateQuestionModal: FunctionComponent<IProps> = ({ onSubmit, onClose, show }) => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState([] as ICreateAnswerOption[]);
  const [creatingOption, setCreatingOption] = useState(false);
  const [creatingOptionForm, setCreatingOptionForm] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const countCorrect = () => options.filter(o => o.isCorrect).length;

  const addOption = () => {
    setOptions([...options, { text: creatingOptionForm, isCorrect }]);
    setCreatingOption(false);
    setCreatingOptionForm('');
    setIsCorrect(false);
  };

  const closeModal = () => {
    setText('');
    setOptions([]);
    setCreatingOption(false);
    setCreatingOptionForm('');
    onClose();
  }

  const onSave = () => {
    if (countCorrect() > 0 && text.length) {
      const questionType = countCorrect() === 1 ? QuestionType.SingleChoise : QuestionType.MultiChoise;
      onSubmit({ text, questionType, answerOptions: options });
    }
  };

  return (
    <Modal onHide={closeModal} show={show}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="createQuestion.header" defaultMessage="Create question" /></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="d-flex flex-column">
          <div className="d-flex flex-column mb-2">
            <span className="t-18 mb-1"><FormattedMessage id="question.text" defaultMessage="Text" /></span>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
          </div>
          <div className="mb-3">
            {
              options.map(o => <Option correct={o.isCorrect}>{o.text}</Option>)
            }
          </div>
          {creatingOption ? (
            <div className={`d-flex flex-column m-2 mt-3 ${styles.addOptionForm}`}>
              <span className="t-18 mb-1">
                <FormattedMessage
                  id="question.option"
                  defaultMessage="Option {number}"
                  values={{ number: options.length + 1 }}
                />
              </span>
              <input type="text" value={creatingOptionForm} onChange={e => setCreatingOptionForm(e.target.value)} />
              <div className={`${styles.isCorrect} d-flex flex-row align-items-center`}>
                <span>
                  <FormattedMessage id="option.correct" defaultMessage="Is correct?" />
                </span>
                <input
                  type="checkbox"
                  checked={isCorrect}
                  onChange={() => setIsCorrect(!isCorrect)}
                />
              </div>
              <div className={`d-flex justify-content-end ${styles.optionButtons}`}>
                <Button size="small" variant="light" onTap={() => setCreatingOption(false)}>
                  <FormattedMessage id="cancel" defaultMessage="Cancel" />
                </Button>
                <Button size="small" onTap={addOption}>
                  <FormattedMessage id="add" defaultMessage="Add" />
                </Button>
              </div>
            </div>
          ) : null}
          {
            !creatingOption ? (
              <Button size="small" variant="light" onTap={() => setCreatingOption(true)}>
                <FormattedMessage id="question.addOption" defaultMessage="Add option" />
              </Button>
            ) : null
          }
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onTap={closeModal} variant="light">
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
        <Button onTap={onSave}>
          <FormattedMessage id="save" defaultMessage="Save" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateQuestionModal;
