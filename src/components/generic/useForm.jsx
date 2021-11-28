import { useState } from "react";

const useForm = (initialValues, data = [], variant = "add") => {
  const [fields, setFields] = useState(initialValues);
  const [submitBtn, setSubmitBtn] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value: value },
    }));
  };

  const handleSubmit = () => {
    let p = [];
    for (let element in fields) {
      const { error, value } = fields[element];
      p.push(value !== "" && !error);
    }
    setSubmitBtn(!p.reduce((a, b) => a && b));
  };

  const validate = (e) => {
    const { name, value } = e.target;
    let re = fields[name].regularExpression;
    let em = fields[name].errorMessage;
    if (!re.test(String(value))) {
      setFields((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], error: true, message: em },
      }));
      setSubmitBtn(true);
    } else {
      setFields((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], error: false, message: "" },
      }));
      setSubmitBtn(false);
      handleSubmit();
    }
    if (fields[name].unique && data.length > 0 && validate !== "add") {
      if (data.some(({ [name]: a }) => String(a) === String(value))) {
        setFields((prevState) => ({
          ...prevState,
          [name]: {
            ...prevState[name],
            error: true,
            message: "Valor ya existe en la base de datos",
          },
        }));
        setSubmitBtn(false);
        handleSubmit();
      }
    }
  };

  return {
    fields,
    setFields,
    handleChange,
    validate,
    submitBtn,
    setSubmitBtn,
    handleSubmit,
  };
};

export default useForm;
