/**
 * BASED ON
 * SOURCE: https://upmostly.com/tutorials/form-validation-using-custom-react-hooks
 * */

import { useState, useEffect } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState({ ...initialValues });
  const [isAllValid, setIsAllValid] = useState(false);

  useEffect(() => {
    setIsAllValid(validate(values));
  }, [validate, values]);

  const handleChange = (event) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    values,
    isAllValid,
  };
};

export default useForm;
