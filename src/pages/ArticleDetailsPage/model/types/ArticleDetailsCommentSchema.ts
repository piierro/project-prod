import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comments';

export interface ArticleDetailsCommentSchema extends EntityState<Comment, string> {
  isLoading?: boolean;
  error?: string;
}