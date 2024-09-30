import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { 
  DynamicModuleLoader, ReducersList 
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgetes/Page/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPgeHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { WStack } from '@/shared/ui/Stack';
import { ArticleReccomendationsList } from '@/features/articleReccomendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';

interface ArticleDeatilsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDeatilsPage = ({ className }: ArticleDeatilsPageProps) => {
  const { id } = useParams<{id: string}>();

  if(!id) {
    return null
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAnMount>
      <Page className={classNames('', {}, [className])}>
        <WStack gap='16' max>
          <ArticleDetailsPgeHeader />
          <ArticleDetails id={id} />
          <ArticleRating articleId={id}/>
          <ArticleReccomendationsList />
          <ArticleDetailsComments id={id} />
        </WStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDeatilsPage);