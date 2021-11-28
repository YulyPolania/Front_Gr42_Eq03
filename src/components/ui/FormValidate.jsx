import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

import UsersService from "../../services/UsersService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  width: "100%",
  mb: 2,
};

export const FormComponent = (props) => {
  const {
    handleOpen,
    data,
    setData,
    inputs,
    title,
    disable,
    fields,
    setFields,
  } = { ...props };

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({});

  const handleChange = (e, re, em) => {
    e.persist();
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validate(name, re, em);
  };

  const validate = (name, re, em) => {

    console.log(name)
    console.log(re)
    console.log(em)
    let i = String(fields[name]);
    console.log(re.test(i))

    if(!re.test(i)){
      setErrors((prevState) => ({ ...prevState, [name]: true }));
      setMessage((prevState) => ({ ...prevState, [name]: em }));
    }else{
      setErrors((prevState) => ({ ...prevState, [name]: false }));
          setMessage((prevState) => ({ ...prevState, [name]: "" }));
    }

    
    // if (i === "") {
    //   setErrors((prevState) => ({ ...prevState, [name]: true }));
    //   setMessage((prevState) => ({ ...prevState, [name]: "Obligatorio" }));
    // } else {
    //   if (name === "email") {
    //     const emailRegex =
    //       /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //     if (emailRegex.test(i)) {
    //       setErrors((prevState) => ({ ...prevState, [name]: false }));
    //       setMessage((prevState) => ({ ...prevState, [name]: "" }));
    //     } else {
    //       setErrors((prevState) => ({ ...prevState, [name]: true }));
    //       setMessage((prevState) => ({
    //         ...prevState,
    //         [name]: "Correo inválido",
    //       }));
    //     }
    //   } else {
    //     if (i.length >= 20) {
    //       setErrors((prevState) => ({ ...prevState, [name]: true }));
    //       setMessage((prevState) => ({
    //         ...prevState,
    //         [name]: "Maximo 20 caracteres",
    //       }));
    //     } else {
    //       setErrors((prevState) => ({ ...prevState, [name]: false }));
    //       setMessage((prevState) => ({ ...prevState, [name]: "" }));
    //     }
    //   }
    // }

    return Object.values(fields).every((x) => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // inputs.forEach(({ name }) => {
    //   validate(name);
    // });
  };

  const handleAceptar = () => {
    if (Object.values(errors).every((x) => !x)) {
      console.log("OK.......");
    } else {
      console.log("NO.......");
    }
  };

  const postData = async () => {
    // setAdd(titles);
    await UsersService.saveUser(fields).then((res) => {
      setData(data.concat(res.data));
      handleOpen();
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={style}>
      <Typography variant="h5" align="center" component="div" sx={buttonStyle}>
        {title}
      </Typography>
      {inputs.map(
        ({ label, name, regularExpression: re, errorMessage: em }) => (
          <TextField
            disabled={
              name === disable ? true : disable === "all" ? true : false
            }
            error={errors[name]}
            helperText={message[name]}
            label={label}
            name={name}
            onChange={(e) => handleChange(e, re, em)}
            onKeyUp={(e) => handleChange(e, re, em)}
            value={fields[name]}
            sx={buttonStyle}
            key={name}
            size="small"
            // {...(errors[name] && {error:true, helperText:"errors.temp"})}
          />
        )
      )}
      <div align="center">
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ mx: 3 }}
          onClick={handleAceptar}
        >
          ACEPTAR
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 3 }}
          onClick={handleOpen}
        >
          CANCELAR
        </Button>
      </div>
    </Box>
  );
};
