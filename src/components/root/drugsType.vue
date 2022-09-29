<template>
    <el-scrollbar>
        <el-table :data="drugsType" max-height="700">
            <!-- <el-table-column prop="drugsId" label="药Id" width="100" /> -->
            <el-table-column prop="drugsTypeId" label="药名" width="350" />
            <el-table-column fixed="right" label="操作">
                <template #header>
                    操作
                    <el-button type="success" :icon="StarFilled" @click="ADD_DIALOG = true">添加</el-button>
                </template>
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle @click="CURRENCY_CRUD('drugsType',scope.row,2)" />
                    <el-button type="danger" :icon="Delete" circle @click="CURRENCY_CRUD('drugsType',scope.row,3)" />
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
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
let cacheData = ""

let drugsEditForm = reactive({
    drugsId: 0,
    drugsName: "",
    drugsTypeId: 0,
    drugsSpecifications: "",
    drugsUnitid: 0,
    drugsPlace: "",
    drugsOriginPrice: 0,
    drugsRetailPrice: 0,
    drugsCreatTime: "",
})
let drugsAddForm = reactive({
    drugsId: 0,
    drugsName: "",
    drugsTypeId: "",
    drugsSpecifications: "",
    drugsUnitid: "",
    drugsPlace: "",
    drugsOriginPrice: 0,
    drugsRetailPrice: 0,
    drugsCreatTime: "",
})


function RELOAD() {
    setTimeout((_: any) => {
        QUERY_DRUGS_TYPE().then(res => {
            drugsType.push(...res.data)
        })
    }, 100)
}

console.log(drugsType)

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
    await CURRENCY_REQUEST(url, { drugsId: data.drugsId }, CURRENCY_OPERATION_API(operationId, data.drugsName))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    drugsAddForm.drugsId = NaN;
    drugsAddForm.drugsCreatTime = GET_NOW_DATE_FORMATE();

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(drugsAddForm)) {
        await CURRENCY_REQUEST(url, drugsAddForm, CURRENCY_OPERATION_API(operationId, "->" + drugsAddForm.drugsName))
        drugsAddForm = CLEAR_FORM(drugsAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        drugsEditForm.drugsId = data.drugsId
        drugsEditForm.drugsName = data.drugsName
        drugsEditForm.drugsTypeId = data.drugsTypeId
        drugsEditForm.drugsSpecifications = data.drugsSpecifications
        drugsEditForm.drugsUnitid = data.drugsUnitid
        drugsEditForm.drugsPlace = data.drugsPlace
        drugsEditForm.drugsOriginPrice = data.drugsOriginPrice
        drugsEditForm.drugsRetailPrice = data.drugsRetailPrice
        drugsEditForm.drugsCreatTime = data.drugsCreatTime

        cacheData = data.drugsName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, drugsEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + drugsEditForm.drugsName))
        RELOAD()
        drugsEditForm = CLEAR_FORM(drugsEditForm)
    }
}

</script>