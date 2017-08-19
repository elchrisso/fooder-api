import { merge } from 'lodash'

import foods from './foods'
import recipes from './recipes'

export default merge(
  foods,
  recipes
)