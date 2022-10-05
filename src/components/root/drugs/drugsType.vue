<template>
    <el-scrollbar>
        <el-table :data="drugsType" max-height="700">
            <!-- <el-table-column prop="drugsId" label="药Id" width="100" /> -->
            <el-table-column prop="drugsTypeId" label="序号" width="350" />
            <el-table-column prop="drugsTypeName" label="药品类型名" width="350" />
            <el-table-column prop="drugsTypeCreatTime" label="创建时间" width="350" />
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

    <el-dialog v-model="EDIT_DIALOG" title="药品类型修改" width="30%" align-center>
        <el-form :model="drugsTypeEditForm">
            <el-form-item label="药品类型" :label-width="formLabelWidth">
                <el-input v-model="drugsTypeEditForm.drugsTypeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="drugsTypeEditForm.drugsTypeCreatTime" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="药物类型添加" width="30%" align-center>
        <el-form :model="drugsTypeAddForm">
            <el-form-item label="药品类型" :label-width="formLabelWidth">
                <el-input v-model="drugsTypeAddForm.drugsTypeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="drugsTypeAddForm.drugsTypeCreatTime" disabled />
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
import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM } from "@/apis/FormRudApis"
import { QUERY_DRUGS_TYPE } from "@/apis/Types_Request"


let drugsType: any = reactive([])

const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = 'drugsType' // 本组件内通用的url   
let cacheData = ""

let drugsTypeEditForm = reactive({
    drugsTypeId: 0,
    drugsTypeName: "",
    drugsTypeCreatTime: "",
})
let drugsTypeAddForm = reactive({
    drugsTypeId: 0,
    drugsTypeName: "",
    drugsTypeCreatTime: "",
})


function RELOAD() {
    setTimeout((_: any) => {
        QUERY_DRUGS_TYPE().then(res => {
            drugsType.length = 0
            drugsType.push(...res.data)
        })
    }, 100)
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
    await CURRENCY_REQUEST(url, { drugsTypeId: data.drugsTypeId }, CURRENCY_OPERATION_API(operationId, data.drugsTypeName))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    drugsTypeAddForm.drugsTypeId = NaN;
    drugsTypeAddForm.drugsTypeCreatTime = GET_NOW_DATE_FORMATE();

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(drugsTypeAddForm)) {
        await CURRENCY_REQUEST(url, drugsTypeAddForm, CURRENCY_OPERATION_API(operationId, "->" + drugsTypeAddForm.drugsTypeName))
        drugsTypeAddForm = CLEAR_FORM(drugsTypeAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        drugsTypeEditForm.drugsTypeId = data.drugsTypeId
        drugsTypeEditForm.drugsTypeName = data.drugsTypeName
        drugsTypeEditForm.drugsTypeCreatTime = data.drugsTypeCreatTime
        cacheData = data.drugsTypeName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, drugsTypeEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + drugsTypeEditForm.drugsTypeName))
        RELOAD()
        drugsTypeEditForm = CLEAR_FORM(drugsTypeEditForm)
    }
}

QUERY_DRUGS_TYPE().then(res => {
    drugsType.length = 0
    drugsType.push(...res.data)
})

</script>