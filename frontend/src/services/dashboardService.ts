import api from '../common/helpers/apiHelper';
import { ITest } from '../common/models/test/ITest';

export const fetchTests = async () => (
  api.get('/api/test/user')
);

export const createTest = async (test: ITest) => (
  api.post('/api/test', { ...test })
);

export const deleteTest = async (id: string) => (
  api.delete(`/api/test/${id}`)
);
