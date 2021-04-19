import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import dayjs from '../../../../common/config/dayjs';
import styles from './styles.module.sass';

interface IProps {
  name: string;
  start: Date;
  end: Date;
}

const TestBlock: FunctionComponent<IProps> = ({ name, start, end }) => (
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
  </div>
);

export default TestBlock;

