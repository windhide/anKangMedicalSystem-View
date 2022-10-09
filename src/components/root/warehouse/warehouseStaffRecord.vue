<template>
    <el-scrollbar>
        <el-table :data="warehouseList" max-height="700">
            <el-table-column prop="warehouseStaffRecordId" label="操作Id" width="100" />
            <el-table-column prop="pharmacy.pharmacyName" label="药房" width="100" />
            <el-table-column prop="drugs.drugsName" label="被操作药品" width="350" />
            <el-table-column prop="drugsCount" label="数量" width="350" />
            <el-table-column prop="staff.staffName" label="操作人员" width="100" />
            <el-table-column prop="warehouseType.warehouseTypeId" label="操作类型" width="100" />
            <el-table-column prop="createTime" label="操作时间" width="300" />
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

    <el-dialog v-model="EDIT_DIALOG" title="仓库信息修改" width="30%" align-center>
        <el-form :model="warehouseEditForm">
            <el-form-item label="操作者" :label-width="formLabelWidth">
                <el-select v-model="warehouseEditForm.staffId" placeholder="选择操作者" filterable >
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName" :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="操作药品" :label-width="formLabelWidth">
                <el-select v-model="warehouseEditForm.drugsId" placeholder="选择药品" filterable >
                    <el-option v-for="drugsOption in drugsList" :label="drugsOption.drugsName" :value="drugsOption.drugsId" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属药房" :label-width="formLabelWidth">
                <el-select v-model="warehouseEditForm.pharmacyId" placeholder="选择操作类型" filterable >
                    <el-option v-for="pharmacyOption in pharmacyList" :label="pharmacyOption.pharmacyName" :value="pharmacyOption.pharmacyId" />
                </el-select>
            </el-form-item>
            <el-form-item label="药品数量" :label-width="formLabelWidth">
                <el-input v-model="warehouseEditForm.drugsCount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="操作类型" :label-width="formLabelWidth">
                <el-select v-model="warehouseEditForm.pharmacyId" placeholder="选择操作类型" filterable >
                    <el-option v-for="warehouseTypeOption in warehouseTypeList" :label="warehouseTypeOption.warehouseTypeName" :value="warehouseTypeOption.warehouseTypeId" />
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

    <el-dialog v-model="ADD_DIALOG" title="仓库信息添加" width="30%" align-center>
        <el-form :model="warehouseAddForm">
            <el-form-item label="操作者" :label-width="formLabelWidth">
                <el-select v-model="warehouseAddForm.staffId" placeholder="选择操作者" filterable >
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName" :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="操作药品" :label-width="formLabelWidth">
                <el-select v-model="warehouseAddForm.drugsId" placeholder="选择药品" filterable >
                    <el-option v-for="drugsOption in drugsList" :label="drugsOption.drugsName" :value="drugsOption.drugsId" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属药房" :label-width="formLabelWidth">
                <el-select v-model="warehouseAddForm.pharmacyId" placeholder="选择操作类型" filterable >
                    <el-option v-for="pharmacyOption in pharmacyList" :label="pharmacyOption.pharmacyName" :value="pharmacyOption.pharmacyId" />
                </el-select>
            </el-form-item>
            <el-form-item label="药品数量" :label-width="formLabelWidth">
                <el-input v-model="warehouseAddForm.drugsCount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="操作类型" :label-width="formLabelWidth">
                <el-select v-model="warehouseAddForm.pharmacyId" placeholder="选择操作类型" filterable >
                    <el-option v-for="warehouseTypeOption in warehouseTypeList" :label="warehouseTypeOption.warehouseTypeName" :value="warehouseTypeOption.warehouseTypeId" />
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
import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM, CURRENCY_SELECT, TOSTRING } from "@/apis/FormRudAndSelectApis"

let warehouseList: any = reactive([])
let staffList: any = reactive([])
let drugsList: any = reactive([])
let pharmacyList: any = reactive([])
let warehouseTypeList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "warehouseStaffRecord" // 本组件内通用的url

CURRENCY_SELECT("pharmacy").then(res =>{
    pharmacyList.length = 0
    pharmacyList.push(...res.data)
})

CURRENCY_SELECT("warehouseType").then(res =>{
    warehouseTypeList.length = 0
    warehouseTypeList.push(...res.data)
})

CURRENCY_SELECT("staff").then(res => {
    staffList.length = 0
    staffList.push(...res.data)
})

CURRENCY_SELECT("drugs").then(res => {
    drugsList.length = 0;
    drugsList.push(...res.data)
})

let warehouseEditForm = reactive({
    warehouseId: 0,
    staffId: "",
    drugsId: "",
    pharmacyId: "",
    drugsCount: "",
    warehouseTypeId: "",
})
let warehouseAddForm = reactive({
    staffId: "",
    drugsId: "",
    pharmacyId: "",
    drugsCount: "",
    warehouseTypeId: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            warehouseList.length = 0
            warehouseList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { warehouseId: data.warehouseId }, CURRENCY_OPERATION_API(operationId, TOSTRING(data)))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(warehouseAddForm)) {
        await CURRENCY_REQUEST(url, warehouseAddForm, CURRENCY_OPERATION_API(operationId, "->"+TOSTRING(warehouseAddForm)))
        warehouseAddForm = CLEAR_FORM(warehouseAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        warehouseEditForm.warehouseId = data.warehouseId
        warehouseEditForm.staffId = data.staffId
        warehouseEditForm.drugsId = data.drugsId
        warehouseEditForm.pharmacyId = data.pharmacyId
        warehouseEditForm.drugsCount = data.drugsCount
        warehouseEditForm.warehouseTypeId = data.warehouseTypeId

        cacheData = data.warehouseName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, warehouseEditForm, CURRENCY_OPERATION_API(operationId, "前->" + TOSTRING(data) + ",后->" + TOSTRING(warehouseEditForm)))
        RELOAD()
        warehouseEditForm = CLEAR_FORM(warehouseEditForm)
    }
}
RELOAD()

</script>