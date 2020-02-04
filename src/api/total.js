import CityApi from './CityApi'
import UserApi from './UserApi'
import GoodsApi from './GoodsApi'

export default {
    ...CityApi,...UserApi,...GoodsApi
}