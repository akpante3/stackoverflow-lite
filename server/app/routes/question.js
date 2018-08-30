import express from 'express';

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
questionRoutes.post('/questions', newQuestion);
questionRoutes.post('/questions/:id/answers', newAnswer);
questionRoutes.delete('/questions/:id', questionDelete);
questionRoutes.put('/questions/:questionId/answers/:answerId', markDownAnswer);
/** questions routes
 * @module questionRoutes
 */
export default questionRoutes;
