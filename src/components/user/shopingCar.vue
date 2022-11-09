<template>
    <el-table :data="shopingCarList" stripe style="width: 100%">
        <el-table-column prop="createTime" label="添加时间" width="230" />
        <el-table-column prop="count" label="数量" width="100" />
        <el-table-column prop="drugs.drugsName" label="商品" width="500" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="danger" @click="DELETE_SHOPING_CAR_ITEM(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { SELECT_SHOPINGCAR } from '@/apis/shopingApi';
import { reactive } from 'vue';
let shopingCarList: any = reactive([]);

function reload() {
    SELECT_SHOPINGCAR()?.then(res =>{
        shopingCarList.length = 0;
        shopingCarList.push(...res?.data)
    })
}

function DELETE_SHOPING_CAR_ITEM(index: any, row: any) {

}

reload()
</script>

<style>

</style>
