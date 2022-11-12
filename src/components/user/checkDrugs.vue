<template>
    <el-form :inline="true" class="demo-form-inline" size="large">
    <el-form-item label="输入药品名称查询">
      <el-input v-model="drugsName" placeholder="请输入药品名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryDrugsName">查询</el-button>
    </el-form-item>
  </el-form>
    <el-scrollbar>
        <el-table :data="drugsList" max-height="700">
            <el-table-column prop="drugsName" label="药名" width="350" />
            <el-table-column prop="drugsType.drugsTypeName" label="类型" width="100" />
            <el-table-column prop="drugsSpecifications" label="规格" width="150" />
            <el-table-column prop="drugsUnit.drugsUnitName" label="单位" width="100" />
            <el-table-column prop="drugsPlace" label="产地" width="300" />
            <el-table-column prop="drugsRetailPrice" label="零售价" width="100" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button type="primary" :icon="ShoppingCart" circle @click="ADD_SHOPCAR(scope.row)" />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="SHOW_PAGINATION" background :page-size="pageSize" layout="prev, pager, next" :total="totals"
            :current-page="nowPage" hide-on-single-page @current-change="handleSizeChange" />
    </el-scrollbar>

    <el-dialog v-model="addShopCarDialog" title="选择药品数量" style="width:500px" :before-close="stateShop">
    <el-form>
      <el-form-item label="选择数量" :label-width="formLabelWidth">
        <el-input-number v-model="select_num" :step="2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="stateShop(0)">取消</el-button>
        <el-button type="primary" @click="stateShop(1)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ShoppingCart } from '@element-plus/icons-vue'
import { QUERY_DRUGS_FOR_LIST } from "@/apis/Drugs_Request"
import { CURRENCY_REQUEST, CURRENCY_SELECT, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM, CURRENCY_SELECT_BY_CONDITION } from "@/apis/FormRudAndSelectApis"
import { ADD_ITEM_TO_SHOPINGCAR } from '@/apis/shopingApi';
import { ElMessage, ElMessageBox } from 'element-plus';


let drugsList: any = reactive([])
let drugsType: any = reactive([])
let drugsUnit: any = reactive([])
let addShopCarDialog = ref(false)
const formLabelWidth = '100px'
let pageSize = ref(1); // 给初始值
let totals = ref(1); // 给初始值
let nowPage = ref(1);
let drugsName = ref("")
let SHOW_PAGINATION = ref(true);
let select_num = ref(1)
let dataCache: any = reactive({})

CURRENCY_SELECT("drugsUnit")?.then(res => { // 赋值unit
    drugsUnit.length = 0
    drugsUnit.push(...res.data);
})

CURRENCY_SELECT("drugsType")?.then(res => { // 赋值type
    drugsType.length = 0
    drugsType.push(...res.data);
})

function ADD_SHOPCAR(data: any){
    dataCache = reactive({})
    dataCache.count = 50
    dataCache.drugs = data
    dataCache.createTime = GET_NOW_DATE_FORMATE()
    addShopCarDialog.value = true
}

function stateShop(stateCode: number){
    if(stateCode == 1){
        dataCache.count = select_num.value;
        ADD_ITEM_TO_SHOPINGCAR(dataCache)?.then(res =>{
          if(res) addShopCarDialog.value = false
        })
    }else{
        addShopCarDialog.value = false
        ElMessage({ type: 'warning', message: '取消操作', })
    }
}

function queryDrugsName(){
    if(drugsName.value == "" || drugsName.value == null || drugsName.value == undefined){
        SHOW_PAGINATION.value = true;
        handleSizeChange(nowPage.value)
        return
    }

    CURRENCY_SELECT_BY_CONDITION("drugs/select/forName",{'drugsName': drugsName.value})?.then(res =>{
        if(res.data.size!=0){
            drugsList.length = 0;
            drugsList.push(...res.data)
            SHOW_PAGINATION.value = false;
        }
    })
}

function handleSizeChange(val: number) {
    setTimeout(() => {
        QUERY_DRUGS_FOR_LIST(val).then(res => {
            drugsList.length = 0
            nowPage.value = val
            pageSize.value = res.size
            totals.value = res.total
            drugsList.push(...res.data)
        })
    }, 100);
};
handleSizeChange(1); // 初始化数据
</script>