import * as React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { IAppState } from '../../common/models/store/IAppState';
import { getTranslationRoutine } from './routines';
import { Localization as Loc } from '../../common/enums/Localization';
import { IBindingCallback } from '../../common/models/callback/IBindingCallback';
import { FunctionComponent, useEffect } from 'react';

interface IProps {
  loc: Loc;
  children: any;
  translations: Record<string, string> | null;
  getTranslation: IBindingCallback<{ localization: Loc }>;
}

const Localization: FunctionComponent<IProps> = ({ loc, children, translations, getTranslation }) => {
  useEffect(() => {
    if (!translations) {
      getTranslation({ localization: loc });
    }
  });

  return (
    <IntlProvider locale={loc} messages={translations as Record<string, string>}>
      { children }
    </IntlProvider>
  );
};

const mapStateToProps = ({ localization }: IAppState) => ({
  loc: localization.loc,
  translations: localization.translations
});

const mapDispatchToProps = {
  getTranslation: getTranslationRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localization);
