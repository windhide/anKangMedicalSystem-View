<template>
    <div>
        <el-space fill wrap :fill-ratio="85" direction="vertical" style="width: 100%">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>尊敬的用户: {{ user.userName }}您好！</span>
                        <el-button class="button" text>修改</el-button>
                    </div>
                </template>
                <div class="text item">
                    序号:&nbsp;&nbsp;&nbsp;&nbsp;{{ user.userId }} <br /><br />
                    昵称:&nbsp;&nbsp;&nbsp;&nbsp;{{user.userName}}  <br /><br />
                    登陆用户名:&nbsp;&nbsp;&nbsp;&nbsp;{{user.userUserName}}  <br /><br />
                    用户性别:&nbsp;&nbsp;&nbsp;&nbsp;{{user.userSex}}  <br /><br />
                    手机号码:&nbsp;&nbsp;&nbsp;&nbsp;{{user.userPhone}}  <br /><br />
                    用户等级:&nbsp;&nbsp;&nbsp;&nbsp;{{user.userLevelTypeId}}  <br /><br />
                    注册时间:&nbsp;&nbsp;&nbsp;&nbsp;{{user.createTime}}  <br /><br />
                </div>
            </el-card>
        </el-space>
    </div>
</template>

<script lang="ts" setup>
import { CURRENCY_SELECT_BY_CONDITION } from '@/apis/FormRudAndSelectApis';
import { reactive, ref } from 'vue';
const URL = "user"
let user:any = reactive({
    userId:0,
    userName:'',
    userUserName:'',
    userPassWord:'',
    userSex:'',
    userPhone:'',
    userLevelTypeId:'',
    createTime:'',
})
user.userId = localStorage.getItem("userId")
user.userUserName = localStorage.getItem("username")

function Reload(){
    CURRENCY_SELECT_BY_CONDITION(URL+"/select/userData",user)?.then(res =>{
        user.userName = res.data.userName;
        user.userSex = res.data.userSex;
        user.userPhone = res.data.userPhone;
        user.userLevelTypeId = res.data.userLevelTypeId;
        user.createTime = res.data.createTime;
    })
}

Reload()

</script>

<style>

</style>