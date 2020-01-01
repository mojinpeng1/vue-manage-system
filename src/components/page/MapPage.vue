<template>
    <div class="chart">
        <el-row :gutter="20">
            <el-button class="a" type="success" round>成功按钮</el-button>
            <el-button class="b" type="info" round>信息按钮</el-button>
            <el-button class="c" type="warning" round>警告按钮</el-button>
            <el-button class="d" type="danger" round>危险按钮</el-button>

            <el-col :span="18" class="ssss">
                <div id="mapChart" :style="{width:'100%',height:'700px'}"></div>
            </el-col>
            <el-col :span="6">
                <el-table
                    :summary-method="getSummaries"
                    show-summary
                    :data="tableData"
                    max-height="450px"
                >
                    <el-table-column prop="province" label="省份"></el-table-column>
                    <el-table-column prop="projectNum" label="项目数"></el-table-column>
                    <el-table-column prop="projectWeight" label="项目体量"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"></el-col>
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

const positionSvg =
    'path://M506.35709 1019.485672c-41.381337 0-382.213079-378.451139-382.213078-636.520205C124.144012 172.296841 294.936076 0.752388 506.35709 0.752388c210.668626 0 382.213079 170.792065 382.213079 382.213079-0.752388 257.316679-340.831741 636.520206-382.213079 636.520205z m0-827.626745c-117.37252 0-212.173402 94.800882-212.173402 212.173402s94.800882 212.173402 212.173402 212.173402 212.173402-94.800882 212.173402-212.173402c0-56.429096-22.571639-110.601029-62.4482-149.725202-39.876561-40.628949-94.048494-62.4482-149.725202-62.4482z m0 339.326966c-69.972079 0-127.153564-57.181484-127.153563-127.153564 0-69.972079 57.181484-127.153564 127.153563-127.153563 69.972079 0 127.153564 57.181484 127.153564 127.153563 0 69.972079-57.181484 127.153564-127.153564 127.153564z m0 0';
// var data = [{ name: '淮安区', value: 199 }, { name: '南通', value: 42 }, { name: '烟台', value: 102 }, { name: '即墨', value: 81 }];

var data1 = [
    { name: '淮安区', value: 1, projectId: 1 },
    { name: '南通', value: 2, projectId: 2 },
    { name: '烟台', value: 1, projectId: 3 },
    { name: '即墨', value: 2, projectId: 4 }
];
// 返回数据类型   [[120.45, 36.38,1,1]]     第一个和第二个是经纬度信息  visualMap 做标记可以设 dimension  属性来控制
var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value).concat(data[i].projectId));
        }
        console.log(res);
    }
    return res;
};

export default {
    data() {
        return {
            tableData: [
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                },
                {
                    province: '江苏省',
                    projectNum: 15,
                    projectWeight: 30
                }
            ]
        };
    },
    methods: {
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    // sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
        },
        drawLine() {
            // 地图

            let mapChart = this.$echarts.init(document.getElementById('mapChart', 'macarons'));
            mapChart.setOption({
                title: {
                    text: '中国地图',
                    subtext: 'ggggggggggggggggggggggggggggggggg\t gggggggggggggg',
                    left: 'center'
                },
                visualMap: {
                    type: 'piecewise',
                    dimension: 2, // 获取数据的维度
                    pieces: [
                        {
                            value: 1,
                            label: '新立项',
                            color: 'red',
                            symbol: positionSvg
                        },
                        {
                            value: 2,
                            label: '制作中',
                            color: 'yellow',
                            symbol: positionSvg
                        }
                    ],
                    left: '80%',
                    bottom: '25%'
                },
                geo: {
                    show: true,
                    map: 'china',
                    label: {
                        show: true,
                        color: '#DFDFDF',
                        fontStyle: 'oblique',
                        fontWeight: 'lighter',
                        fontSize: 13
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
                    silent: true
                },
                series: [
                    // 标点
                    {
                        geoIndex: 0,
                        // id:getid(data1),
                        // name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data1),
                        symbolSize: 24,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        tooltip: {
                            position: [10, 10]
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
                console.log(param.data[2]);
            });
        }
    },
    mounted() {
        this.drawLine();
    }
};
</script>


<style scoped>
.chart {
    background-color: rgb(16, 148, 224);
}

.el-table {
    color: red;
    margin-top: 30%;
    margin-right: 10px;
    /* 表格字体颜色 */
    color: rgb(26, 39, 223);
    /* 表格边框颜色 */
    /* border: 0.5px solid #758a99; */
    height: 500px;
}

.ssss {
    z-index: 1;
}

.a,
.b,
.c,
.d {
    z-index: 1;
}
.a {
    position: absolute;
    left: 40px;
    top: 60px;
}

.b {
    position: absolute;
    left: 40px;

    top: 100px;
}
.c {
    position: absolute;
    left: 40px;
    top: 180px;
}
.d {
    position: absolute;
    left: 40px;
    top: 140px;
}
</style>