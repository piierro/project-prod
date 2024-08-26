import HomeIcon from 'shared/assets/icons/home.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import InfoIcon from 'shared/assets/icons/info.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg'

export interface SidebarItemType {
   path: string;
   text: string;
   Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
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
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'Личный кабинет'
  }
]