import api from '../common/helpers/apiHelper';

export const fetchTests = async () => (
  api.get('/api/test/user')
);
