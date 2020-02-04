<template>
    <div class="ms-regist">
        <el-form :model="userDto" :rules="rules" ref="registUser" label-width="100px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="姓名" prop="userName">
                        <el-input style="display:none" type="password"></el-input>

                        <el-input v-model="userDto.userName" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工号" prop="userCode">
                        <!-- 添加这一行是为了,解决注册是会使用浏览器中的密码 -->
                        <el-input style="display:none" type="password"></el-input>
                        <el-input v-model="userDto.userCode" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="密码" prop="password">
                        <el-input style="display:none" type="password"></el-input>

                        <el-input type="password" v-model="userDto.password" maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机" prop="phone">
                        <el-input v-model.number="userDto.phone" maxlength="10"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userDto.email">
                            <template slot="append">.com</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="住址" prop="addr">
                        <el-input v-model="userDto.addr"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="备用联系电话" prop="phoneBack">
                        <el-input v-model.number="userDto.phoneBack"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userDto.gender" placeholder="请选择">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

          

            <el-row :gutter="10">
                <el-col :span="6" :offset="6">
                    <el-button type="primary" @click="createUser(userDto)">立即创建</el-button>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-button @click="rebackLogin()">返回登录</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>


export default {
    data() {

        var  checkAccount = (rule, value, callback)=>{
                if(!value){
                    callback(new Error('账号不能为空!'));
                }
                let param = {userCode:value}
                this.$Http.checkUser(param).then(res => {

                    if(res.code !== 1){
                        callback(new Error(res.msg));
                    }else{
                        callback();
                    }
                });

            };
        return {
           
            // 图片上传的路径
            // uploadUrl:this.$Http.uploadPic.url,
            // 上传图片后存储的路径
            // imageUrl:'',
            rules: {
                // 注册的验证规则
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                userCode: [{ validator:checkAccount, trigger: 'blur' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],

                email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
                addr: [{ required: true, message: '请输入地址', trigger: 'blur' }],

                // phoneBack: [{ required: true, message: '', trigger: 'blur' }],
                gender: [{ required: true, message: '请选择性别', trigger: 'blur' }]
            },
        
            dialogVisible: false
        };
    },
    props: {
        // 注册对象
        userDto: {
            type: Object,
            required: true
        }
    },
    methods: {
        

        // 返回登录
        rebackLogin() {
            console.log(1);
            this.$emit('toggle');
        },
        // 创建用户
        createUser(param) {
            this.$refs.registUser.validate(valid => {
                if (valid) {
                    this.$Http.addUser(param).then(res => {
                        if (res.code === 1) {
                            this.$message.success('注册成功!');
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            });
        },
       
    },
   
};
</script>

<style scoped>
.el-upload--text {
    width: 100px;
    height: 100px;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: red;
    width: 90px;
    height: 90px;
    /* line-height: px; */
    text-align: center;
   padding-top: 30px;
    
}
.avatar {
    width: 90px;
    height: 90px;
    display: block;
}
.ms-regist {
    position: absolute;
    left: 25%;

    top: 25%;
    /* width: 60px; */
    /* margin: -190px 0 0 -175px; */
    border-radius: 5px;
    /* background: rgba(12, 192, 177, 0.3); */
    overflow: hidden;
}

.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.crop-demo {
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn {
    position: relative;
    width: 140px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 90px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
.pre-img {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}

</style>