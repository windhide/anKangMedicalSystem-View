<template>
    <el-scrollbar>
        <el-table :data="userList" max-height="700">
            <el-table-column prop="userId" label="用户Id" width="120" />
            <el-table-column prop="userName" label="用户名" width="100" />
            <el-table-column prop="userUserName" label="账号" width="100" />
            <el-table-column prop="userSex" label="性别" width="100" />
            <el-table-column prop="userPhone" label="电话号码" width="150" />
            <el-table-column prop="userLevelType.userLevelTypeName" label="用户等级" width="100" />
            <el-table-column prop="createTime" label="注册时间" width="300" />
            <el-table-column fixed="right" label="操作">
                <template #header>
                    操作
                    <el-button type="success" :icon="StarFilled" @click="ADD_DIALOG = true">添加</el-button>
                </template>
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle @click="CURRENCY_CRUD(URL,scope.row,2)" />
                    <el-button type="danger" :icon="Delete" circle @click="CURRENCY_CRUD(URL,scope.row,3)" />
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>

    <el-dialog v-model="EDIT_DIALOG" title="用户信息修改" width="30%" align-center>
        <el-form :model="userEditForm">
            <el-form-item label="用户名字" :label-width="formLabelWidth">
                <el-input v-model="userEditForm.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户账号" :label-width="formLabelWidth">
                <el-input v-model="userEditForm.userUserName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="userEditForm.userPassWord" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户性别" :label-width="formLabelWidth">
                <el-select v-model="userEditForm.userSex" placeholder="选择职位">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="用户电话" :label-width="formLabelWidth">
                <el-input v-model="userEditForm.userPhone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户等级" :label-width="formLabelWidth">
                <el-select v-model="userEditForm.userLevelTypeId" placeholder="选择职位">
                    <el-option v-for="userLevelTypeOption in userLevelTypeList" :label=userLevelTypeOption.userLevelTypeName :value=userLevelTypeOption.userLevelTypeId />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="用户信息添加" width="30%" align-center>
        <el-form :model="userAddForm">
            <el-form-item label="用户名字" :label-width="formLabelWidth">
                <el-input v-model="userAddForm.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户账号" :label-width="formLabelWidth">
                <el-input v-model="userAddForm.userUserName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="userAddForm.userPassWord" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户性别" :label-width="formLabelWidth">
                <el-select v-model="userAddForm.userSex" placeholder="选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>            
            </el-form-item>
            <el-form-item label="用户电话" :label-width="formLabelWidth">
                <el-input v-model="userAddForm.userPhone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户等级" :label-width="formLabelWidth">
                <el-select v-model="userAddForm.userLevelTypeId" placeholder="选择职位">
                    <el-option v-for="userLevelTypeOption in userLevelTypeList" :label=userLevelTypeOption.userLevelTypeName :value=userLevelTypeOption.userLevelTypeId />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="ADD_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',1)">添加</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Delete, Edit, StarFilled } from '@element-plus/icons-vue'
import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM, CURRENCY_SELECT } from "@/apis/FormRudAndSelectApis"

let userList: any = reactive([])
let userLevelTypeList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "user" // 本组件内通用的url

CURRENCY_SELECT("userLevelType").then(res =>{
    userLevelTypeList.length = 0;
    userLevelTypeList.push(...res.data)
})

let userEditForm = reactive({
    userId: 0,
    userName: "",
    userUserName: "",
    userPassWord: "",
    userSex: "",
    userPhone: "",
    userLevelTypeId: "",
})
let userAddForm = reactive({
    userName: "",
    userUserName: "",
    userPassWord: "",
    userSex: "",
    userPhone: "",
    userLevelTypeId: "",
    createTime:"",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            userList.length = 0
            userList.push(...res.data)
        })
    }, 200)
}

async function CURRENCY_CRUD(url: String, data: any, operationId: Number) {
    switch (operationId) {
        case 1: // 1是新增
            await ADD(url, data, operationId)
            break;
        case 2: // 2是修改
            await EDIT(url, data, operationId)
            break;
        case 3: // 3是删除
            await DELETE(url, data, operationId)
            break;
        default:
            console.error("错误的操作！");
            return
    }
}

async function DELETE(url: String, data: any, operationId: Number) {
    await CURRENCY_REQUEST(url, { userId: data.userId }, CURRENCY_OPERATION_API(operationId, data.userName))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    userAddForm.createTime = GET_NOW_DATE_FORMATE()
    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(userAddForm)) {
        await CURRENCY_REQUEST(url, userAddForm, CURRENCY_OPERATION_API(operationId, "->" + userAddForm.userName))
        userAddForm = CLEAR_FORM(userAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        userEditForm.userId = data.userId
        userEditForm.userName = data.userName
        userEditForm.userUserName = data.userUserName
        userEditForm.userSex = data.userSex
        userEditForm.userPhone = data.userPhone
        userEditForm.userLevelTypeId = data.userLevelTypeId

        cacheData = data.userName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, userEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + userEditForm.userName))
        RELOAD()
        userEditForm = CLEAR_FORM(userEditForm)
    }
}
RELOAD()

</script>