import React, { cloneElement, PropsWithChildren } from 'react';
import { useScrollTrigger } from '@mui/material';

import { useThemeModeStore } from '@/stores';

const ScrollableAppBar: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useThemeModeStore();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: typeof window != undefined ? window : undefined,
  });

  return cloneElement(children as React.ReactElement, {
    sx: {
      color: trigger ? 'text.primary' : isDark() ? 'primary.contrastText' : 'text.primary',
      backgroundColor: trigger ? 'background.paper' : isDark() ? 'transparent' : 'background.paper',
    },
  });
};

export default ScrollableAppBar;
