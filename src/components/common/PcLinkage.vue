<template>
    <div class="block">
        <span class="demonstration">单选可搜索</span>
        <el-cascader
            size="medium"
            clearable="true"
            placeholder="试试搜索省份:江苏"
            :options="options"
            filterable
        ></el-cascader>
    </div>
</template>


<script>
export default {
    data() {
        return {
            options: []
        };
    },
    created:{
        initProvice(){
           let res = await this.$Http.getProvice();
           console.log(res);
        }
    }
};
</script>