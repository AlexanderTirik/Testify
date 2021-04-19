import React, { FunctionComponent } from 'react';
import { IBindingAction } from '../../common/models/callback/IBindingAction';
import styles from './styles.module.sass';

interface IProps {
  variant?: 'dark' | 'light';
  onTap: IBindingAction;
}

const Button: FunctionComponent<IProps> = ({ variant = 'dark', onTap, children }) => (
  <button onClick={onTap} type="button" className={variant === 'dark' ? styles.dark : styles.light}>
    {children}
  </button>
);

export default Button;

