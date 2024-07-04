import styled from "styled-components";
export const Container = styled.section<{ $gutter?: number, justify?: string }>`
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  justify-content: ${props => props.justify};
  gap: ${props => `${props.$gutter}px` || 0};

  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #39d585;
    border-radius: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  @media (max-width: 768px) {
    padding: .2rem;
  }
`;