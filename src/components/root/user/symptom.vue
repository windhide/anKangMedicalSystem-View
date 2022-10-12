<template>
    <el-scrollbar>
        <el-table :data="symptomList" max-height="700">
            <el-table-column prop="symptomId" label="诊断id" width="120" />
            <el-table-column prop="staff.staffName" label="诊断员工" width="100" />
            <el-table-column prop="user.userName" label="被诊断用户" width="100" />
            <el-table-column prop="symptomContext" label="诊断" width="400" />
            <el-table-column prop="createTime" label="诊断时间" width="300" />
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
        <el-form :model="symptomEditForm">
            <el-form-item label="诊断员工" :label-width="formLabelWidth">
                <el-select v-model="symptomEditForm.staffId" placeholder="选择员工">
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName"
                        :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="被诊断用户" :label-width="formLabelWidth">
                <el-select v-model="symptomEditForm.userId" placeholder="选择用户">
                    <el-option v-for="userOption in userList" :label=userOption.userName :value=userOption.userId />
                </el-select>
            </el-form-item>
            <el-form-item label="诊断" :label-width="formLabelWidth">
                <el-input v-model="symptomEditForm.symptomContext" autocomplete="off" />
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
        <el-form :model="symptomAddForm">
            <el-form-item label="诊断员工" :label-width="formLabelWidth">
                <el-select v-model="symptomAddForm.staffId" placeholder="选择员工">
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName"
                        :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="被诊断用户" :label-width="formLabelWidth">
                <el-select v-model="symptomAddForm.userId" placeholder="选择用户">
                    <el-option v-for="userOption in userList" :label=userOption.userName :value=userOption.userId />
                </el-select>
            </el-form-item>
            <el-form-item label="诊断" :label-width="formLabelWidth">
                <el-input v-model="symptomAddForm.symptomContext" autocomplete="off" />
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

let symptomList: any = reactive([])
let staffList: any = reactive([])
let userList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "symptom" // 本组件内通用的url

CURRENCY_SELECT("staff").then(res => {
    staffList.length = 0;
    staffList.push(...res.data)
})
CURRENCY_SELECT("user").then(res => {
    userList.length = 0;
    userList.push(...res.data)
})

let symptomEditForm = reactive({
    symptomId: 0,
    symptomContext: "",
    userId: "",
    staffId: "",
})
let symptomAddForm = reactive({
    symptomContext: "",
    userId: "",
    staffId: "",
    createTime: "",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            symptomList.length = 0
            symptomList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { symptomId: data.symptomId }, CURRENCY_OPERATION_API(operationId, data.symptomName))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    symptomAddForm.createTime = GET_NOW_DATE_FORMATE()
    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(symptomAddForm)) {
        await CURRENCY_REQUEST(url, symptomAddForm, CURRENCY_OPERATION_API(operationId, "->" + TOSTRING(symptomAddForm)))
        symptomAddForm = CLEAR_FORM(symptomAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        symptomEditForm.symptomId = data.symptomId
        symptomEditForm.symptomContext = data.symptomContext
        symptomEditForm.userId = data.userId
        symptomEditForm.staffId = data.staffId
        cacheData = data.symptomName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, symptomEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + TOSTRING(symptomEditForm)))
        RELOAD()
        symptomEditForm = CLEAR_FORM(symptomEditForm)
    }
}
RELOAD()

</script>