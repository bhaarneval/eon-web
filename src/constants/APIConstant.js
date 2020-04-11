const BASE_URL =
  "http://dev-env-bits-pilani-backend.us-east-1.elasticbeanstalk.com/";
// const DEV_ENV = "dev/";

export const APIService = {
  dev: BASE_URL,
};

export const requestURLS = {
  LOGIN: "authentication/login",
  REGISTER: "authentication/registration",
  GENERATE_CODE: "authentication/generate-code",
  RESET_PASSWORD: "authentication/reset-password",
  CHANGE_PASSWORD: "authentication/change-password",
  GET_EVENT_TYPES: "core/event-type",
  EVENT_OPERATIONS: "core/event/",
  UPLOAD_IMAGE: "core/presigned-url",
  INVITEE_LIST: "core/event/invitee",
};
