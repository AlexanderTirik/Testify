import React, { FunctionComponent } from 'react';
import { IBindingAction } from '../../../../common/models/callback/IBindingAction';
import styles from './styles.module.sass';

interface IProps {
  onChange: IBindingAction;
  checked: boolean;
  type: 'checkbox' | 'radio';
}

const TestOption: FunctionComponent<IProps> = ({ children, onChange, ...rest }) => (
  <div className="pointer d-flex align-items-center t-24" onClick={onChange} role="presentation">
    <input
      {...rest}
      className={`${styles.checkbox} mr-2`}
    />
    {children}
  </div>
);

export default TestOption;

