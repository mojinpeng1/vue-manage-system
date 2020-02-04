const USER_API={
    // 查询物品
    goodsList:{
        method:'post',
        url:"/goods/list"
    },
    // 增加物品
    goodsAdd:{
        method:'post',
        url:"/goods/addOrUpdateGoods"
    },
    // 删除物品
    goodsDelete:{
        method:'post',
        url:"/goods/deleteGoods"
    },
     // 修改物品
    //  goodsDelete:{
    //     method:'post',
    //     url:"/goods/update"
    // },
     // 检查物品编码是否重复
     checkGoods:{
        method:'get',
        url:"/goods/checkGoods"
    },
    
}

export default USER_API;