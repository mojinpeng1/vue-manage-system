<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <div id="mapChart" :style="{width:'100%',height:'700px'}"></div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <div id="myChart2" :style="{width:'80%',height:'500px'}"></div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <div id="myChart" :style="{width:'100%',height:'500px'}"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import 'echarts/theme/macarons.js';
var geoCoordMap = {
    淮安区: [119.02, 33.62],
    南通: [121.05, 32.08],
    烟台: [121.39, 37.52],
    即墨: [120.45, 36.38]
};

var data = [{ name: '淮安区', value: 199 }, { name: '南通', value: 42 }, { name: '烟台', value: 102 }, { name: '即墨', value: 81 }];

var data1 = [{ name: '淮安区', coord: [119.02, 33.62] }, { name: '南通', coord: [121.05, 32.08] },
{ name: '烟台', coord: [121.39, 37.52], itemStyle:{
                                 color:'yellow'
                             }
                             }, { name: '即墨', coord: [120.45, 36.38] , itemStyle:{
                                 color:'yellow'
                             }}];

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

export default {
  

    methods: {
        drawLine() {
            let myChart = this.$echarts.init(document.getElementById('myChart'), 'macarons');
            myChart.setOption({
                title: {
                    text: '柱状图',
                    textStyle: {
                        color: 'red',
                        fontStyle: 'oblique'
                    },
                    left: 'center',
                    borderRadius: 5
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });

            // 第二份表格
            let myChart2 = this.$echarts.init(document.getElementById('myChart2'), 'macarons');
            myChart2.setOption({
                title: {
                    text: '天气情况统计',
                    subtext: '虚构数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                    data: ['西凉', '益州', '兖州', '荆州', '幽州']
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: [
                            {
                                value: 1548,
                                name: '幽州',
                                label: {
                                    normal: {
                                        formatter: [
                                            '{title|{b}}{abg|}',
                                            '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                            '{hr|}',
                                            '  {Sunny|}{value|202}{rate|55.3%}',
                                            '  {Cloudy|}{value|142}{rate|38.9%}',
                                            '  {Showers|}{value|21}{rate|5.8%}'
                                        ].join('\n'),
                                        backgroundColor: '#eee',
                                        borderColor: '#777',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            title: {
                                                color: '#eee',
                                                align: 'center'
                                            },
                                            abg: {
                                                backgroundColor: '#333',
                                                width: '100%',
                                                align: 'right',
                                                height: 25,
                                                borderRadius: [4, 4, 0, 0]
                                            },
                                            Sunny: {
                                                height: 30,
                                                align: 'left',
                                                backgroundColor: {
                                                    // image: weatherIcons.Sunny
                                                }
                                            },
                                            Cloudy: {
                                                height: 30,
                                                align: 'left',
                                                backgroundColor: {
                                                    // image: weatherIcons.Cloudy
                                                }
                                            },
                                            Showers: {
                                                height: 30,
                                                align: 'left',
                                                backgroundColor: {
                                                    // image: weatherIcons.Showers
                                                }
                                            },
                                            weatherHead: {
                                                color: '#333',
                                                height: 24,
                                                align: 'left'
                                            },
                                            hr: {
                                                borderColor: '#777',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            value: {
                                                width: 20,
                                                padding: [0, 20, 0, 30],
                                                align: 'left'
                                            },
                                            valueHead: {
                                                color: '#333',
                                                width: 20,
                                                padding: [0, 20, 0, 30],
                                                align: 'center'
                                            },
                                            rate: {
                                                width: 40,
                                                align: 'right',
                                                padding: [0, 10, 0, 0]
                                            },
                                            rateHead: {
                                                color: '#333',
                                                width: 40,
                                                align: 'center',
                                                padding: [0, 10, 0, 0]
                                            }
                                        }
                                    }
                                }
                            },
                            { value: 535, name: '荆州' },
                            { value: 510, name: '兖州' },
                            { value: 634, name: '益州' },
                            { value: 735, name: '西凉' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
            // 地图

            let mapChart = this.$echarts.init(document.getElementById('mapChart', 'macarons'));
            mapChart.setOption({
                title: {
                    text: '中国地图',
                    subtext: 'ggggggggggggggggggggggggggggggggg\t gggggggggggggg',
                    left: 'center',
                  
                },
                visualMap:{
                    type:'piecewise',
                    pieces:[
                        {value:1,label:'新立项',color:'red', symbol: 'path://M506.35709 1019.485672c-41.381337 0-382.213079-378.451139-382.213078-636.520205C124.144012 172.296841 294.936076 0.752388 506.35709 0.752388c210.668626 0 382.213079 170.792065 382.213079 382.213079-0.752388 257.316679-340.831741 636.520206-382.213079 636.520205z m0-827.626745c-117.37252 0-212.173402 94.800882-212.173402 212.173402s94.800882 212.173402 212.173402 212.173402 212.173402-94.800882 212.173402-212.173402c0-56.429096-22.571639-110.601029-62.4482-149.725202-39.876561-40.628949-94.048494-62.4482-149.725202-62.4482z m0 339.326966c-69.972079 0-127.153564-57.181484-127.153563-127.153564 0-69.972079 57.181484-127.153564 127.153563-127.153563 69.972079 0 127.153564 57.181484 127.153564 127.153563 0 69.972079-57.181484 127.153564-127.153564 127.153564z m0 0'},
                        {value:2,label:'制作中',color:'yellow', symbol: 'path://M506.35709 1019.485672c-41.381337 0-382.213079-378.451139-382.213078-636.520205C124.144012 172.296841 294.936076 0.752388 506.35709 0.752388c210.668626 0 382.213079 170.792065 382.213079 382.213079-0.752388 257.316679-340.831741 636.520206-382.213079 636.520205z m0-827.626745c-117.37252 0-212.173402 94.800882-212.173402 212.173402s94.800882 212.173402 212.173402 212.173402 212.173402-94.800882 212.173402-212.173402c0-56.429096-22.571639-110.601029-62.4482-149.725202-39.876561-40.628949-94.048494-62.4482-149.725202-62.4482z m0 339.326966c-69.972079 0-127.153564-57.181484-127.153563-127.153564 0-69.972079 57.181484-127.153564 127.153563-127.153563 69.972079 0 127.153564 57.181484 127.153564 127.153563 0 69.972079-57.181484 127.153564-127.153564 127.153564z m0 0'}
                    ],
                    left:'70%',
                    bottom:'25%'

                },
                geo: {
                    show: true,
                    map: 'china',
                    label: {
                       show:true,
                       color:'#DFDFDF',
                       fontStyle:'oblique',
                       fontWeight:'lighter',
                       fontSize:13,

                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#2B69A4',
                            borderColor: '#4386BA'
                        },
                        emphasis: {
                            areaColor: '#4499d0'
                        }
                    },
                    silent:true,
                },
                series: [
                    {
                        // symbolSize: 5,
                        label: {
                            show:true,
                            color:'#fff',
                            fontWeight:'bold',

                       
                        },
                        itemStyle: {
                            normal: {
                                color: '#E30417'
                            }
                        },
                        name: 'light',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        // data: convertData(data)
                    },
                    {
                        type: 'map',
                        map: 'china',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF'
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        markPoint:{
                            symbol: 'path://M506.35709 1019.485672c-41.381337 0-382.213079-378.451139-382.213078-636.520205C124.144012 172.296841 294.936076 0.752388 506.35709 0.752388c210.668626 0 382.213079 170.792065 382.213079 382.213079-0.752388 257.316679-340.831741 636.520206-382.213079 636.520205z m0-827.626745c-117.37252 0-212.173402 94.800882-212.173402 212.173402s94.800882 212.173402 212.173402 212.173402 212.173402-94.800882 212.173402-212.173402c0-56.429096-22.571639-110.601029-62.4482-149.725202-39.876561-40.628949-94.048494-62.4482-149.725202-62.4482z m0 339.326966c-69.972079 0-127.153564-57.181484-127.153563-127.153564 0-69.972079 57.181484-127.153564 127.153563-127.153563 69.972079 0 127.153564 57.181484 127.153564 127.153563 0 69.972079-57.181484 127.153564-127.153564 127.153564z m0 0',
                            symbolSize:20,
                            data:data1,
                             itemStyle:{
                                 color:'red'
                             }
                        }
                        
                      
                    }
                ],
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true,
                            type: 'jpeg',
                            name: 'China'
                        },
                        dataView: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        }
                    }
                }
              
            });
            mapChart.on('click', param => {
                console.log(param);
            });
        }
    },
    mounted() {
        this.drawLine();
    }
};
</script>


<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>