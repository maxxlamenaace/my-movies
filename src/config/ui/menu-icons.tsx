import React, { ReactElement } from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export type MenuIcon = {
  display: 'home' | 'movies' | 'series' | 'search' | 'favorites';
  path: string;
  icon: ReactElement;
};

export const menuIcons: MenuIcon[] = [
  {
    display: 'home',
    path: '/',
    icon: <HomeOutlinedIcon />,
  },
  {
    display: 'movies',
    path: '/medias/movie',
    icon: <SlideshowOutlinedIcon />,
  },
  {
    display: 'series',
    path: '/medias/tv',
    icon: <LiveTvOutlinedIcon />,
  },
  {
    display: 'search',
    path: '/search',
    icon: <SearchOutlinedIcon />,
  },
  {
    display: 'favorites',
    path: '/favorites',
    icon: <FavoriteBorderOutlinedIcon />,
  },
];
