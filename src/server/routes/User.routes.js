import {Router} from 'express'

import {userById,logout,getImage} from '../handler/User.handler'

const router= Router();

router.route('/:userId')
.get(userById)

router.route('/:userId/logout')
.get(logout)

router.route('/image/:userId')
.get(getImage)

export default router;

