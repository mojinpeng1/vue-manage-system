import CityApi from './CityApi'
import UserApi from './UserApi'
import GoodsApi from './GoodsApi'
// 物品借用
import BorrowApi from './BorrowApi'

export default {
    ...CityApi,...UserApi,...GoodsApi,...BorrowApi
}