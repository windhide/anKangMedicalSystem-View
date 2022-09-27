<template>
    <el-scrollbar>
        <el-table :data="drugsList" max-height="700">
            <!-- <el-table-column prop="drugsId" label="药Id" width="100" /> -->
            <el-table-column prop="drugsName" label="药名" width="350" />
            <el-table-column prop="drugsType.drugsTypeName" label="类型" width="100" />
            <el-table-column prop="drugsSpecifications" label="规格" width="150" />
            <el-table-column prop="drugsUnit.drugsUnitName" label="单位" width="100" />
            <el-table-column prop="drugsPlace" label="产地" width="300" />
            <el-table-column prop="drugsOriginPrice" label="原始价格" width="100" />
            <el-table-column prop="drugsRetailPrice" label="零售价" width="100" />
            <el-table-column prop="drugsCreatTime" label="录入时间" width="320" />
            <el-table-column fixed="right" label="操作">
                <template #header>
                    操作
                    <el-button type="success" :icon="StarFilled" @click="ADD_DIALOG = true">添加</el-button>
                </template>
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle @click="CURRENCY_CRUD('drugs',scope.row,2)" />
                    <el-button type="danger" :icon="Delete" circle @click="CURRENCY_CRUD('drugs',scope.row,3)" />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="totals"
            :current-page="nowPage" hide-on-single-page @current-change="handleSizeChange" />
    </el-scrollbar>

    <el-dialog v-model="EDIT_DIALOG" title="药物修改" width="30%" align-center>
        <el-form :model="drugsEditForm">
            <el-form-item label="药名" :label-width="formLabelWidth">
                <el-input v-model="drugsEditForm.drugsName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药品类型" :label-width="formLabelWidth">
                <el-select v-model="drugsEditForm.drugsTypeId" placeholder="选择药品类型">
                    <div v-for="drugsTypeOption in drugsType">
                        <el-option :label=drugsTypeOption.drugsTypeName :value=drugsTypeOption.drugsTypeId />
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="药物规格" :label-width="formLabelWidth">
                <el-input v-model="drugsEditForm.drugsSpecifications" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药物单位" :label-width="formLabelWidth">
                <el-select v-model="drugsEditForm.drugsUnitid" placeholder="选择药物单位">
                    <div v-for="drugsUnitOption in drugsUnit">
                        <el-option :label=drugsUnitOption.drugsUnitName :value=drugsUnitOption.drugsUnitId />
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="药物产地" :label-width="formLabelWidth">
                <el-input v-model="drugsEditForm.drugsPlace" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药物原始价格" :label-width="formLabelWidth">
                <el-input v-model="drugsEditForm.drugsOriginPrice" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药物零售价格" :label-width="formLabelWidth">
                <el-input v-model="drugsEditForm.drugsRetailPrice" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="drugsEditForm.drugsCreatTime" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EDIT_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD('drugs','null',2)">修改</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="ADD_DIALOG" title="药物添加" width="30%" align-center>
        <el-form :model="drugsAddForm">
            <el-form-item label="药名" :label-width="formLabelWidth">
                <el-input v-model="drugsAddForm.drugsName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药品类型" :label-width="formLabelWidth">
                <el-select v-model="drugsAddForm.drugsTypeId" placeholder="选择药品类型">
                    <div v-for="drugsTypeOption in drugsType">
                        <el-option :label=drugsTypeOption.drugsTypeName :value=drugsTypeOption.drugsTypeId />
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="药物规格" :label-width="formLabelWidth">
                <el-input v-model="drugsAddForm.drugsSpecifications" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药物单位" :label-width="formLabelWidth">
                <el-select v-model="drugsAddForm.drugsUnitid" placeholder="选择药物单位">
                    <div v-for="drugsUnitOption in drugsUnit">
                        <el-option :label=drugsUnitOption.drugsUnitName :value=drugsUnitOption.drugsUnitId />
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="药物产地" :label-width="formLabelWidth">
                <el-input v-model="drugsAddForm.drugsPlace" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药物原始价格" :label-width="formLabelWidth">
                <el-input v-model="drugsAddForm.drugsOriginPrice" autocomplete="off" />
            </el-form-item>
            <el-form-item label="药物零售价格" :label-width="formLabelWidth">
                <el-input v-model="drugsAddForm.drugsRetailPrice" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="drugsAddForm.drugsCreatTime" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="ADD_DIALOG = false">取消</el-button>
                <el-button type="primary" @click="CURRENCY_CRUD('drugs','null',1)">添加</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { Menu as IconMenu, Message, Setting, Delete, Edit, StarFilled } from '@element-plus/icons-vue'
    import { QUERY_DRUGS_FOR_LIST } from "@/apis/Drugs_Request"
    import { CURRENCY_REQUEST, CURRENCY_OPERATION_API, FORM_STATS_JUDGE, GET_NOW_DATE_FORMATE, CLEAR_FORM } from "@/apis/FormRudApis"
    import { QUERY_DRUGS_TYPE, QUERY_DRUGSUNIT } from "@/apis/Types_Request"
    
    
    let drugsList: any = reactive([])
    let drugsType: any = reactive([])
    let drugsUnit: any = reactive([])
    let pageSize = ref(1); // 给初始值
    let totals = ref(1); // 给初始值
    let nowPage = ref(1);
    let cacheData = "";
    const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
    const ADD_DIALOG = ref(false) // 添加dialog窗口开关
    const formLabelWidth = '100px' // dialog中组件的宽度
    let drugsEditForm = reactive({
      drugsId: 0,
      drugsName: "",
      drugsTypeId: 0,
      drugsSpecifications: "",
      drugsUnitid: 0,
      drugsPlace: "",
      drugsOriginPrice: 0,
      drugsRetailPrice: 0,
      drugsCreatTime: "",
    })
    let drugsAddForm = reactive({
      drugsId: 0,
      drugsName: "",
      drugsTypeId: "",
      drugsSpecifications: "",
      drugsUnitid: "",
      drugsPlace: "",
      drugsOriginPrice: 0,
      drugsRetailPrice: 0,
      drugsCreatTime: "",
    })
    
    QUERY_DRUGSUNIT().then(res => { // 赋值unit
      drugsUnit.length = 0
      drugsUnit.push(...res.data);
    })
    
    QUERY_DRUGS_TYPE().then(res => { // 赋值type
      drugsType.length = 0
      drugsType.push(...res.data);
    })
    
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
      await CURRENCY_REQUEST(url, { drugsId: data.drugsId }, CURRENCY_OPERATION_API(operationId, data.drugsName))
      handleSizeChange(nowPage.value)
    }
    
    async function ADD(url: String, data: any, operationId: Number) {
      ADD_DIALOG.value = !ADD_DIALOG.value;
      drugsAddForm.drugsId = NaN;
      drugsAddForm.drugsCreatTime = GET_NOW_DATE_FORMATE();
      
      if(!ADD_DIALOG.value && data == 'null' && FORM_STATS_JUDGE(drugsAddForm)){
        await CURRENCY_REQUEST(url, drugsAddForm, CURRENCY_OPERATION_API(operationId,"->"+drugsAddForm.drugsName))
        nowPage.value = Math.ceil(totals.value/pageSize.value)
        drugsAddForm = CLEAR_FORM(drugsAddForm)
      }
      handleSizeChange(nowPage.value)
    }
    
    async function EDIT(url: String, data: any, operationId: Number) {
    
      if (!EDIT_DIALOG.value && data != 'null') {
        drugsEditForm.drugsId = data.drugsId
        drugsEditForm.drugsName = data.drugsName
        drugsEditForm.drugsTypeId = data.drugsTypeId
        drugsEditForm.drugsSpecifications = data.drugsSpecifications
        drugsEditForm.drugsUnitid = data.drugsUnitid
        drugsEditForm.drugsPlace = data.drugsPlace
        drugsEditForm.drugsOriginPrice = data.drugsOriginPrice
        drugsEditForm.drugsRetailPrice = data.drugsRetailPrice
        drugsEditForm.drugsCreatTime = data.drugsCreatTime
    
        cacheData = data.drugsName
      }
    
      EDIT_DIALOG.value = !EDIT_DIALOG.value;
    
      if (!EDIT_DIALOG.value && data == 'null') {
        await CURRENCY_REQUEST(url, drugsEditForm, CURRENCY_OPERATION_API(operationId, "前->" + cacheData + ",后->" + drugsEditForm.drugsName))
        handleSizeChange(nowPage.value)
        drugsEditForm = CLEAR_FORM(drugsEditForm)
      }
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
    
    <style scoped>
    .layout-container-demo .el-header {
      position: relative;
      background-color: var(--el-color-primary-light-7);
      color: var(--el-text-color-primary);
    }
    
    .layout-container-demo .el-aside {
      color: var(--el-text-color-primary);
      background: var(--el-color-primary-light-8);
    }
    
    .layout-container-demo .el-menu {
      border-right: none;
    }
    
    .layout-container-demo .el-main {
      padding: 0;
    }
    
    .layout-container-demo .toolbar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      right: 20px;
    }
    </style>