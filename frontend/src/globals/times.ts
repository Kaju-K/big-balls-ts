export const ONE_SECOND = 1000;
export const ONE_MINUTE = 1000 * 60;
export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export const accessTokenExpiration = new Date(Date.now() + ONE_MINUTE);
export const refreshTokenExpiration = new Date(Date.now() + ONE_DAY * 15);
