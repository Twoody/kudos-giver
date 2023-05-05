export interface IUser {
  email: string,
  password: string,
  storagePath: string,
}

/*
 * @return {string} Get a random email
 */
export function getRandomEmail():string {
  // Just get something random; 1 in 2.1 billion uniqueness
  const random = (Math.random() + 1).toString(36).substring(5);
  return `test-user-${random}@gmail.com`;
}

/**
 * A completed fabricated user that should never exist
 */
export const fakeUser: IUser = {
  email: 'foo@bar.com',
  password: '123Baz',
  storagePath: '.playwright/users/noState.json',
};

/**
 * Your strava user
 */
export const stravaUser: IUser = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
  storagePath: '.playwright/users/state.json',
};
