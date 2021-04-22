import { ITest } from '../models/test/ITest';
import dayjs from 'dayjs';

export const localizeTestTime = (test: ITest) => ({
  ...test
});
