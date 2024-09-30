import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from '@/widgetes/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const {id} = useParams<{id: string}>();
  const isEdit = Boolean(id)
  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit ? 
        ('Редактирование статьи = ' ) + id
        : 'Создание новой статьи'}
    </Page>
  )
})

export default ArticleEditPage;