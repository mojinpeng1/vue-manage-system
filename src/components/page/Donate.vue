<template>
    <section class="container">
    <el-row>
      <el-select v-model="provinceValue" placeholder="省份" @change="selectProvimce">
        <el-option
          v-for="(item,index) of provincearr"
          :key="index"
          :label="item.name"
          :value="item.cid"
        ></el-option>
      </el-select>
     
      <el-select v-model="cityValue" placeholder="市" @change="selectcity">
        <el-option v-for="(item,index) of cityarr" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <el-select placeholder="区" v-model="RegionValue">
        <el-option
          v-for="(item,index) of regionarr"
          :key="index"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-row>
  </section>
</template>

<script>
export default {
    data() {
        return {
            // 省份
            provincearr: [],
            // 城市
            cityarr: [],
            // 区直辖县
            regionarr:[],
            // 选中的对象
            provinceValue:{},
            cityValue:{},
            RegionValue:{}


        };
    },
    created: async function() {
        let res = await this.$Http.getProvice();
        this.provincearr = res.data;
    },
    methods: {
        async selectProvimce(req){
            let params = {parentId:req}
            let res = await this.$Http.getCitys(params);
            console.log(res);
            this.cityarr= res.data;
        },
          selectcity(){
            console.log(provinceValue);
        },
        //   selectProvimce(){
        //     console.log(provinceValue);
        // },
    }
};
</script>

<style>
</style>