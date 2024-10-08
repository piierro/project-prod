import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgetes/Page';
import { WStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { ProfileRating } from '@/features/profileRating';

interface PageLoaderProps {
    className?: string 
}

const ProfilePage = ({className}: PageLoaderProps) => {
  const { id } = useParams<{id: string}>();

  if(!id) {
    return null
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <WStack gap="16" max>
        <EditableProfileCard id={id} />
        <ProfileRating profileId={id} />
      </WStack>
    </Page>
  )
}

export default ProfilePage;