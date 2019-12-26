const CITY_API={
    getProvice:{
        method:'get',
        url:"/city/findProvince"
    },
    getCitys:{
        method:'get',
        url:'/city/findCitys'
    },
    queryCitys:{
        method:'post',
        url:'/city/queryCitys'
    },
    addCity:{
        method:'post',
        url:'/city/addCity'
    },
    patchDelete:{
        method:'post',
        url:'/city/patchDelete'
    }
}

export default CITY_API;