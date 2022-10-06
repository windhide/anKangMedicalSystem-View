<template>
    <el-scrollbar>
        <el-table :data="pharmacyList" max-height="700">
            <el-table-column prop="pharmacyId" label="药房Id" width="100" />
            <el-table-column prop="pharmacyName" label="药房名字" width="100" />
            <el-table-column prop="pharmacyPhone" label="药房联系电话" width="300" />
            <el-table-column prop="pharmacyAddress" label="药房地址" width="300" />
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

    <el-dialog v-model="EDIT_DIALOG" title="药房信息修改" width="30%" align-center>
        <el-form :model="pharmacyEditForm">
            <el-form-item label="药房名字" :label-width="formLabelWidth">
                <el-input v-model="pharmacyEditForm.pharmacyName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药房联系电话" :label-width="formLabelWidth">
                <el-input v-model="pharmacyEditForm.pharmacyPhone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药房地址" :label-width="formLabelWidth">
                <el-input v-model="pharmacyEditForm.pharmacyAddress" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="药房信息添加" width="30%" align-center>
        <el-form :model="pharmacyAddForm">
            <el-form-item label="药房名字" :label-width="formLabelWidth">
                <el-input v-model="pharmacyAddForm.pharmacyName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药房联系电话" :label-width="formLabelWidth">
                <el-input v-model="pharmacyAddForm.pharmacyPhone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药房地址" :label-width="formLabelWidth">
                <el-input v-model="pharmacyAddForm.pharmacyAddress" autocomplete="off" />
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

let pharmacyList: any = reactive([])
let authorityList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "pharmacy" // 本组件内通用的url

CURRENCY_SELECT("pharmacy").then(res =>{
    pharmacyList.length = 0
    pharmacyList.push(...res.data)
})

CURRENCY_SELECT("authority").then(res =>{
    authorityList.length = 0;
    authorityList.push(...res.data)
})

let pharmacyEditForm = reactive({
    pharmacyId: 0,
    pharmacyName: "",
    pharmacyPhone: "",
    pharmacyAddress: "",
})
let pharmacyAddForm = reactive({
    pharmacyId: 0,
    pharmacyName: "",
    pharmacyPhone: "",
    pharmacyAddress: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            pharmacyList.length = 0
            pharmacyList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { pharmacyId: data.pharmacyId }, CURRENCY_OPERATION_API(operationId, data.pharmacyName))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    pharmacyAddForm.pharmacyId = NaN;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(pharmacyAddForm)) {
        await CURRENCY_REQUEST(url, pharmacyAddForm, CURRENCY_OPERATION_API(operationId, "->" + pharmacyAddForm.pharmacyName))
        pharmacyAddForm = CLEAR_FORM(pharmacyAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        pharmacyEditForm.pharmacyId = data.pharmacyId
        pharmacyEditForm.pharmacyName = data.pharmacyName
        pharmacyEditForm.pharmacyPhone = data.pharmacyPhone
        pharmacyEditForm.pharmacyAddress = data.pharmacyAddress
        cacheData = data.pharmacyName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, pharmacyEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + pharmacyEditForm.pharmacyName))
        RELOAD()
        pharmacyEditForm = CLEAR_FORM(pharmacyEditForm)
    }
}
RELOAD()

</script>