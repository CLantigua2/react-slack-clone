export const createLoadingSelector = actions => state => {
  // are any of the actions still in-flight?
  const theResult = actions.reduce((result, action) => {
    return result || (state && state && state.loading && state.loading[action]);
  }, false);
  return theResult;
};

export const createErrorMessageSelector = actions => state => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple calls, we shows the first error
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (state && state && state.errors && state.errors[action]) {
      return state.errors[action];
    }
  }
  return "";
};
