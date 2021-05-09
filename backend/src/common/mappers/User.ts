import { User } from '../../data/entities/User';

export const fromUserToIAuthUser = (user: User) => {
  const { id } = user;
  return { id };
};

export const fromUserToIClientUser = (user: User) => {
  const { id, displayName } = user;
  return { id, displayName };
};
