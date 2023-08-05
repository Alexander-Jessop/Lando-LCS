export const validateDOB = (dob) => {
  const today = new Date();
  const dobDate = dob.toDate();

  return dobDate > today;
};

export const validateCity = (cityOptions, country, city) => {
  return !cityOptions[country]?.find((c) => c.value === city);
};
