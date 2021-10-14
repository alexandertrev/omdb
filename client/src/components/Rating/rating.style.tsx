import styled from 'styled-components';

export const RateContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  width: fit-content;
`;

export const RateTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5px;
`;

export const RateText = styled.span<{ bold?: boolean }>`
  color: #fff;
  font-weight: ${({ bold }) => bold && 'bold'};
`;
