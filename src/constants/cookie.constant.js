export const CONST_COOKIE_EXPIRATION_DATE = new Date(
  new Date().getTime() + 1000 * 60 * 60 * 24 * 30
); // 30 days

export const CONST_COOKIE_EXPIRATION_DATE_ACCESS_PATHS = new Date(
  new Date().getTime() + 86400000
); // Maximo establecido por la variable de entorno
