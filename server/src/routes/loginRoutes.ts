import {Router} from 'express';
import {createUser, loginUser, logoutUser} from '../controllers/loginControllers';

const loginRouter: Router = Router();

loginRouter.post('/', createUser as any);
loginRouter.post('/login', loginUser as any);
loginRouter.get('/logout', logoutUser as any);

export default loginRouter;