import { setLocalizationRoutine, getTranslationRoutine } from '../containers/Localization/routines';
import { Routine } from 'redux-saga-routines';
import { Localization } from '../common/enums/Localization';

export type LocalizationState = {
  loc: Localization;
  translations: Record<string, string> | null;
}

const initialState = {
  loc: Localization.en,
  translations: null
};

const localization = (state: LocalizationState = initialState, action: Routine<any>): LocalizationState => {
  switch (action.type) {
    case setLocalizationRoutine.TRIGGER:
    case getTranslationRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case getTranslationRoutine.FAILURE:
      return {
        ...state,
        translations: {}
      };
    default:
      return state;
  }
};

export default localization;
