import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../types/sidebar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import InfoIcon from 'shared/assets/icons/info.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutePath.main,
        Icon: HomeIcon,
        text: 'Главная'
      },
      {
        path: RoutePath.about,
        Icon: InfoIcon,
        text: 'О сайте'
      },
    ]
    if(userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.articles,
          Icon: ArticleIcon,
          text: 'Статьи',
          authOnly: true
        },
        {
          path: RoutePath.profile + userData.id,
          Icon: ProfileIcon,
          text: 'Личный кабинет',
          authOnly: true
        }
      )
      return sidebarItemsList;
    }
  })