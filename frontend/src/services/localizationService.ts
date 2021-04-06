import { Localization } from '../common/enums/Localization';

export const getTranslation = async (loc: Localization) => {
  const data = await fetch(`/localization/${loc}.json`);
  return data.json();
};
