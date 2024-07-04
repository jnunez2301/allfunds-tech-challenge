import styled from "styled-components";
import { TimesX } from "../utils/Icons";
interface DialogProps {
  children: React.ReactNode;
  showMenu: boolean;
  onClose: () => void;
}
const Modal = styled.div<{ $mode: boolean}>`
  display: ${props => props.$mode ? 'block' : 'none'}; /* none by default */
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4);
`;

// Styled Modal Content/Box
const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: fit-content; 
  position: relative;
`;
const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  cursor: pointer;
  &:hover {
    color: #165134;
  }
`
export const Dialog = ({ children, showMenu = false, onClose }: DialogProps) => {
  return (
    <Modal $mode={showMenu}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <TimesX />
        </CloseButton>
        {children}
      </ModalContent>
    </Modal>
  );
};
