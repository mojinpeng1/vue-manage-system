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
    }
}

export default CITY_API;