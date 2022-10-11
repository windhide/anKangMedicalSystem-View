<template>
    <el-scrollbar>
        <el-table :data="userLevelTypeList" max-height="700">
            <el-table-column prop="userLevelTypeId" label="用户VIP等级信息类型Id" width="200" />
            <el-table-column prop="userLevelTypeName" label="用户VIP等级信息类型名称" width="200" />
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

    <el-dialog v-model="EDIT_DIALOG" title="VIP类型信息修改" width="30%" align-center>
        <el-form :model="userLevelTypeEditForm">
            <el-form-item label="用户VIP等级信息类型Id" :label-width="formLabelWidth">
                <el-input v-model="userLevelTypeEditForm.userLevelTypeId" disabled />
            </el-form-item>
            <el-form-item label="用户VIP等级信息类型名字" :label-width="formLabelWidth">
                <el-input v-model="userLevelTypeEditForm.userLevelTypeName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="用户VIP等级信息类型信息添加" width="30%" align-center>
        <el-form :model="userLevelTypeAddForm">
            <el-form-item label="用户VIP等级信息类型名字" :label-width="formLabelWidth">
                <el-input v-model="userLevelTypeAddForm.userLevelTypeName" autocomplete="off" />
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
import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, CLEAR_FORM, CURRENCY_SELECT } from "@/apis/FormRudAndSelectApis"

let userLevelTypeList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '200px' // dialog中组件的宽度
const URL = "userLevelType" // 本组件内通用的url

CURRENCY_SELECT("userLevelType").then(res =>{
    userLevelTypeList.length = 0
    userLevelTypeList.push(...res.data)
})

CURRENCY_SELECT("userLevelType").then(res =>{
    userLevelTypeList.length = 0;
    userLevelTypeList.push(...res.data)
})

let userLevelTypeEditForm = reactive({
    userLevelTypeId: 0,
    userLevelTypeName: "",
})
let userLevelTypeAddForm = reactive({
    userLevelTypeId: 0,
    userLevelTypeName: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            userLevelTypeList.length = 0
            userLevelTypeList.push(...res.data)
        })
    }, 300)
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
    await CURRENCY_REQUEST(url, { userLevelTypeId: data.userLevelTypeId }, CURRENCY_OPERATION_API(operationId, data.userLevelTypeName))
    await RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    userLevelTypeAddForm.userLevelTypeId = NaN;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(userLevelTypeAddForm)) {
        await CURRENCY_REQUEST(url, userLevelTypeAddForm, CURRENCY_OPERATION_API(operationId, "->" + userLevelTypeAddForm.userLevelTypeName))
        userLevelTypeAddForm = CLEAR_FORM(userLevelTypeAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        userLevelTypeEditForm.userLevelTypeId = data.userLevelTypeId
        userLevelTypeEditForm.userLevelTypeName = data.userLevelTypeName
        cacheData = data.userLevelTypeName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, userLevelTypeEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + userLevelTypeEditForm.userLevelTypeName))
        RELOAD()
        userLevelTypeEditForm = CLEAR_FORM(userLevelTypeEditForm)
    }
}
RELOAD()

</script>