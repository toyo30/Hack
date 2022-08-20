import styled from "styled-components";

const Page = ({ children }) => {
  return (
    <StyledPage>
      <div>{children}</div>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(160, 160, 160);
  display: flex;
  justify-content: center;
  > div {
    position: relative;
    width: 360px;
    height: 640px;
    background-color: white;
  }
`;

export default Page;
