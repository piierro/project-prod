import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgetes/Page/Page';
import { WStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
// import * as cls from './ProfilePage.module.scss';

interface PageLoaderProps {
    className?: string 
}

const ProfilePage = ({className}: PageLoaderProps) => {
  const { id } = useParams<{id: string}>();

  if(!id) {
    return <Text text='Профиль не найден'/>
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <WStack gap="16" max>
        <EditableProfileCard id={id} />
      </WStack>
    </Page>
  )
}

export default ProfilePage;