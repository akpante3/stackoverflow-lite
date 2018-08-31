import express from 'express';
import authenticate from '../middleware/auth';

import {
  newQuestion,
  aQuestion,
  allquestion,
  newAnswer,
  questionDelete,
  markDownAnswer,
} from './../middleware/question';

const questionRoutes = express.Router();

questionRoutes.get('/questions', authenticate, allquestion);
questionRoutes.get('/questions/:id', authenticate, aQuestion);
questionRoutes.post('/questions', authenticate, newQuestion);
questionRoutes.post('/questions/:id/answers', authenticate, newAnswer);
questionRoutes.delete('/questions/:id', authenticate, questionDelete);
questionRoutes.put('/questions/:questionId/answers/:answerId', authenticate, markDownAnswer);
/** questions routes
 * @module questionRoutes
 */
export default questionRoutes;
