import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import dayjs from '../../../../common/config/dayjs';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import Button from '../../../../components/Button';
import styles from './styles.module.sass';

interface IProps {
  name: string;
  start: Date;
  end: Date;
  toQuestions: IBindingAction;
  onDelete: IBindingAction;
  onResults: IBindingAction;
  onTestLink: IBindingAction;
}

const TestBlock: FunctionComponent<IProps> = ({ name, start, end, toQuestions, onDelete, onResults, onTestLink }) => (
  <div className={`${styles.testBlock} d-flex flex-column`}>
    <span className={`${styles.name} t-20`}>{name}</span>
    <div className={`${styles.dates} d-flex flex-column justify-content-center`}>
      <span>
        <span className="font-weight-bold"><FormattedMessage id="test.start" defaultMessage="Start" /></span>
        :
        {' '}
        {dayjs(start).format('HH:mm DD-MM-YYYY')}
      </span>
      <span>
        <span className="font-weight-bold"><FormattedMessage id="test.end" defaultMessage="End" /></span>
        :
        {' '}
        {dayjs(end).format('HH:mm DD-MM-YYYY')}
      </span>
    </div>
    <div className="p-2 d-flex">
      <Button onTap={toQuestions}>
        <FormattedMessage id="questions" defaultMessage="Questions" />
      </Button>
      <div className="ml-1">
        <Button onTap={onTestLink}>
          <FormattedMessage id="test.link" defaultMessage="Test link" />
        </Button>
      </div>
      <div className="ml-1">
        <Button onTap={onResults}>
          <FormattedMessage id="results" defaultMessage="Results" />
        </Button>
      </div>
      <div className="ml-1">
        <Button onTap={onDelete}>
          <FormattedMessage id="delete" defaultMessage="Delete" />
        </Button>
      </div>
    </div>
  </div>
);

export default TestBlock;

