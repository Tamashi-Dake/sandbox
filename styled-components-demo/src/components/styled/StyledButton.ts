import styled from "styled-components";

interface StyledButtonProps {
  $background?: string;
  $color?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 100px;
  height: 100px;
  background: ${({ $background }) => ($background ? $background : "#201c1c")};
  color: ${({ theme, $color }) => ($color ? $color : theme.colors.darkerBg)};
  border: 1px solid lightcoral;
  transition: all;
  transition-duration: 500;
  &:hover {
    background-color: black;
    color: white;

    > p {
      color: lightblue;
    }
  }
  &:active {
    background-color: gray;
    color: white;
  }
`;

export default StyledButton;
