<template>
    <div>
        <el-dialog title="借用" :visible.sync="dialogVisable">
            <el-form :model="borrow_info">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="借用理由:">
                            <el-input v-model="borrow_info.borrowReason" placeholder="请填写借用原因"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="预计归还">
                            <el-date-picker
                                v-model="borrow_info.expectReturn"
                                type="datetime"
                                placeholder="选择日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="closeMe">取 消</el-button>
                <el-button type="primary" @click="submitBorrow(borrow_info)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        borrow_info: {
            type: Object,
            required: true
        },
        dialogVisable:{
            type:Boolean,
            required:true,
        }
    },
    methods: {
        submitBorrow(borrow_info) {
            this.$Http.addOneBorrow(borrow_info).then(res => {
                if (res.code === 1) {
                    this.$message.success('添加成功!');
                    this.closeMe();
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 关闭编辑窗口
        closeMe() {
            // 触发父组件修改状态
            this.$emit('closeAdd');
        }
    }
};
</script>

<style scoped>
</style>