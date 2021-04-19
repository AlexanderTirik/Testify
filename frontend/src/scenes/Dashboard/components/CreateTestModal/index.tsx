import React, { FunctionComponent, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { ITest } from '../../../../common/models/test/ITest';
import Button from '../../../../containers/Button';
import dayjs from 'dayjs';
import styles from './styles.module.sass';

interface IProps {
  show: boolean;
  onSubmit: IBindingCallback<ITest>;
  onClose: IBindingAction;
}

const CreateTestModal: FunctionComponent<IProps> = ({ onSubmit, onClose, show }) => {
  const [name, setName] = useState('');
  const [start, setStart] = useState(dayjs(new Date()).format('YYYY-MM-DD HH:mm'));
  const [end, setEnd] = useState(dayjs(new Date()).format('YYYY-MM-DD HH:mm'));

  const isDateCorrect = () => dayjs(start).isBefore(end);

  const submit = () => {
    if (isDateCorrect()) {
      onSubmit({ name, start: dayjs(start).toDate(), end: dayjs(end).toDate() });
    }
  };

  return (
    <Modal onHide={onClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="createTest.header" defaultMessage="Create test" /></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="d-flex flex-column">
          <div className="d-flex flex-column m-2">
            <span className="t-18 mb-1"><FormattedMessage id="test.name" defaultMessage="Name" /></span>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="d-flex flex-column m-2">
            <span className={`t-18 mb-1 ${!isDateCorrect() ? styles.error : ''}`}>
              <FormattedMessage id="test.start" defaultMessage="Start" />
            </span>
            <input type="text" value={start} onChange={e => setStart(e.target.value)} />
          </div>
          <div className="d-flex flex-column m-2">
            <span className={`t-18 mb-1 ${!isDateCorrect() ? styles.error : ''}`}>
              <FormattedMessage id="test.end" defaultMessage="End" />
            </span>
            <input type="text" value={end} onChange={e => setEnd(e.target.value)} />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onTap={onClose} variant="light">
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
        <Button onTap={submit}>
          <FormattedMessage id="save" defaultMessage="Save" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTestModal;
