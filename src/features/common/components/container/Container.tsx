import React, { PropsWithChildren } from 'react';
import { Box, Stack, Typography } from '@mui/material';

type Props = {
  header?: string;
} & PropsWithChildren;

const Container: React.FC<Props> = ({ header, children }) => {
  return (
    <Box sx={{ marginTop: '5rem', marginX: 'auto', color: 'text.primary', width: '100%' }}>
      <Stack spacing={4}>
        {header && (
          <Box
            sx={{
              position: 'relative',
              paddingX: '20px',
              maxWidth: '1366px',
              marginX: 'auto',
              width: '100%',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '20px',
                top: '10-0%',
                height: '5px',
                width: '100px',
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Typography
              variant='h5'
              fontWeight='700'
              className='container-header'
              textTransform='uppercase'
              sx={{
                marginTop: '10px',
              }}
            >
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
