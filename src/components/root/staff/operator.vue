<template>
    <el-scrollbar>
        <el-table :data="operatorList" max-height="700">
            <el-table-column prop="operatorId" label="操作Id" width="100" />
            <el-table-column prop="staff.staffName" label="操作者" width="100" />
            <el-table-column prop="drugs.drugsName" label="被操作药品" width="350" />
            <el-table-column prop="operatorType.operatorTypeName" label="操作类型" width="100" />
            <el-table-column prop="operatorCreatTime" label="操作时间" width="300" />
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

    <el-dialog v-model="EDIT_DIALOG" title="操作信息修改" width="30%" align-center>
        <el-form :model="operatorEditForm">
            <el-form-item label="操作者" :label-width="formLabelWidth">
                <el-select v-model="operatorEditForm.staffId" placeholder="选择操作者" filterable >
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName" :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="被操作药品" :label-width="formLabelWidth">
                <el-select v-model="operatorEditForm.drugsId" placeholder="选择药品" filterable >
                    <el-option v-for="drugsOption in drugsList" :label="drugsOption.drugsName" :value="drugsOption.drugsId" />
                </el-select>
            </el-form-item>
            <el-form-item label="操作类型" :label-width="formLabelWidth">
                <el-select v-model="operatorEditForm.operatorTypeId" placeholder="选择操作类型" filterable >
                    <el-option v-for="operatorTypeOption in operatorTypeList" :label="operatorTypeOption.operatorTypeName" :value="operatorTypeOption.operatorTypeId" />
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="operatorEditForm.operatorCreatTime" autocomplete="off" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD(URL,'null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="员工信息添加" width="30%" align-center>
        <el-form :model="operatorAddForm">
            <el-form-item label="操作者" :label-width="formLabelWidth">
                <el-select v-model="operatorAddForm.staffId" placeholder="选择操作者" filterable >
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName" :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="被操作药品" :label-width="formLabelWidth">
                <el-select v-model="operatorAddForm.drugsId" placeholder="选择药品" filterable >
                    <el-option v-for="drugsOption in drugsList" :label="drugsOption.drugsName" :value="drugsOption.drugsId" />
                </el-select>
            </el-form-item>
            <el-form-item label="操作类型" :label-width="formLabelWidth">
                <el-select v-model="operatorAddForm.operatorTypeId" placeholder="选择操作类型" filterable >
                    <el-option v-for="operatorTypeOption in operatorTypeList" :label="operatorTypeOption.operatorTypeName" :value="operatorTypeOption.operatorTypeId" />
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="operatorAddForm.operatorCreatTime" autocomplete="off" disabled />
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

let operatorList: any = reactive([])
let staffList: any = reactive([])
let drugsList: any = reactive([])
let operatorTypeList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "operator" // 本组件内通用的url

CURRENCY_SELECT("operatorType").then(res =>{
    operatorTypeList.length = 0
    operatorTypeList.push(...res.data)
})

CURRENCY_SELECT("staff").then(res => {
    staffList.length = 0
    staffList.push(...res.data)
})

CURRENCY_SELECT("drugs").then(res => {
    drugsList.length = 0;
    drugsList.push(...res.data)
})

let operatorEditForm = reactive({
    operatorId: 0,
    staffId: "",
    drugsId: "",
    operatorTypeId: "",
    operatorCreatTime: "",
})
let operatorAddForm = reactive({
    operatorId: 0,
    staffId: "",
    drugsId: "",
    operatorTypeId: "",
    operatorCreatTime: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            operatorList.length = 0
            operatorList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { operatorId: data.operatorId }, CURRENCY_OPERATION_API(operationId, TOSTRING(data)))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    operatorAddForm.operatorId = NaN;
    operatorAddForm.operatorCreatTime = GET_NOW_DATE_FORMATE();

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(operatorAddForm)) {
        await CURRENCY_REQUEST(url, operatorAddForm, CURRENCY_OPERATION_API(operationId, "->"+TOSTRING(operatorAddForm)))
        operatorAddForm = CLEAR_FORM(operatorAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        operatorEditForm.operatorId = data.operatorId
        operatorEditForm.staffId = data.staffId
        operatorEditForm.drugsId = data.drugsId
        operatorEditForm.operatorTypeId = data.operatorTypeId
        operatorEditForm.operatorCreatTime = data.operatorCreatTime

        cacheData = data.operatorName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, operatorEditForm, CURRENCY_OPERATION_API(operationId, "前->" + TOSTRING(data) + ",后->" + TOSTRING(operatorEditForm)))
        RELOAD()
        operatorEditForm = CLEAR_FORM(operatorEditForm)
    }
}
RELOAD()

</script>