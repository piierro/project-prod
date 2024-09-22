import { combineReducers } from 'redux';
import { articleDetailsCommentsReducer } from './ArticleDetailsCommentSlice';
import { articleDetailsReccomendationReducer } from './ArticleDetailsRecomendation';

export const articleDetailsPageReducer = combineReducers({
  reccomendation: articleDetailsReccomendationReducer,
  comments: articleDetailsCommentsReducer
})