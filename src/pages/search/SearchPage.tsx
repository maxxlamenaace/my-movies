import React, { useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Toolbar, Typography } from '@mui/material';

import { SearchType, useSearch, SearchBar } from '@/features/search';
import { MediasGrid, Media } from '@/features/medias';
import { Actor, ActorsGrid } from '@/features/actors';
import { globalStyles } from '@/theme/styles';
import { Wrapper } from '@/features/common';
import { useAppStore } from '@/stores';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('movie');
  const [currentPage, setCurrentPage] = useState(1);

  const { setLoading } = useAppStore();
  const { loading, results } = useSearch({ query, type: searchType, currentPage });

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Wrapper>
      <Toolbar />
      <Box sx={{ ...globalStyles.container }}>
        <SearchBar onChange={setQuery} onSearchTypeChange={setSearchType} searchType={searchType} />

        {results.length > 0 ? (
          searchType !== 'actor' ? (
            <>
              <MediasGrid
                mediaType={searchType === 'serie' ? 'tv' : searchType}
                medias={results as Media[]}
              />
              <LoadingButton
                sx={{ marginTop: 5 }}
                fullWidth
                color='primary'
                variant='contained'
                loading={loading}
                onClick={onLoadMore}
              >
                Load more
              </LoadingButton>
            </>
          ) : (
            <>
              <ActorsGrid actors={results as Actor[]} />
              <LoadingButton
                sx={{ marginTop: 5 }}
                fullWidth
                color='primary'
                variant='contained'
                loading={loading}
                onClick={onLoadMore}
              >
                Load more
              </LoadingButton>
            </>
          )
        ) : (
          query && !loading && <Typography>No results found</Typography>
        )}
      </Box>
    </Wrapper>
  );
};

export default SearchPage;
