const USER_API={
    login:{
        method:'post',
        url:"/user/login"
    },
    addUser:{
        method:'post',
        url:'/user/addUser'
    },
    update:{
        method:'post',
        url:'/user/update'
    },
    uploadPic:{
        method:'post',
        url:'user/uploadPic'
    },
    getPic:{
        method:'post',
        url:'user/getPic'
    },
    // 检查用户编码是否存在
    checkUser:{
        method:'get',
        url:'/user/checkUser'
    }
}

export default USER_API;