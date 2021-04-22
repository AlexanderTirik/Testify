import React, { FunctionComponent } from 'react';
import { ReactComponent as Check } from '../../../../assets/images/check.svg';
import { ReactComponent as Cross } from '../../../../assets/images/close.svg';
import styles from './styles.module.sass';

interface IProps {
  correct?: boolean;
}

const Option: FunctionComponent<IProps> = ({ correct = false, children }) => (
  <span className={`d-flex flex-row ${styles.option} align-items-center`}>
    {correct ? <Check /> : <Cross />}
    {children}
  </span>
);

export default Option;

