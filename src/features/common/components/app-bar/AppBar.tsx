import React, { useState } from 'react';
import { AppBar as MUIAppBar, Toolbar, Stack, IconButton, Box, Button } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import { Logo, ScrollableAppBar, Sidebar } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';
import { useThemeModeStore } from '@/stores';

const AppBar: React.FC = () => {
  const { isDark, switchMode } = useThemeModeStore();

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

              <IconButton
                onClick={switchMode}
                sx={{ color: 'inherit', position: 'absolute', right: '30px' }}
                id='top-bar-switch-theme'
              >
                {isDark() ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </MUIAppBar>
      </ScrollableAppBar>
    </>
  );
};

export default AppBar;
