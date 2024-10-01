import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../types/sidebar';
import HomeIcon from '@/shared/assets/icons/home.svg';
import InfoIcon from '@/shared/assets/icons/info.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        Icon: HomeIcon,
        text: 'Главная'
      },
      {
        path: getRouteAbout(),
        Icon: InfoIcon,
        text: 'О сайте'
      },
    ]
    if(userData) {
      sidebarItemsList.push(
        {
          path: getRouteArticles(),
          Icon: ArticleIcon,
          text: 'Статьи',
          authOnly: true
        },
        {
          path: getRouteProfile(userData.id),
          Icon: ProfileIcon,
          text: 'Личный кабинет',
          authOnly: true
        }
      )
    }
    return sidebarItemsList;
  })