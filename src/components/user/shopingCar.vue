<template>
    <el-table :data="shopingCarList" stripe style="width: 100%">
        <el-table-column prop="drugs.drugsName" label="商品" width="500" />
        <el-table-column prop="count" label="数量" width="100" />
        <el-table-column prop="createTime" label="添加时间" width="230" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" @click="CHANGE_SHOPING_CAR_ITEM(scope.$index, scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="DELETE_SHOPING_CAR_ITEM(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="changeShopCarDialog" title="选择药品数量" style="width:500px">
    <el-form>
      <el-form-item label="选择数量" :label-width="formLabelWidth">
        <el-input-number v-model="select_num" :step="2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EDIT_DIALOG_STATE(0)">取消</el-button>
        <el-button type="primary" @click="EDIT_DIALOG_STATE(1)">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { SELECT_SHOPINGCAR, CHANGE_SHOPING_CAR_ITEM_API, REMOVE_SHOPING_CAR_ITEM_API } from '@/apis/shopingApi';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
let shopingCarList: any = reactive([]);
let changeShopCarDialog = ref(false);
let select_num = ref(1)
const formLabelWidth = '100px'
let cacheShopingCar: any = reactive({})

function reload() {
    SELECT_SHOPINGCAR()?.then(res =>{
        shopingCarList.length = 0;
        shopingCarList.push(...res?.data)
    })
}


function EDIT_DIALOG_STATE(options: number){
    if(options == 1){
        cacheShopingCar.count = select_num.value
        CHANGE_SHOPING_CAR_ITEM_API(cacheShopingCar)? setTimeout(() => {
            reload() 
        }, 200): null;
        changeShopCarDialog.value = false
    }else{
        changeShopCarDialog.value = false
        ElMessage({ type: 'warning', message: '取消操作', })
    }

}

function DELETE_SHOPING_CAR_ITEM(index: any, row: any) {
    REMOVE_SHOPING_CAR_ITEM_API(row.drugs.drugsId)? setTimeout(() => {
        reload() 
    }, 200):null
}

function CHANGE_SHOPING_CAR_ITEM(index: any, row: any){
    changeShopCarDialog.value = true
    cacheShopingCar = reactive({})
    cacheShopingCar = row
    select_num.value = row.count
    changeShopCarDialog.value = true

}

reload()
</script>

<style>

</style>
