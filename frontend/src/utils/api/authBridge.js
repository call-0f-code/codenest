let setTokenFn = null;
let logoutFn = null;
let getTokenFn = null;

export const AuthBridge = {
  register({
    setToken,
    logout,
    getToken,
  }) {
    setTokenFn = setToken;
    logoutFn = logout;
    getTokenFn = getToken;
  },

  setToken(token) {
    setTokenFn?.(token);
  },

  logout() {
    logoutFn?.();
  },

  getToken() {
    return getTokenFn ? getTokenFn() : null;
  },
};
