const BASE_URL =
  // "http://dev-env-bits-pilani-backend.us-east-1.elasticbeanstalk.com/";
  "http://bitspilanieonbackend-env.eba-iewfgdnb.us-east-1.elasticbeanstalk.com/";
// const DEV_ENV = "dev/";

export const APIService = {
  dev: BASE_URL,
};

export const requestURLS = {
  LOGIN: "authentication/login",
  GET_NOTIFICATIONS_URL: "core/notification/",
  READ_NOTIFICATIONS_URL: "core/notification/",
  REGISTER: "authentication/registration",
  GENERATE_CODE: "authentication/generate-code",
  RESET_PASSWORD: "authentication/reset-password",
  CHANGE_PASSWORD: "authentication/change-password",
  GET_EVENT_TYPES: "core/event-type",
  EVENT_OPERATIONS: "core/event/",
  UPLOAD_IMAGE: "core/presigned-url",
  INVITEE_LIST: "core/invite/",
  NOTIFY_SUBSCRIBER: "core/notify-subscriber/",
  SUBSCRIPTION:"core/subscription/",
  SHARE_FRIEND: "core/share-with-friend/",
  WISHLIST: "core/wishlist/",
  USER_OPERATIONS: "core/user/",
  FEEDBACK_OPERATIONS: "core/feedback-questions/",
};
