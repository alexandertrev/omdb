import styled from 'styled-components';
import { Input, Button } from 'antd';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
`;

export const StyledInput = styled(Input)`
  height: 40px;
  &::placeholder {
    color: #fff;
  }
`;

export const StyledButton = styled(Button)`
  height: 40px;
  margin-left: 10px;
`;
