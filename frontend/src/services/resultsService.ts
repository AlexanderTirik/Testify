import api from '../common/helpers/apiHelper';

export const fetchResults = async (id: string) => (
  api.get(`/api/test/${id}/results`)
);
