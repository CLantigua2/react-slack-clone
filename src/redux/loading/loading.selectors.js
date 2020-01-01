export const createLoadingSelector = actions => state => {
  // are any of the actions still in-flight?
  const theResult = actions.reduce((result, action) => {
    return (
      result ||
      (state && state && state.loadingReducer && state.loadingReducer[action])
    );
  }, false);
  return theResult;
};
