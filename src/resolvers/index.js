import { merge } from 'lodash'

import foods from './foods'
import recipes from './recipes'
import users from './users'
import profiles from './profiles'

export default merge(
  foods,
  recipes,
  users,
  profiles
)