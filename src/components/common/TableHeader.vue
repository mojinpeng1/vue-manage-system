<template>
    <div>
        <el-form :inline="true" :model="data" label-width="180px">
            <el-row :gutter="10">
                <el-col :span="8" v-for="(item, index) in config" :key="index">
                    <el-form-item :label="item.title" class="table-header-item">
                        <el-select
                            v-if="item.type === 'select'"
                            v-model="model"
                            :placeholder="`请输入${item.title}`"
                            :size="size"
                            clearable
                        >
                            <el-option
                                v-for="option in item.options"
                                :key="option.value"
                                :value="option.value"
                                :label="option.label"
                                :size="size"
                            ></el-option>
                        </el-select>
                        <el-input
                            v-else
                            v-model="data[item.code]"
                            :placeholder="`请输入${item.title}`"
                            :size="size"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="table-header_button">
                    <el-button type="text" :size="szie" @click="reset">清空</el-button>
                    <el-button type="primary" :size="size" icon="el-icon-search" @click="search">查询</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
/* import { Component, Prop, Vue } from 'vue-property-decorator';
  import { HeaderConfigItem } from "./data.ts";

  @Component({})
  export default class TableHeader extends Vue {
    public _copy: Object = {}
    @Prop({ default: function () {
        return 'small'
      }})
    size: 'small' | 'mini' | 'medium'

    @Prop({})
    data: Object

    @Prop({default: []})
    config: HeaderConfigItem[]

    mounted() {
      this._copy = Object.assign({}, this.data)
    }
    // 查询
    search() {
      this.$emit('search', this.data)
    }
    // 清空
    reset() {
      this.$emit('update:data', Object.assign({}, this._copy))
      this.search()
    }
  }
  */
</script>

<style lang="scss">
.table-header {
  padding-top: 10px;
  .table-header_button {
    text-align: right;
    float: right;
    margin-bottom: 12px;
    line-height: 40px;
  }
  .table-header-item.el-form-item {
    width: 100%;
    display: flex;
    flex: auto;
    margin-bottom: 12px;
    .el-form-item__content, .el-select {
      width: 100%;
    }
  }
}

</style>