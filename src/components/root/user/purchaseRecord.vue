<template>
    <el-scrollbar>
        <el-table :data="purchaseRecordList" max-height="700">
            <el-table-column prop="purchaseRecordId" label="订单Id" width="150" />
            <el-table-column prop="user.userName" label="购买者" width="100" />
            <el-table-column prop="staff.staffName" label="销售员工" width="100" />
            <el-table-column prop="drugs.drugsName" label="药品" width="300" />
            <el-table-column prop="purchaseCount" label="数量" width="100" />
            <el-table-column prop="createTime" label="日期" width="250" />
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
        <el-form :model="purchaseRecordEditForm">
            <el-form-item label="购买者" :label-width="formLabelWidth">
                <el-select v-model="purchaseRecordEditForm.userId" placeholder="选择购买者">
                    <el-option v-for="userOption in userList" :label="userOption.userName" :value="userOption.userId" />
                </el-select>
            </el-form-item>
            <el-form-item label="销售员工" :label-width="formLabelWidth">
                <el-select v-model="purchaseRecordEditForm.staffId" placeholder="选择员工">
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName" :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="药品" :label-width="formLabelWidth">
                <el-select v-model="purchaseRecordEditForm.drugsId" placeholder="选择药品">
                    <el-option v-for="drugsOption in drugsList" :label="drugsOption.drugsName" :value="drugsOption.drugsId" />
                </el-select>            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="purchaseRecordEditForm.purchaseCount" autocomplete="off" />
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
        <el-form :model="purchaseRecordAddForm">
            <el-form-item label="购买者" :label-width="formLabelWidth">
                <el-select v-model="purchaseRecordAddForm.userId" placeholder="选择购买者">
                    <el-option v-for="userOption in userList" :label="userOption.userName" :value="userOption.userId" />
                </el-select>
            </el-form-item>
            <el-form-item label="销售员工" :label-width="formLabelWidth">
                <el-select v-model="purchaseRecordAddForm.staffId" placeholder="选择员工">
                    <el-option v-for="staffOption in staffList" :label="staffOption.staffName" :value="staffOption.staffId" />
                </el-select>
            </el-form-item>
            <el-form-item label="药品" :label-width="formLabelWidth">
                <el-select v-model="purchaseRecordAddForm.drugsId" placeholder="选择药品">
                    <el-option v-for="drugsOption in drugsList" :label="drugsOption.drugsName" :value="drugsOption.drugsId" />
                </el-select>            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="purchaseRecordAddForm.purchaseCount" autocomplete="off" />
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

let purchaseRecordList: any = reactive([])
let userList:any = reactive([])
let drugsList:any = reactive([])
let staffList:any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "purchaseRecord" // 本组件内通用的url

CURRENCY_SELECT("user").then(res =>{
    userList.length = 0;
    userList.push(...res.data)
})
CURRENCY_SELECT("drugs").then(res =>{
    drugsList.length = 0;
    drugsList.push(...res.data)
})
CURRENCY_SELECT("staff").then(res =>{
    staffList.length = 0;
    staffList.push(...res.data)
})
CURRENCY_SELECT("purchaseRecord").then(res =>{
    purchaseRecordList.length = 0;
    purchaseRecordList.push(...res.data)
})

let purchaseRecordEditForm = reactive({
    purchaseRecordId: 0,
    userId:"",
    drugsId:"",
    staffId:"",
    purchaseCount:"",
})
let purchaseRecordAddForm = reactive({
    userId:"",
    drugsId:"",
    staffId:"",
    purchaseCount:"",
    createTime:"",
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            purchaseRecordList.length = 0
            purchaseRecordList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { purchaseRecordId: data.purchaseRecordId }, CURRENCY_OPERATION_API(operationId, TOSTRING(data)))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    purchaseRecordAddForm.createTime = GET_NOW_DATE_FORMATE()
    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(purchaseRecordAddForm)) {
        await CURRENCY_REQUEST(url, purchaseRecordAddForm, CURRENCY_OPERATION_API(operationId, "->" + TOSTRING(purchaseRecordAddForm)))
        purchaseRecordAddForm = CLEAR_FORM(purchaseRecordAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        purchaseRecordEditForm.purchaseRecordId = data.purchaseRecordId
        purchaseRecordEditForm.drugsId = data.drugsId
        purchaseRecordEditForm.userId = data.userId
        purchaseRecordEditForm.staffId = data.staffId
        purchaseRecordEditForm.purchaseCount = data.purchaseCount
        cacheData = data.purchaseRecordName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, purchaseRecordEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + TOSTRING(purchaseRecordEditForm)))
        RELOAD()
        purchaseRecordEditForm = CLEAR_FORM(purchaseRecordEditForm)
    }
}
RELOAD()

</script>