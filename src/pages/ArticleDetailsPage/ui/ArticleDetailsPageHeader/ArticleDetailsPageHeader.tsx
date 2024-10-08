import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleDetailsPgeHeader.module.scss'
import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/articel';
import { HStack } from '@/shared/ui/Stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

interface ArticleDetailsPgeHeaderProps {
  className?: string;
}

export const ArticleDetailsPgeHeader = memo(({ className }: ArticleDetailsPgeHeaderProps) => {
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);
    
  const onBackToList = useCallback(() => {
    navigate(getRouteArticles())
  }, [navigate])

  const onEditArticle = useCallback(() => {
    if(article) {
      navigate(getRouteArticleEdit(article.id))
    }
  }, [navigate, article])

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