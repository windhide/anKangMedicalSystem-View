<template>
    <el-table :data="shopingCarList" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column label="Operations">
            <template #default="scope">
              <el-button size="small" type="danger" @click="DELETE_SHOPING_CAR_ITEM(scope.$index, scope.row)">Delete</el-button
             >
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
    let shopingCarList = reactive([]);

function DELETE_SHOPING_CAR_ITEM(index: any,row: any){

}
    
</script>

<style>

</style>
