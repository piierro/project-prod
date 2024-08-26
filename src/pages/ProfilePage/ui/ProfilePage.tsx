import { profileReducer } from 'entities/Profile';
import { classNames } from 'shared/lib/classNames/classNames';
import { 
  DynamicModuleLoader, ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
// import * as cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
  profile: profileReducer
}

interface PageLoaderProps {
    className?: string 
}

const ProfilePage = ({className}: PageLoaderProps) => {
 
  return (
    <DynamicModuleLoader reducers={reducers}  removeAfterAnMount>
      <div className={classNames('', {}, [className])}>
        Profile Page
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage;