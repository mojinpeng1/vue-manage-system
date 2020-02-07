<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="2">
                <el-button type="primary" @click="addOne">新增一条物品</el-button>
            </el-col>
        </el-row>
        <el-table :data="goodsList" style="width: 100%" :stripe="true">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <!--                         
                          <el-table-column prop="status" label="关联状态" :formatter="goodStatusFormat">
                               
            </el-table-column>-->

            <el-table-column
                v-for="item in goodsItems"
                :key="item.id"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :formatter="item.formatter"
            ></el-table-column>

            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="data">
                    <el-button
                        type="primary"
                        v-if="canUpdate(data.row)"
                        @click="editGoods(data.row)"
                        size="mini"
                        round
                    >修改</el-button>
                    <el-button
                        type="warning"
                        v-if="canDelete(data.row)"
                        @click="deleteGoods(data.row)"
                        size="mini"
                        round
                    >删除</el-button>
                    <el-button
                        type="success"
                        v-if="canBorrow(data.row)"
                        @click="addBorrow(data.row)"
                        size="mini"
                        round
                    >借用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :title="dialogTitle"
            :visible.sync="editVisable"
            width="400"
            :before-close="handleClose"
        >
            <el-form :model="goodsInfo" :rules="rules" ref="newGoods">
                <el-form-item label="物品名称" label-width="100px" prop="name">
                    <el-input v-model="goodsInfo.name" placeholder="请输入物品的名称"></el-input>
                </el-form-item>
                <el-form-item label="物品编码" label-width="100px" prop="code">
                    <el-input v-model="goodsInfo.code" placeholder="请输入物品的名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="editVisable = false">取 消</el-button>
                <el-button type="primary" @click="addGoods">确 定</el-button>
            </div>
        </el-dialog>

        <borrow-info
            :dialogVisable="addBorrowInfo"
            :borrow_info="borrow_info"
            @closeAdd="closeBorrow"
        ></borrow-info>
    </div>
</template>

<script>
import showColumn from './showColumn';
import BorrowInfo from './BorrowInfo';

export default {
    components: {
        BorrowInfo
    },
    data() {
        var checkCode = (rule, code, callback) => {
            if (!code) {
                callback(new Error('物品编码不能为空'));
            }
            console.log(code);
            let param = { goodsCode: code };
            console.log(param);

            this.$Http.checkGoods(param).then(res => {
                if (res.code !== 1) {
                    callback(new Error(res.msg));
                } else {
                    callback();
                }
            });
        };

        return {
            // 数据源
            goodsList: [],
            // 展示字段
            goodsItems: showColumn,
            // 新增
            editVisable: false,
            goodsInfo: {
                code: '',
                name: ''
            },
            rules: {
                name: [{ required: true, message: '请输入物品名称', trigger: 'blur' }],
                code: [{ validator: checkCode, trigger: 'blur' }]
            },
            dialogTitle: '新增物品',
            addBorrowInfo: false,
            // 借用的物品
            borrow_info: {}
        };
    },

    methods: {
        // 是否可以修改
        canUpdate(row) {
            let recordUserid = row.updateMan.userId;
            // 登录用户
            let loginUserid = JSON.parse(localStorage.getItem('ms_username')).user.userId;
            if (recordUserid === loginUserid) {
                return true;
            } else {
                return false;
            }
        },
        // 是否可以删除
        canDelete(row) {
            let recordUserid = row.updateMan.userId;
            // 登录用户
            let loginUserid = JSON.parse(localStorage.getItem('ms_username')).user.userId;
            if (recordUserid === loginUserid) {
                return true;
            } else {
                return false;
            }
        },
        // 是否可以借用
        canBorrow(row) {
            let recordUserid = row.updateMan.userId;
            // 登录用户
            let loginUserid = JSON.parse(localStorage.getItem('ms_username')).user.userId;
            if (recordUserid === loginUserid) {
                return false;
            } else {
                return true;
            }
        },
        // 关闭借用
        closeBorrow() {
            this.addBorrowInfo = false;
        },
        // 新增借用记录
        addBorrow(row) {
            console.log(row);
            this.addBorrowInfo = true;
            this.borrow_info.goodsInfo = row;
        },
        deleteGoods(row) {
            this.$confirm('确认删除?')
                .then(() => {
                    this.$Http.goodsDelete(row).then(res => {
                        if (res.code === 1) {
                            this.$message.success('删除成功');
                            this.getGoodsList();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
                .catch(() => {});
        },
        addOne() {
            this.editVisable = true;
            this.goodsInfo = {
                name: '',
                code: ''
            };
        },
        editGoods(row) {
            // 修改dialog的标题
            this.dialogTitle = '物品信息编辑';
            this.editVisable = true;
            this.goodsInfo = row;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        // 新增物品
        addGoods() {
            this.$refs.newGoods.validate(valid => {
                this.$Http.goodsAdd(this.goodsInfo).then(res => {
                    if (res.code === 1) {
                        this.editVisable = false;
                        this.getGoodsList();
                        console.log(123);
                    } else {
                        this.$message.error(res.msg);
                        this.editVisable = false;
                    }
                });
            });
        },
        // 重置查询
        getGoodsList() {
            this.$Http.goodsList().then(res => {
                if (res.code === 1) {
                    this.goodsList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    },
    created() {
        console.log(this.goodsItems);
        this.$Http.goodsList().then(res => {
            if (res.code === 1) {
                this.goodsList = res.data;
            } else {
                this.$message.error(res.msg);
            }
        });
    }
};
</script>

<style scoped>
</style>