import { ArticleDetailsCommentSchema } from './ArticleDetailsCommentSchema';
import { ArticleDetailsReccomendationSchema } from './ArticleDetailsReccomendationSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema;
    reccomendation: ArticleDetailsReccomendationSchema;
}