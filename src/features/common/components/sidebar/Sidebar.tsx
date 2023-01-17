import React from 'react';

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import { Logo } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';
import { useThemeModeStore } from '@/stores';

type Props = {
  open?: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<Props> = ({ open = false, toggleSidebar }) => {
  const { isDark, switchMode } = useThemeModeStore();

  return (
    <Drawer
      id='sidebar-container'
      open={open}
      onClose={toggleSidebar}
      sx={{
        '& .MuiDrawer-Paper': {
          boxSizing: 'border-box',
          widh: '350px',
          borderRight: '0px',
        },
      }}
    >
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width='100%' direction='row' justifyContent='center'>
          <Logo />
        </Stack>
      </Toolbar>

      <List sx={{ paddingX: '30px' }}>
        {menuIcons.map((item, index) => {
          const isFocused = window.location.pathname == item.path;
          return (
            <ListItemButton
              id='sidebar-menu-button'
              key={index}
              href={item.path}
              onClick={toggleSidebar}
              sx={{
                borderRadius: '10px',
                marginY: 1,
                backgroundColor: isFocused ? 'primary.main' : 'unset',
              }}
            >
              <ListItemIcon sx={{ color: isFocused ? 'primary.contrastText' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    textTransform='uppercase'
                    sx={{ color: isFocused ? 'primary.contrastText' : 'inherit' }}
                  >
                    {item.display}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          alignSelf: 'center',
          textAlign: 'center',
          paddingBottom: '20px',
          px: '30px',
        }}
      >
        <IconButton onClick={switchMode} sx={{ color: 'inherit' }} id='sidebar-switch-theme'>
          {isDark() ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
