const isArray = value =>
  value && typeof value === 'object' && value.constructor === Array;

const checkFetchStatus = response => {
  if (!response.ok) {
    throw response.status;
  }
  return response.json();
};

export { isArray, checkFetchStatus };
