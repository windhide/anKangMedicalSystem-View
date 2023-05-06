<template>
    <el-scrollbar>
        <el-table :data="purchaseRecordList" max-height="700">
            <!-- <el-table-column prop="purchaseRecordId" label="订单编号" width="200" /> -->
            <el-table-column type="index" :index="indexMethod" />
            <el-table-column prop="staff.staffName" label="操作者" width="200" />
            <el-table-column label="订单价格" width="120">
                <template #default="scope">
                    {{ table_Json_Reload(scope.row.drugsJson) }} 元
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="订单创建时间" width="300" />
            <el-table-column fixed="right" label="查看详细">
                <template #default="scope">
                    <el-button type="primary" :icon="ShoppingCart" circle @click="tableDrugsDetail(scope.row)" />
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>

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
import { ShoppingCart } from '@element-plus/icons-vue'
import { SELECT_FOR_USER_PURCHASE_RECORD } from '@/apis/purchaseRecordApis';



let purchaseRecordList: any = reactive([])
let drawer = ref(false)
let drugsDetail: any = reactive([])
let total: any = ref(0)
const indexMethod = (index: number) => {
  return index + 1
}

function reload() {
    setTimeout(() => {
        SELECT_FOR_USER_PURCHASE_RECORD()?.then(res => {
            purchaseRecordList.length = 0
            purchaseRecordList.push(...res.data)
        })
    }, 300);
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


reload()
</script>