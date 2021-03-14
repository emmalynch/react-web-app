import config from 'config';
import cors from 'cors';
import express from 'express';
import createLogger from 'logging';

import router from './routes/posts';

const logger = createLogger('server');
const app = express();
const port = config.get<number>('port');

app.use(cors());
app.use(express.json({ type: 'application/json' }));
app.use('/posts', router);

app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
