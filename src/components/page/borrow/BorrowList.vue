<template>
    <div>
        <el-table
            :data="borrowData"
            style="width: 100%">
            
            <el-table-column type="index" width="50" label="序号"></el-table-column>

            <el-table-column  v-for="item in borrowColumns"    
                :key="item.id"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                >
            </el-table-column>

             <el-table-column fixed="right" label="操作" width="230">
                <template slot-scope="data">
                    <el-button type="primary" v-if="data.row.status === 0" @click="closeBorrow(data.row)" size="mini" round>关闭</el-button>
                    <el-button type="warning" v-if="data.row.status === 0 "
                     @click="confirmBorrow(data.row)" size="mini" round>借用</el-button>
                    <el-button type="success" v-if="data.row.status === 1" @click="confirmOut(data.row)" size="mini" round>借出</el-button>
                    <el-button type="warning" v-if="data.row.status === 2" @click="returnBorrow(data.row)" size="mini" round>归还</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import showColumn from './showColumn'
    export default {
        data() {
            return {
                borrowData:[],
                borrowColumns:showColumn

            }
        },
        created(){
            this.queryData();
        },
        methods:{
            // 关闭借用
            closeBorrow(param){
                let newParam = {brid:param.brId}
                this.$Http.closeBorrow(newParam).then(res => {
                    if(res.code === 1){
                        this.$message.success("已成功关闭!");
                        this.queryData();
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
             // 确认借用
            confirmBorrow(param){
                let newParam = {brid:param.brId}
                this.$Http.borrowConfirm(newParam).then(res => {
                    if(res.code === 1){
                        this.$message.success("确定成功");
                        this.queryData();
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
             // 确认借出
            confirmOut(param){
                let newParam = {brid:param.brId}
                this.$Http.borrowOutConfirm(newParam).then(res => {
                    if(res.code === 1){
                        this.$message.success("操作成功!");
                        this.queryData();
                    }else{
                        this.$$message.error(res.msg);
                    }
                })
            },
             // 归还
            returnBorrow(param){
                let newParam = {brid:param.brId}
                this.$Http.returnBorrow(newParam).then(res => {
                    if(res.code === 1){
                        this.$message.success("操作成功!");
                        this.queryData();
                    }else{
                        this.$message.error(res.msg);
                    }
                })

            },
            queryData(param){
                this.$Http.queryBorrow(param).then(res => {
                    if(res.code === 1){
                        this.borrowData = res.data;
                        this.$message.success("查询成功")
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            }
        }
        
    }
</script>

<style scoped>

</style>