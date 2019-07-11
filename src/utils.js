const isArray = value =>
  value && typeof value === 'object' && value.constructor === Array;

export { isArray };
