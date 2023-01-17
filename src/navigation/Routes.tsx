import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import { MainLayout } from '@/layouts';

import {
  HomePage,
  ActorDetailsPage,
  MediaDetailsPage,
  MediasListPage,
  SearchPage,
  FavoritesPage,
} from '@/pages';

export const Routes: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'actors/:actorId', element: <ActorDetailsPage /> },
        { path: 'medias/:mediaType', element: <MediasListPage /> },
        { path: 'medias/:mediaType/:mediaId', element: <MediaDetailsPage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'favorites', element: <FavoritesPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/' />,
    },
  ]);
};
