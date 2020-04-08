const BASE_URL =
  "http://dev-env-bits-pilani-backend.us-east-1.elasticbeanstalk.com/";
// const DEV_ENV = "dev/";

export const APIService = {
  dev: BASE_URL,
};

export const requestURLS = {
  LOGIN: "authentication/login",
  REGISTER: "authentication/register",
  GENERATE_CODE: "authentication/generate-code",
  RESET_PASSWORD: "authentication/reset-password",
};
