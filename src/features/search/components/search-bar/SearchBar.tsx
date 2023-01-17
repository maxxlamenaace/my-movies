import React, { ChangeEvent } from 'react';

import { Stack, Button, TextField } from '@mui/material';

import { SearchType } from '@/features/search';

type Props = {
  searchType: SearchType;
  onSearchTypeChange: (searchType: SearchType) => void;
  onChange: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onChange, searchType, onSearchTypeChange }) => {
  const availableSearchTypes: SearchType[] = ['actor', 'movie', 'serie'];

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='center'>
        {availableSearchTypes.map((type, index) => {
          const isCurrentSearchType = searchType === type;
          return (
            <Button
              className='search-bar-button'
              key={index}
              fullWidth
              onClick={() => onSearchTypeChange(type)}
              variant={isCurrentSearchType ? 'contained' : 'outlined'}
              sx={{
                color: isCurrentSearchType ? 'primary.contrastText' : 'text.primary',
              }}
            >
              {type}
            </Button>
          );
        })}
      </Stack>
      <TextField
        className='search-bar-text-field'
        placeholder={`What ${searchType} are you looking for?`}
        sx={{ width: '100%' }}
        autoFocus
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          onChange(e.target.value);
        }}
      />
    </Stack>
  );
};

export default SearchBar;
