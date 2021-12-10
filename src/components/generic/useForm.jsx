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
    for (let field in fields) {
      let e = {
        target: {
          value: fields[field].value,
          name: field,
        },
      };
      validate(e);
      const { error, value } = fields[field];
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
    }
    if (fields[name].unique && data.length > 0 && variant === "add") {
      if (data.some(({ [name]: a }) => String(a) === String(value))) {
        setFields((prevState) => ({
          ...prevState,
          [name]: {
            ...prevState[name],
            error: true,
            message: "Valor ya existe en la base de datos",
          },
        }));
        setSubmitBtn(true);
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
