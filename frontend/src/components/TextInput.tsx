import styled from "styled-components";

interface TextInputProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInputStyled = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  font-size: 15px;
  &:focus {
    outline: none;
    border-color: #165134;
  }
`;

export const TextInput = ({placeholder = '', onChange}: TextInputProps) => {
  return <TextInputStyled type="text" placeholder={placeholder} onChange={onChange}/>;
}