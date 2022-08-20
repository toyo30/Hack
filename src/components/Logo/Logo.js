import styled from "styled-components";
import umi from "../../img/umi.png";

function Logo() {
  console.log(umi);
  return (
    <LogoRoot />
  );
};

const LogoRoot = styled.div`
    width: 40px;
    height: 40px;
    margin: 15px;
    background: url(${umi});
    background-size: contain;
`;

export default Logo;