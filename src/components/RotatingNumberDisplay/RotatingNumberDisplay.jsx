import styled from "styled-components";

const RotatingNumberDisplay = ({
  number,
  css,
  oneMarginLeft,
}) => {
  return (
    <Wrapper>
      {Array( 2 )
        .fill( 2 )
        .map((value, index) => (
          <Digit
            key={index}
            value={Math.floor(
              (Math.abs(number) % 10 ** (value - index)) /
                10 ** (value - index - 1)
            )}
            oneMarginLeft={oneMarginLeft}
            css={css}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <div key={digit}>{digit}</div>
            ))}
          </Digit>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const Digit = styled.div`
  position: relative;
  overflow: hidden;
  height: 1000%;
  display: flex;
  flex-direction: column-reverse;
  ${({ value, oneMarginLeft }) =>
    value === 1 && `margin-left: ${oneMarginLeft}px;`}

  top: ${({ value }) => value * 100 - 900}%;
  transition: 0.4s;
  > div {
    display: flex;
    align-items: center;
    justify-content: right;
    height: 10%;
  }
  ${({ css }) => css}
`;

export default RotatingNumberDisplay;