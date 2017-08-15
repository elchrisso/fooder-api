import Sequelize from 'sequelize'
import connections from './connections.json'


export default new Sequelize(connections.development)