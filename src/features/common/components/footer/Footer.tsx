import React from 'react';
import { Paper, Stack, Box, Button } from '@mui/material';

import { Container, Logo } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';

const Footer: React.FC = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
        <Stack
          alignItems='center'
          justifyContent='space-between'
          direction={{ xs: 'column', md: 'row' }}
          sx={{ height: 'max-content' }}
        >
          <Logo />
          <Box>
            {menuIcons.map((item, index) => (
              <Button
                id='footer-menu-button'
                key={index}
                sx={{ color: 'inherit' }}
                href={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
