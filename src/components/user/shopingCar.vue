<template>
    <el-table :data="shopingCarList" stripe style="width: 100%" @selection-change="moneyCheck">
        <el-table-column type="selection" width="55" label="勾选结算" />
        <el-table-column prop="drugs.drugsName" label="商品" width="400" />
        <el-table-column prop="count" label="数量" width="100" />
        <el-table-column label="价格" width="120">
            <template #default="scope">
                {{ scope.row.count * scope.row.drugs.drugsRetailPrice + "元" }}
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="230" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" @click="CHANGE_SHOPING_CAR_ITEM(scope.$index, scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="DELETE_SHOPING_CAR_ITEM(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <el-space wrap>
    <el-card class="box-card" style="width: 50em;margin: 1em 1em;">
      <template #header>
        <div class="card-header">
          <span>已选择详细</span>
        </div>
      <span style="margin-left: 0.5em" v-for="select in select_val"> {{select.drugs.drugsName + " - " + select.count + "个 - "+ select.count * select.drugs.drugsRetailPrice + "元"}}<br /></span>
      <span style="margin-left: 1em"> 总计：{{ total }} 元</span>
      </template>
      <el-button type="primary" round>去支付</el-button>
      <el-popconfirm v-if="shopingCarList.length != 0" 
          confirm-button-text="是的"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="你确定需要清空购物车吗?"
            @confirm="clearShopingCar"
      >
    <template #reference>
      <el-button type="primary" round>清空购物车</el-button>
    </template>
  </el-popconfirm>
    </el-card>
  </el-space>


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
import { SELECT_SHOPINGCAR, CHANGE_SHOPING_CAR_ITEM_API, REMOVE_SHOPING_CAR_ITEM_API, CLEAR_SHOP_CAR } from '@/apis/shopingApi';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue'

let shopingCarList: any = reactive([]);
let changeShopCarDialog = ref(false);
let select_num = ref(1)
let select_val: any = reactive([])
const formLabelWidth = '100px'
let cacheShopingCar: any = reactive({})
let total = ref(0)

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

const moneyCheck  = (val: object[]) => {
    total.value = 0
    select_val.length = 0
    select_val.push(...val)
    for (let i = 0; i < select_val.length; i++) {
        const element = select_val[i];
        total.value += element.count * element.drugs.drugsRetailPrice
    }
}

const clearShopingCar = () =>{
  CLEAR_SHOP_CAR();
  ElMessage({ type: 'success', message: '操作完成', })
  setTimeout(reload, 200);
}
reload()
</script>

<style>

</style>
