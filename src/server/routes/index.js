import { Router } from 'express'

import OauthRoute from './Oauth.routes'
import UserRoute from './User.routes'

const router= Router();

router.use('/oauth',OauthRoute)
router.use('/user',UserRoute)

export default router;