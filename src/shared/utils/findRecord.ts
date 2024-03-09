import { TDatabase } from '../types';

export const findRecord = (
  database: TDatabase[],
  id: string,
  errorCode?: string,
) => {
  const record = database.find((record) => record.id === id);
  if (!record) {
    throw new Error(errorCode ?? '404');
  }
  return record;
};
