  import {goodStatusFormat,date2Char} from '../../common/formatter'
var goodsColumns =[
    {
        prop:"name",  // 展示的路径
        label:"物品名称",  // 展示的列名
        width:"150"  // 展示的宽度
    },
    {
        prop:"code", 
        label:"物品编码",   
        width:"150"  // 展示的宽度
    },
    {
        prop:"status", 
        label:"状态",   
        width:"100",
        formatter:goodStatusFormat
     
    },
    {
        prop:"createTime", 
        label:"创建时间",   
        width:"150",  // 展示的宽度
        formatter:date2Char 
    },

    {
        prop:"updatetime", 
        label:"更新时间",   
        width:"160" ,
        formatter:date2Char
    },

    {
        prop:"createMan.userName", 
        label:"创建人",   
        width:"120" 
    },
    {
        prop:"updateMan.userName", 
        label:"更新人",   
        width:"120" 
    },
    {
        prop:"locationMan.userName", 
        label:"当前所在人员",   
        width:"120" 
    },

    
   
]

export default goodsColumns;