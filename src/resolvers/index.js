import { merge } from 'lodash'

import foods from './foods'
import recipes from './recipes'
import users from './users'

export default merge(
  foods,
  recipes,
  users
)