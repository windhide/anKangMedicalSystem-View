<template>
    <el-scrollbar>
        <el-table :data="authorityList" max-height="700">
            <el-table-column prop="authorityId" label="权限Id" width="100" />
            <el-table-column prop="authorityName" label="权限名称" width="100" />
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

    <el-dialog v-model="EDIT_DIALOG" title="权限信息修改" width="30%" align-center>
        <el-form :model="authorityEditForm">
            <el-form-item label="权限Id" :label-width="formLabelWidth">
                <el-input v-model="authorityEditForm.authorityId" disabled />
            </el-form-item>
            <el-form-item label="权限名字" :label-width="formLabelWidth">
                <el-input v-model="authorityEditForm.authorityName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="权限添加" width="30%" align-center>
        <el-form :model="authorityAddForm">
            <el-form-item label="权限名字" :label-width="formLabelWidth">
                <el-input v-model="authorityAddForm.authorityName" autocomplete="off" />
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

let authorityList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "authority" // 本组件内通用的url

CURRENCY_SELECT("authority").then(res =>{
    authorityList.length = 0
    authorityList.push(...res.data)
})

CURRENCY_SELECT("authority").then(res =>{
    authorityList.length = 0;
    authorityList.push(...res.data)
})

let authorityEditForm = reactive({
    authorityId: 0,
    authorityName: "",
})
let authorityAddForm = reactive({
    authorityId: 0,
    authorityName: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT("authority").then(res => {
            authorityList.length = 0
            authorityList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { authorityId: data.authorityId }, CURRENCY_OPERATION_API(operationId, data.authorityName))
    await RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    authorityAddForm.authorityId = NaN;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(authorityAddForm)) {
        await CURRENCY_REQUEST(url, authorityAddForm, CURRENCY_OPERATION_API(operationId, "->" + authorityAddForm.authorityName))
        authorityAddForm = CLEAR_FORM(authorityAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        authorityEditForm.authorityId = data.authorityId
        authorityEditForm.authorityName = data.authorityName
        cacheData = data.authorityName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, authorityEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + authorityEditForm.authorityName))
        RELOAD()
        authorityEditForm = CLEAR_FORM(authorityEditForm)
    }
}
RELOAD()

</script>