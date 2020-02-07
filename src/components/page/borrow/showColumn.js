var borrowColumns =[
    {
        prop:"goodsInfo.name",  // 展示的路径
        label:"借用物品名称",  // 展示的列名
        // width:"120"  // 展示的宽度
    },
    {
        prop:"goodsInfo.code", 
        label:"借用物品编码",   
        // width:"120" 
    },
    {
        prop:"goodsInfo.status", 
        label:"物品状态",   
        // width:"120" 
    },
    {
        prop:"goodsInfo.createMan.userName", 
        label:"物品创建人",   
        // width:"120" 
    },
    {
        prop:"goodsInfo.locationMan.userName", 
        label:"物品所在位置",   
        // width:"120" 
    },
    
    {
        prop:"borrowMan.userName", 
        label:"借用人",   
        // width:"120" 
    },
    {
        prop:"borrowReason", 
        label:"借用原因",   
        // width:"120" 
    },
    {
        prop:"expectReturn", 
        label:"预计归还时间",   
        // width:"160" 
    },

    {
        prop:"status", 
        label:"当前状态",   
        // width:"160" 
    }
   
]

export default borrowColumns;