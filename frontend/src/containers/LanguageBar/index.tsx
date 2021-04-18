import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Localization as Loc } from '../../common/enums/Localization';
import { IBindingAction } from '../../common/models/callback/IBindingAction';
import { IBindingCallback } from '../../common/models/callback/IBindingCallback';
import { setLocalizationRoutine } from '../Localization/routines';
import styles from './styles.module.sass';

interface ILocButtonProps {
  setLoc: IBindingAction;
  locWord: string;
}

const LocButton: FunctionComponent<ILocButtonProps> = ({ locWord, setLoc }) => (
  <button onClick={setLoc} type="button" className={`${styles.locButton}`}>{locWord}</button>
);

interface IProps {
  setLocalization: IBindingCallback<{ localization: Loc }>;
}

const LanguageBar: FunctionComponent<IProps> = ({
  setLocalization
}) => (
  <div className={`${styles.locButtonsBlock}`}>
    <LocButton setLoc={() => setLocalization({ localization: Loc.uk })} locWord="УК" />
    <LocButton setLoc={() => setLocalization({ localization: Loc.ru })} locWord="РУ" />
    <LocButton setLoc={() => setLocalization({ localization: Loc.en })} locWord="EN" />
  </div>
);

const mapDispatchToProps = {
  setLocalization: setLocalizationRoutine
};

export default connect(null, mapDispatchToProps)(LanguageBar);
