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

questionRoutes.get('/questions', allquestion);
questionRoutes.get('/questions/:id', aQuestion);
questionRoutes.post('/questions', authenticate, newQuestion);
questionRoutes.post('/questions/:id/answers', authenticate, newAnswer);
questionRoutes.delete('/questions/:id', questionDelete);
questionRoutes.put('/questions/:questionId/answers/:answerId', markDownAnswer);
/** questions routes
 * @module questionRoutes
 */
export default questionRoutes;
