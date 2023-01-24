import React, { useState } from 'react';
import {
  AppBar as MUIAppBar,
  Toolbar,
  Stack,
  IconButton,
  Box,
  Button,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import { Logo, ScrollableAppBar, Sidebar } from '@/features/common';
import { useThemeModeStore, useAuthStore } from '@/stores';
import { menuIcons } from '@/config/ui/menu-icons';

const AppBar: React.FC = () => {
  const { isDark, switchMode } = useThemeModeStore();
  const { username, logout, isAuthenticated } = useAuthStore();

  const [sidebarOpened, setSidebarOpened] = useState(false);

  const toggleSidebarOpened = () => setSidebarOpened(!sidebarOpened);

  return (
    <>
      <Sidebar open={sidebarOpened} toggleSidebar={toggleSidebarOpened} />
      <ScrollableAppBar>
        <MUIAppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <IconButton
                color='inherit'
                sx={{ mr: 2, display: { md: 'none' } }}
                onClick={toggleSidebarOpened}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Logo />
              </Box>
            </Stack>

            <Box flexGrow={1} alignItems='center' display={{ xs: 'none', md: 'flex' }}>
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuIcons.map((item, index) => (
                <Button
                  id='top-bar-menu-button'
                  key={index}
                  href={item.path}
                  sx={{
                    color:
                      window.location.pathname == item.path ? 'primary.contrastText' : 'inherit',
                    mr: 2,
                  }}
                  variant={window.location.pathname == item.path ? 'contained' : 'text'}
                >
                  {item.display}
                </Button>
              ))}

              <IconButton onClick={switchMode} sx={{ color: 'inherit' }} id='top-bar-switch-theme'>
                {isDark() ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
              </IconButton>

              {isAuthenticated() && (
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    right: '30px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant='button' fontWeight='700'>
                    {username}
                  </Typography>
                  <IconButton onClick={logout} sx={{ color: 'inherit' }} id='top-bar-logout'>
                    <LogoutIcon />
                  </IconButton>
                </Stack>
              )}
            </Box>
          </Toolbar>
        </MUIAppBar>
      </ScrollableAppBar>
    </>
  );
};

export default AppBar;
