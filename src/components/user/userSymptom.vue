<template>
    <el-scrollbar>
        <el-table :data="symptomList" max-height="700">
            <el-table-column prop="staff.staffName" label="医生" width="350" />
            <el-table-column prop="symptomContext" label="医嘱" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="150" />
        </el-table>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { CURRENCY_SELECT_BY_CONDITION } from "@/apis/FormRudAndSelectApis"

let symptomList: any = reactive([])
let userId = localStorage.getItem("userId")

CURRENCY_SELECT_BY_CONDITION("symptom/select/condition",{userId})?.then(res => { // 赋值type
    symptomList.length = 0
    symptomList.push(...res.data);
})

</script>