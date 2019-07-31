const isArray = value =>
  value && typeof value === 'object' && value.constructor === Array;

const checkFetchStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error;

    if (response.error) {
      error = response.error.errors.message;
    } else {
      error = new Error(response.statusText);
    }

    return error;
  }
};

export { isArray, checkFetchStatus };
