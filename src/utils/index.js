import store from "store2";

export const hasToken = () => {
  return store.session.has("token") ? true : false;
};

export const validation = (pattern, value) => {
  let isValid = null;
  if (Array.isArray(pattern)) {
    isValid = pattern.some((pt) => {
      if (pt.test(value)) {
        return true;
      }
      return false;
    });
  } else {
    isValid = pattern.test(value);
  }
  return isValid;
};

export const getValidatedField = (pattern, field) => {
  const value = field.value !== null ? field.value : "";
  let isValid = false;
  if (Array.isArray(pattern)) {
    isValid = pattern.some((pt) => {
      if (pt.test(value)) {
        return true;
      }
      return false;
    });
  } else {
    isValid = pattern.test(value);
  }

  return {
    ...field,
    isValid: isValid,
  };
};
