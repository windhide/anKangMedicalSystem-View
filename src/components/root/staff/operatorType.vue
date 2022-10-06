<template>
    <el-scrollbar>
        <el-table :data="operatorTypeList" max-height="700">
            <el-table-column prop="operatorTypeId" label="药房操作类型Id" width="200" />
            <el-table-column prop="operatorTypeName" label="药房操作类型名称" width="200" />
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

    <el-dialog v-model="EDIT_DIALOG" title="药房操作类型信息修改" width="30%" align-center>
        <el-form :model="operatorTypeEditForm">
            <el-form-item label="药房操作类型Id" :label-width="formLabelWidth">
                <el-input v-model="operatorTypeEditForm.operatorTypeId" disabled />
            </el-form-item>
            <el-form-item label="药房操作类型名字" :label-width="formLabelWidth">
                <el-input v-model="operatorTypeEditForm.operatorTypeName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="药房操作类型信息添加" width="30%" align-center>
        <el-form :model="operatorTypeAddForm">
            <el-form-item label="药房操作类型名字" :label-width="formLabelWidth">
                <el-input v-model="operatorTypeAddForm.operatorTypeName" autocomplete="off" />
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

let operatorTypeList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "operatorType" // 本组件内通用的url

CURRENCY_SELECT("operatorType").then(res =>{
    operatorTypeList.length = 0
    operatorTypeList.push(...res.data)
})

CURRENCY_SELECT("operatorType").then(res =>{
    operatorTypeList.length = 0;
    operatorTypeList.push(...res.data)
})

let operatorTypeEditForm = reactive({
    operatorTypeId: 0,
    operatorTypeName: "",
})
let operatorTypeAddForm = reactive({
    operatorTypeId: 0,
    operatorTypeName: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            operatorTypeList.length = 0
            operatorTypeList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { operatorTypeId: data.operatorTypeId }, CURRENCY_OPERATION_API(operationId, data.operatorTypeName))
    await RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    operatorTypeAddForm.operatorTypeId = NaN;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(operatorTypeAddForm)) {
        await CURRENCY_REQUEST(url, operatorTypeAddForm, CURRENCY_OPERATION_API(operationId, "->" + operatorTypeAddForm.operatorTypeName))
        operatorTypeAddForm = CLEAR_FORM(operatorTypeAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        operatorTypeEditForm.operatorTypeId = data.operatorTypeId
        operatorTypeEditForm.operatorTypeName = data.operatorTypeName
        cacheData = data.operatorTypeName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, operatorTypeEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + operatorTypeEditForm.operatorTypeName))
        RELOAD()
        operatorTypeEditForm = CLEAR_FORM(operatorTypeEditForm)
    }
}
RELOAD()

</script>