<template>
    <el-scrollbar>
        <el-table :data="staffList" max-height="700">
            <el-table-column prop="staffId" label="员工Id" width="100" />
            <el-table-column prop="staffName" label="员工名" width="100" />
            <el-table-column prop="staffUserName" label="账号" width="100" />
            <el-table-column prop="staffSex" label="性别" width="100" />
            <el-table-column prop="staffPhone" label="电话号码" width="300" />
            <el-table-column prop="pharmacy.pharmacyName" label="所属药房" width="300" />
            <el-table-column prop="authority.authorityName" label="职位" width="100" />
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

    <el-dialog v-model="EDIT_DIALOG" title="员工信息修改" width="30%" align-center>
        <el-form :model="staffEditForm">
            <el-form-item label="员工名字" :label-width="formLabelWidth">
                <el-input v-model="staffEditForm.staffName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工账号" :label-width="formLabelWidth">
                <el-input v-model="staffEditForm.staffUserName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工密码" :label-width="formLabelWidth">
                <el-input v-model="staffEditForm.staffPassWord" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工性别" :label-width="formLabelWidth">
                <el-select v-model="staffEditForm.staffSex" placeholder="选择职位">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="员工电话" :label-width="formLabelWidth">
                <el-input v-model="staffEditForm.staffPhone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工所属药房" :label-width="formLabelWidth">
                <el-select v-model="staffEditForm.pharmacyId" placeholder="选择药房">
                    <el-option v-for="pharmacyOption in pharmacyList" :label=pharmacyOption.pharmacyName :value=pharmacyOption.pharmacyId />
                </el-select>
            </el-form-item>
            <el-form-item label="员工职位" :label-width="formLabelWidth">
                <el-select v-model="staffEditForm.authorityId" placeholder="选择职位">
                    <el-option v-for="authorityOption in authorityList" :label=authorityOption.authorityName :value=authorityOption.authorityId />
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

    <el-dialog v-model="ADD_DIALOG" title="员工信息添加" width="30%" align-center>
        <el-form :model="staffAddForm">
            <el-form-item label="员工名字" :label-width="formLabelWidth">
                <el-input v-model="staffAddForm.staffName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工账号" :label-width="formLabelWidth">
                <el-input v-model="staffAddForm.staffUserName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工密码" :label-width="formLabelWidth">
                <el-input v-model="staffAddForm.staffPassWord" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工性别" :label-width="formLabelWidth">
                <el-select v-model="staffAddForm.staffSex" placeholder="选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>            
            </el-form-item>
            <el-form-item label="员工电话" :label-width="formLabelWidth">
                <el-input v-model="staffAddForm.staffPhone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="员工所属药房" :label-width="formLabelWidth">
                <el-select v-model="staffAddForm.pharmacyId" placeholder="选择药房">
                    <el-option v-for="pharmacyOption in pharmacyList" :label=pharmacyOption.pharmacyName :value=pharmacyOption.pharmacyId />
                </el-select>
            </el-form-item>
            <el-form-item label="员工职位" :label-width="formLabelWidth">
                <el-select v-model="staffAddForm.authorityId" placeholder="选择职位">
                    <el-option v-for="authorityOption in authorityList" :label=authorityOption.authorityName :value=authorityOption.authorityId />
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
import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM, CURRENCY_SELECT } from "@/apis/FormRudAndSelectApis"

let staffList: any = reactive([])
let pharmacyList: any = reactive([])
let authorityList: any = reactive([])
let cacheData = "";
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const ADD_DIALOG = ref(false) // 添加dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
const URL = "staff" // 本组件内通用的url

CURRENCY_SELECT("pharmacy").then(res =>{
    pharmacyList.length = 0
    pharmacyList.push(...res.data)
})

CURRENCY_SELECT("authority").then(res =>{
    authorityList.length = 0;
    authorityList.push(...res.data)
})

let staffEditForm = reactive({
    staffId: 0,
    staffName: "",
    staffUserName: "",
    staffPassWord: "",
    staffSex: "",
    staffPhone: "",
    pharmacyId: "",
    authorityId: "",
    pharmacy: {},
    authority: {},
})
let staffAddForm = reactive({
    staffId: 0,
    staffName: "",
    staffUserName: "",
    staffPassWord: "",
    staffSex: "",
    staffPhone: "",
    pharmacyId: "",
    authorityId: "",
    pharmacy: {},
    authority: {},
})

function RELOAD() {
    setTimeout((_: any) => {
        CURRENCY_SELECT(URL).then(res => {
            staffList.length = 0
            staffList.push(...res.data)
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
    await CURRENCY_REQUEST(url, { staffId: data.staffId }, CURRENCY_OPERATION_API(operationId, data.staffName))
    RELOAD()
}

async function ADD(url: String, data: any, operationId: Number) {
    ADD_DIALOG.value = !ADD_DIALOG.value;
    staffAddForm.staffId = NaN;

    if (!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(staffAddForm)) {
        await CURRENCY_REQUEST(url, staffAddForm, CURRENCY_OPERATION_API(operationId, "->" + staffAddForm.staffName))
        staffAddForm = CLEAR_FORM(staffAddForm)
    }
    RELOAD()
}

async function EDIT(url: String, data: any, operationId: Number) {

    if (!EDIT_DIALOG.value && data != 'null') {
        staffEditForm.staffId = data.staffId
        staffEditForm.staffName = data.staffName
        staffEditForm.staffUserName = data.staffUserName
        staffEditForm.staffSex = data.staffSex
        staffEditForm.staffPhone = data.staffPhone
        staffEditForm.pharmacyId = data.pharmacyId
        staffEditForm.authorityId = data.authorityId

        cacheData = data.staffName
    }

    EDIT_DIALOG.value = !EDIT_DIALOG.value;

    if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, staffEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + staffEditForm.staffName))
        RELOAD()
        staffEditForm = CLEAR_FORM(staffEditForm)
    }
}
RELOAD()

</script>