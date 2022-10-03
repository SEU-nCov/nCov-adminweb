<template>
    <div>
        <el-form 
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="100px"
            class="login-container"
        >
            <h3 class="login_title">系统登陆</h3>
          <el-form-item 
            label="用户名"
            label-width="80px"
            prop="manager_id"
            class="manager_id"
          >
            <el-input
            type="input"
            v-model="form.manager_id"
            autocomplete="off"
            placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item 
            label="密码"
            label-width="80px"
            prop="password"
          >
            <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登陆</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {adminLogin, getMenu} from '../../api/data'
import { TextToCode } from 'element-china-area-data'
// import Mock from 'mockjs'
    export default{
        name:'login',
        data (){
            return {
                form:{

                },
                rules:{
                    manager_id:[
                        {required: true, message:'请输入用户名', trigger: 'blur'},
                        {
                            min:3,
                            message:"用户名长度不能小于3位",
                            trigger:'blur'
                        }
                    ],
                    password:[
                        {required: true, message:'请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            login(){
                if(this.form.manager_id!="10000")
                {
                    adminLogin(this.form).then((res)=>{
                        console.log(res);
                        //console.log(res.data.data.hotel_name);
                        this.$store.state.hotel_id = res.data.data.hotel_id;
                        this.$store.state.hotel_name = res.data.data.hotel_name;
                        this.$store.state.hotel_area = [
                        TextToCode[res.data.data.hotel_province].code,
                        TextToCode[res.data.data.hotel_province][res.data.data.hotel_city].code,
                        TextToCode[res.data.data.hotel_province][res.data.data.hotel_city][res.data.data.hotel_district].code
                        ];
                        this.$store.state.hotel_address = res.data.data.hotel_address;
                        this.$store.state.hotel_star = res.data.data.hotel_star;
                        this.$store.state.hotel_classification = res.data.data.hotel_classfication;
                        this.$store.state.hotel_longitude = res.data.data.hotel_longitude;
                        this.$store.state.hotel_latitude = res.data.data.hotel_latitude;
                        this.$store.state.hotel_parking = res.data.data.hotel_parking;
                        this.$store.state.hotel_meeting = res.data.data.hotel_meeting;
                        this.$store.state.hotel_photo = res.data.data.hotel_photo;
                        this.$store.state.hotel_phone = res.data.data.hotel_phone;
                    })
                }
                getMenu(this.form).then((res)=>{
                    console.log(res)
                    if(res.data.code==200){ 
                        this.$store.commit('clearMenu') 
                        this.$store.commit('setMenu',res.data.menu)
                        this.$store.commit('setToken',res.data.token)
                        this.$store.commit('addMenu',this.$router)
                        this.$router.push({name:'home'})
                    }else{
                        this.$message.warning(res.data.msg)
                    }
                })
                // const token=Mock.Random.guid()
                // this.$store.commit('setToken',token)
                // this.$router.push({name:'home'})
            }
        }
    }
</script>

<style lang="less" scoped>
.login-container{
    border-radius:15px ;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color:#fff ;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.login_submit{
    margin: 10px auto 0px 25px;
}
</style>