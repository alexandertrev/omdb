import styled from 'styled-components';

export const FlexBox = styled.div<{ column?: boolean; margin?: string }>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  margin: ${({ margin }) => margin};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 70%;
  padding: 20px;
  margin: auto;
  overflow: auto;
  background-color: #333;
`;

export const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: fit-content;
  flex: 2;
  height: 100%;
  margin-right: 20px;
`;

export const DetailsContainer = styled.div`
  flex: 3;
  height: 100%;
`;

export const TitleContainer = styled(FlexBox)``;

export const MovieTitle = styled.h1`
  color: #fff;
  margin-right: 40px;
`;

export const YearText = styled.span`
  margin-left: 10px;
  color: silver;
`;

export const SubTitle = styled.h4`
  margin-bottom: 15px;
  color: silver;
`;

export const SectionTitle = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;

export const TextTitle = styled.span`
  color: silver;
  font-weight: bold;
  margin-right: 10px;
`;

export const WhiteText = styled.span`
  color: #fff;
`;
