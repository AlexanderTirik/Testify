const users = [{
  id: '1',
  name: 'Sasha'
}, {
  id: '2',
  name: 'David'
}];

export const getUsers = () => Promise.resolve(users);

export const getUserById = (id: string) => Promise.resolve(users.find(u => u.id === id));
