<template>
    <div>
        <div class="container">
            <el-row :gutter="2">
                <el-col :span="2">
                    <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                    >批量删除</el-button>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="query.condition.address" placeholder="地址" class="handle-select mr10">
                        <el-option key="1" label="广东省" value="广东省"></el-option>
                        <el-option key="2" label="湖南省" value="湖南省"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="query.condition.adCode" placeholder="城市编码"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </el-col>
                <el-col :span="3" :offset="7">
                    <el-button type="primary" @click="addOne">添加一行</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                :stripe="true"
                max-height="500"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="cid" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="adCode" label="地方编码"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>

                <el-table-column prop="cityCode" label="城市编码"></el-table-column>
                <el-table-column label="Level" prop="level"></el-table-column>

                <el-table-column prop="center" label="经纬度" width="280"></el-table-column>

                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.paging.pageNum"
                    :page-sizes="[20, 50, 100, 200]"
                    :page-size="query.paging.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 新增一行 -->
        <el-dialog title="手动添加城市" :visible.sync="cityVisible" width="40%">
            <add-row></add-row>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import AddRow from './AddRow';
export default {
    name: 'basetable',
    components: {
        AddRow
    },
    data() {
        return {
            
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            // 添加城市是否可见
            cityVisible: false,
            pageTotal: 20,
            form: {},
            idx: -1,
            id: -1,
            // currentPage: 1,
            // pageSize: 20,
            query: {
                // 分页参数
                paging: {
                    pageNum: 1,
                    pageSize: 20
                },
                // 查询条件
                condition: {}
            },
        };
    },
    created() {

        this.getData();
        this.$bus.on('showAddCity', this.changeCityVisable);
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            let param = this.query;
            console.log(this.query);

            this.$Http.queryCitys(param).then(
                
                result => {

                    
                this.tableData = result.data.data;
                this.pageTotal = result.data.totalSize;
            });
        },
        // pageSize改变
        handleSizeChange(size) {
            this.query.paging.pageSize = size;
            this.query.paging.pageNum = 1;
            this.getData();
        },
        // page发生改变
        handleCurrentChange(num) {
            console.log(num);
            this.query.paging.pageNum = num;
            this.getData();
        },

        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';

            this.delList = this.delList.concat(this.multipleSelection);
            // this.$Http.patchDelete(this.delList);
            // this.$message.success('删除成功');
            // this.getData();

            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log(this.delList);
                    this.$Http.patchDelete(this.delList).then(() => {
                        this.getData();
                        this.$message.success('删除成功');
                    });
                })
                .catch(() => {});

            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        addOne() {
            this.cityVisible = true;
        },
        changeCityVisable() {
            this.cityVisible = false;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
