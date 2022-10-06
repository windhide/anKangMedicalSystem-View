<template>
    <el-scrollbar>
        <el-table :data="warehouseTypeList" max-height="700">
            <el-table-column prop="warehouseTypeId" label="仓库操作类型Id" width="200" />
            <el-table-column prop="warehouseTypeName" label="仓库操作类型名称" width="200" />
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

    <el-dialog v-model="EDIT_DIALOG" title="仓库操作类型信息修改" width="30%" align-center>
        <el-form :model="warehouseTypeEditForm">
            <el-form-item label="仓库操作类型Id" :label-width="formLabelWidth">
                <el-input v-model="warehouseTypeEditForm.warehouseTypeId" disabled />
            </el-form-item>
            <el-form-item label="仓库操作类型名字" :label-width="formLabelWidth">
                <el-input v-model="warehouseTypeEditForm.warehouseTypeName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="仓库操作类型信息添加" width="30%" align-center>
        <el-form :model="warehouseTypeAddForm">
            <el-form-item label="仓库操作类型名字" :label-width="formLabelWidth">
                <el-input v-model="warehouseTypeAddForm.warehouseTypeName" autocomplete="off" />
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

let warehouseTypeList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '150px' // dialog中组件的宽度
const URL = "warehouseType" // 本组件内通用的url

CURRENCY_SELECT("warehouseType").then(res =>{
    warehouseTypeList.length = 0
    warehouseTypeList.push(...res.data)
})

CURRENCY_SELECT("warehouseType").then(res =>{
    warehouseTypeList.length = 0;
    warehouseTypeList.push(...res.data)
})

let warehouseTypeEditForm = reactive({
    warehouseTypeId: 0,
    warehouseTypeName: "",
})
let warehouseTypeAddForm = reactive({
    warehouseTypeId: 0,
    warehouseTypeName: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            warehouseTypeList.length = 0
            warehouseTypeList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { warehouseTypeId: data.warehouseTypeId }, CURRENCY_OPERATION_API(operationId, data.warehouseTypeName))
    await RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    warehouseTypeAddForm.warehouseTypeId = NaN;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(warehouseTypeAddForm)) {
        await CURRENCY_REQUEST(url, warehouseTypeAddForm, CURRENCY_OPERATION_API(operationId, "->" + warehouseTypeAddForm.warehouseTypeName))
        warehouseTypeAddForm = CLEAR_FORM(warehouseTypeAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        warehouseTypeEditForm.warehouseTypeId = data.warehouseTypeId
        warehouseTypeEditForm.warehouseTypeName = data.warehouseTypeName
        cacheData = data.warehouseTypeName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, warehouseTypeEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + warehouseTypeEditForm.warehouseTypeName))
        RELOAD()
        warehouseTypeEditForm = CLEAR_FORM(warehouseTypeEditForm)
    }
}
RELOAD()

</script>