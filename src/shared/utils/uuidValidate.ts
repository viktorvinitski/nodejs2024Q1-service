import { validate } from 'uuid';

export const uuidValidate = (uuid: string) => {
  if (!validate(uuid)) {
    throw new Error('400');
  }
};
