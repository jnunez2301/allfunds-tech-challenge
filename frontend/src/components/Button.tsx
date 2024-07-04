import styled, { css } from "styled-components";

export const Button = styled.button<{ $outlined?: boolean, size?: 'sm' | 'md' | 'lg' }>`
  background-color: #27c072;
  border: none;
  color: #062d1b;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  font-size: ${(props) => (props.size === 'sm' ? '0.8rem' : props.size === 'lg' ? '1.2rem' : '1rem')};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #1a9f5b;
  }
  &:active {
    background-color: #187d4a;
  }
  &:disabled {
    background-color: #ddfbeb;
    color: #39d585;
    cursor: not-allowed;
  }
  ${(props) =>
    props.$outlined &&
    css`
      background-color: transparent;
      border: 1px solid #1a9f5b;
      color: #1a9f5b;
      &:hover {
        background-color: transparent;
        color: #187d4a;
        border-color: #187d4a;
      }
      &:disabled {
        color: #89ecb9;
        border-color: #89ecb9;
        cursor: not-allowed;
      }
      &:active {
        background-color: transparent;
        color: #18633e;
        border-color: #18633e;
      }
      &:disabled {
        color: #89ecb9;
        background-color: transparent;
        border-color: #89ecb9;
      }
    `};
`;
