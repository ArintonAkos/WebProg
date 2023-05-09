import app from './app';
import connectToDatabase from './config/database';

const port = 3000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
