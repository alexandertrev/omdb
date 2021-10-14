import React from 'react';
import { Rate } from 'antd';

import { RateContainer, RateText, RateTextContainer } from './rating.style';

interface IRatingProps {
  rate: { value: number; count: number };
  rateText: string;
  rateSubText?: string;
}

export const Rating: React.FC<IRatingProps> = ({ rate, rateText, rateSubText }) => {
  return (
    <RateContainer>
      <Rate disabled value={rate.value} count={rate.count} allowHalf />
      <RateTextContainer>
        <RateText bold>{rateText}</RateText>
        <RateText>{rateSubText}</RateText>
      </RateTextContainer>
    </RateContainer>
  );
};
