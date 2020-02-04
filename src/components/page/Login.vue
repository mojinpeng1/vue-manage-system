<template>
    <div class="login-wrap" >
        <div class="ms-login" v-show="isLogin">
            <div class="ms-title">物品租借管理系统</div>
            <el-form
                :model="param"
                :rules="rulesLogin"
                ref="loginUser"
                label-width="0px"
                class="ms-content"
            >
                <el-form-item prop="loginName">
                    <el-input v-model="param.loginName" placeholder="请输入用户名" prefix-icon="el-icon-lx-people">
                      
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()" prefix-icon="el-icon-lx-lock"
                    >
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>

                <div class="login-btn">
                    <el-button type="primary" @click="toggleRegist()">注册</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 。</p> -->
            </el-form>
        </div>
<div v-show="!isLogin">
        <!-- 注册 -->
        <user-regist  :userDto="registUser" @toggle="toggleRegist"></user-regist>
</div>
        
    </div>
</template>

<script>
import { Message } from 'element-ui';
import UserRegist from './user/UserRegist'
export default {
    components:{
        UserRegist
    },
    data: function() {
        return {
            param: {
                loginName: '',
                password: ''
            },
            rulesLogin: {
                loginName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            
            registUser: {
                addr: '',
                email: '',
                gender: '',
                password: '',
                phone: '',
                phoneBack: '',
                userCode: '',
                userName: ''
            },
            isLogin:true
        };
    },
    methods: {
        resetForm(formName) {
            this.$nextTick(() => {
                this.$refs.formName.resetFields();
            });
        },
        toggleRegist() {
           
            this.isLogin = !this.isLogin;
            // 将用户信息清空
            
                 

        },
        submitForm() {
            this.$refs.loginUser.validate(valid => {
                console.log(this.$refs.loginUser)
                if (valid) {
                    this.$Http.login(this.param).then(res => {
                        if (res.code === 1) {
                            localStorage.setItem('ms_username',  JSON.stringify(res.data));
                            this.$router.replace('/');
                        }else{
                            this.$message.error(res.msg);
                        }
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>