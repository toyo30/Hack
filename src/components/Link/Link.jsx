import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";

const Link = styled(ReactLink)`
  text-decoration: none;
  color: inherit;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export default Link;