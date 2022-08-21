import styled from "styled-components";
import plusicon from "../../img/plusicon.png";

function PlusIcon() {
  return (
    <PlusIconRoot />
  );
};

const PlusIconRoot = styled.div`
    width: 40px;
    height: 40px;
    margin: 15px;
    background: url(${plusicon});
    background-size: contain;
`;

export default PlusIcon;