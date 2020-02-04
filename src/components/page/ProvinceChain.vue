<template>
<section class="container">
            <el-row :gutter="5">
            <el-col :span="3">
                <el-select v-model="provinceValue" filterable placeholder="省份" @change="selectProvimce">
                    <el-option
                        v-for="(item,index) of provincearr"
                        :key="index"
                        :label="item.name"
                        :value="item.cid"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="3">
                <el-select v-model="cityValue" placeholder="市" @change="selectcity">
                    <el-option
                        v-for="(item,index) of cityarr"
                        :key="index"
                        :label="item.name"
                        :value="item.cid"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select placeholder="区" v-model="regionValue">
                    <el-option
                        v-for="(item,index) of regionarr"
                        :key="index"
                        :label="item.name"
                        :value="item.cid"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import { async } from 'q';
export default {
    data() {
        return {
            // 省份
            provincearr: [],
            // 城市
            cityarr: [],
            // 区直辖县
            regionarr: [],
            // 选中的对象
            provinceValue: null,
            cityValue: null,
            regionValue: null
        };
    },
    created: async function() {
        let res = await this.$Http.getProvice();
        console.log(res);
        this.provincearr = res.data;
    },
    methods: {
        async selectProvimce(req) {
            let params = { parentId: req };
            let res = await this.$Http.getCitys(params);
            this.cityarr = res.data;
            this.cityValue = null;
            this.regionarr = [];
            this.regionValue = null;
        },
        async selectcity(req) {
            let params = {
                parentId: req
            };
            let res = await this.$Http.getCitys(params);
            console.log(res);
            this.regionarr = res.data;
            this.regionValue = null;
        },
        // 省份查询
        querySearch(queryString, cb) {
            var provinces = this.provincearr;
            let result = queryString
                ? provinces.filter(queryString => {
                      return provice => {
                          return provice.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
                      };
                  })
                : provinces;
            cb(result);
        }
     
    }
};
</script>

<style>
</style>