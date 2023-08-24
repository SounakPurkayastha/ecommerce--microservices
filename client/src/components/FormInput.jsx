import styled, { createGlobalStyle } from "styled-components";
import { useState } from "react";

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  font-family: "Nunito Sans";
  display: none;
`;

const Input = styled.input`
  height: 25px;
  &:invalid[data-focused="true"] ~ span {
    display: block;
  }

  &:invalid[data-focused="true"] {
    border: 1px solid red;
  }
`;

const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
`;

const FormLabel = styled.label`
  font-family: "Nunito Sans";
`;

const FormInput = (props) => {
  const {
    label,
    type,
    name,
    required,
    pattern,
    errorMessage,
    value,
    placeholder,
  } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <>
      <FormElement>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          name={name}
          value={value}
          onChange={props.onChange}
          required={required}
          pattern={pattern}
          data-focused={focused.toString()}
          borderColor="red"
          onBlur={handleFocus}
          placeholder={placeholder}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormElement>
    </>
  );
};

export default FormInput;
