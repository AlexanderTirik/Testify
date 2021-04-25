import api from '../common/helpers/apiHelper';

export const fetchTest = async (id: string) => (
  api.get(`/api/test/${id}`)
);
