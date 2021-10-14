import React from 'react';
import _ from 'lodash';

import { KeyboardEvent } from '../../constants';

import { InputContainer, StyledButton, StyledInput } from './movieSearchBar.style';

interface SearchBarProps {
  search: string;
  searchInProcess: boolean;
  setSearch(query: string): void;
  onSearch(query: string): void;
}

export const MoviesSearchBar: React.FC<SearchBarProps> = ({
  search,
  searchInProcess,
  setSearch,
  onSearch,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyboardEvent.Enter && !_.isEmpty(search)) {
      onSearch(search);
    }
  };

  return (
    <InputContainer>
      <StyledInput
        style={{ height: '40px' }}
        placeholder="search..."
        value={search}
        onInput={(event: React.FormEvent<HTMLInputElement>) => setSearch(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <StyledButton
        type="primary"
        disabled={_.isEmpty(search) || searchInProcess}
        onClick={() => onSearch(search)}
      >
        Search
      </StyledButton>
    </InputContainer>
  );
};
