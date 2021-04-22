import React, { FunctionComponent } from 'react';
import { IBindingAction } from '../../common/models/callback/IBindingAction';
import styles from './styles.module.sass';

interface IProps {
  variant?: 'dark' | 'light';
  size?: 'small' | 'medium' | 'big';
  onTap: IBindingAction;
}

const Button: FunctionComponent<IProps> = ({ variant = 'dark', onTap, children, size = 'medium' }) => (
  <button
    onClick={onTap}
    type="button"
    className={`${variant === 'dark' ? styles.dark : styles.light} ${styles[size]}`}
  >
    {children}
  </button>
);

export default Button;

