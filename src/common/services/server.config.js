export const SERVER = (function () {
  return {
    USER_BY_EMAIL: (email) => `/api/information?email=${email}`,
    LOAN: "/api/loan",
    PAYMENTS: "/api/payments",
  };
})();
