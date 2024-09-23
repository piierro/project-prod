import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './ArticleDetailsPgeHeader.module.scss'
import { memo, useCallback } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from '../../model/selectors/articel';
import { HStack } from 'shared/ui/Stack';

interface ArticleDetailsPgeHeaderProps {
  className?: string;
}

export const ArticleDetailsPgeHeader = memo(({ className }: ArticleDetailsPgeHeaderProps) => {
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);
    
  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [navigate, article?.id])

  return (
    <HStack align='center' className={classNames('', {}, [className])}>
      <Button 
        onClick={onBackToList}
        className={cls.btn}
      >
        Назад к списку
      </Button>
      {canEdit && (
        <Button 
          onClick={onEditArticle}
          className={cls.editBtn}
        >
          Редактировать
        </Button>
      )}
    </HStack>
  )
})