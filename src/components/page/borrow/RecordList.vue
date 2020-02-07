<template>
    <div>
        <el-table
            :data="borrowData"
            style="width: 100%">
            
            <el-table-column fixed="left" type="index" width="50" label="序号"></el-table-column>

            <el-table-column  v-for="item in borrowColumns"    
                :key="item.id"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :formatter="item.formatter"
                :fixed="item.fixed"
                >
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
           
            queryData(param){
                this.$Http.queryBorrowRecord(param).then(res => {
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