import { memo } from 'react';
import { ArticleList } from '@/entities/Article';
import { useSelector } from 'react-redux';
import { getArticles } from '../../model/slices/articlePageSlice';
import { 
  getArticlesPageIsLoading, 
  getArticlesPagesError, 
  getArticlesPagesView 
} from '../../model/selectors/articlesPageSelectors';
import { Text } from '@/shared/ui/Text/Text';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPagesView);
  const error = useSelector(getArticlesPagesError);

  if (error) {
    <Text title={'Страница не найдена'}/>
  }

  return (
    <ArticleList 
      articles={articles} 
      isLoading={isLoading}
      view={view}
      className={className}
    />
  )
})