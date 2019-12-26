<template>
    <div>
        <div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" ref="city" :rules="rules" :model="city" >
            <el-form-item label="名称" prop="name">
                <el-input v-model="city.name"></el-input>
            </el-form-item>
            <el-form-item label="地址编码" prop="adCode">
                <el-input v-model="city.adCode"></el-input>
            </el-form-item>
            <el-form-item label="城市编码" prop="cityCode">
                <el-input v-model="city.cityCode"></el-input>
            </el-form-item>
            <el-form-item label="Level" prop="level">
                <el-select v-model="city.level" placeholder="请选择">
                    <el-option label="省" value="province"></el-option>
                    <el-option label="市" value="city"></el-option>
                    <el-option label="区" value="district"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经纬度" prop="center" >
                <el-input v-model="city.center" > </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('city')">立即创建</el-button>
                <el-button @click="resetForm('city')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'AddRow',
    data() {
        return {
            city: {
                name: '',
                adCode: '',
                Level: '',
                center:'',
                cityCode:''

            },
            rules: {
                name: [
                    { required: true, message: '请输入城市名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                adCode: [
                    { required: true, message: '请输入地区编码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                cityCode: [
                    { required: true, message: '请输入城市编码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                level: [
                    { required: true, message: '请至少选择一个level', trigger: 'blur' }
                ],
                // level: [{ type: 'array', required: true, message: '请至少选择一个level', trigger: 'change' }],
                center: [
                    { required: true, message: '请输入经纬度信息', trigger: 'blur' },
                    { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    
    methods: {
        submitForm(req) {
            this.$refs[req].validate(valid => {
                if(valid){
                    this.$Http.addCity(this.city);
                    console.log(this.city);
                     this.$bus.emit('showAddCity');
                    alert('提交成功');
                }else{
                    console.log("提交失败!");
                    return false;
                }
            });
           
            
        },
        resetForm(req){
            // console.log(req);
            this.$refs[req].resetFields();

           
        }
    }
};
</script>

<style lang="scss" scoped>
</style>