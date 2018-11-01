import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
    res.send({
        message: 'All attendants'
    });
});

export default usersRouter;