<template>
    <el-scrollbar>
        <el-table :data="purchaseRecordList" max-height="700">
            <!-- <el-table-column prop="purchaseRecordId" label="订单Id" width="150" /> -->
            <el-table-column type="index" :index="indexMethod" />
            <el-table-column prop="user.userName" label="购买者" width="100" />
            <el-table-column prop="staff.staffName" label="销售员工" width="100" />
            <el-table-column label="订单价格" width="120">
                <template #default="scope">
                    {{ table_Json_Reload(scope.row.drugsJson) }} 元
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="日期" width="250" />
            <el-table-column fixed="right" label="操作">
                <template #header>
                    操作
                </template>
                <template #default="scope">
                    <el-button type="primary" :icon="ShoppingCart" circle @click="tableDrugsDetail(scope.row)" />
                    <el-button type="danger" :icon="Delete" circle @click="CURRENCY_CRUD(URL,scope.row,3)" />
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>

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

    <el-drawer v-model="drawer" title="订单详细" direction="rtl" size="50%">
        <el-table :data="drugsDetail">
            <el-table-column property="drugs.drugsName" label="药品名称" width="200" />
            <el-table-column property="drugs.drugsRetailPrice" label="药瓶价格" width="200" />
            <el-table-column property="count" label="数量" />
            <el-table-column label="总价" width="120">
                <template #default="scope">
                    {{(scope.row.count * scope.row.drugs.drugsRetailPrice).toFixed(2)}} 元
                </template>
            </el-table-column>
        </el-table>
        总共: {{total.toFixed(2)}}元
    </el-drawer>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Delete, ShoppingCart, StarFilled } from '@element-plus/icons-vue'
import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM, CURRENCY_SELECT, TOSTRING } from "@/apis/FormRudAndSelectApis"

let purchaseRecordList: any = reactive([])
let userList:any = reactive([])
let drugsList:any = reactive([])
let staffList:any = reactive([])
let drawer = ref(false)
let drugsDetail: any = reactive([])
let total: any = ref(0)
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "purchaseRecord" // 本组件内通用的url

const indexMethod = (index: number) => {
  return index + 1
}

CURRENCY_SELECT("user")?.then(res =>{
    userList.length = 0;
    userList.push(...res.data)
})
CURRENCY_SELECT("drugs")?.then(res =>{
    drugsList.length = 0;
    drugsList.push(...res.data)
})
CURRENCY_SELECT("staff")?.then(res =>{
    staffList.length = 0;
    staffList.push(...res.data)
})
CURRENCY_SELECT("purchaseRecord")?.then(res =>{
    purchaseRecordList.length = 0;
    purchaseRecordList.push(...res.data)
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
        CURRENCY_SELECT(URL)?.then(res => {
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

const tableDrugsDetail = (row: any) => {
    let inObject: any = JSON.parse(row.drugsJson)
    drugsDetail.length = 0
    drugsDetail.push(...inObject)

    total.value = 0
    for (let i = 0; i < drugsDetail.length; i++) {
        const element = drugsDetail[i];
        total.value += element.count * element.drugs.drugsRetailPrice
    }

    drawer.value = true;
}

function table_Json_Reload(data: any) {
    let inObject: any = JSON.parse(data)
    let total = 0;
    inObject.forEach((element: any) => {
        total += element.count * element.drugs.drugsRetailPrice
        console.log(element.count)
        console.log(element.drugs.drugsRetailPrice)

    });
    return total.toFixed(2)
}

RELOAD()

</script>