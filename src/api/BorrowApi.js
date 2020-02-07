const Borrow_API={
    // 新增借用
    addOneBorrow:{
        method:'post',
        url:"/borrow/addOne"
    },
    // 关闭借用
    closeBorrow:{
        method:'get',
        url:'/borrow/closeBorrow'
    },

     // 确认借用
     borrowConfirm:{
        method:'get',
        url:'/borrow/confirm'
    },
     // 确认借出
     borrowOutConfirm:{
        method:'get',
        url:'/borrow/confirmOut'
    },

     // 查询借用记录
     queryBorrow:{
        method:'post',
        url:'/borrow/queryBorrow'
    },
     // 归还
     returnBorrow:{
        method:'get',
        url:'/borrow/reback'
    },
  
    
}

export default Borrow_API;