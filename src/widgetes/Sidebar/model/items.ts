import HomeIcon from 'shared/assets/icons/home.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import InfoIcon from 'shared/assets/icons/info.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';

export interface SidebarItemType {
   path: string;
   text: string;
   Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
   authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: HomeIcon,
    text: 'Главная'
  },
  {
    path: RoutePath.articles,
    Icon: ArticleIcon,
    text: 'Статьи',
    authOnly: true
  },
  {
    path: RoutePath.about,
    Icon: InfoIcon,
    text: 'О сайте'
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'Личный кабинет',
    authOnly: true
  }
]