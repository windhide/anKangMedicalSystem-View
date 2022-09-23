<template>
  <el-container class="layout-container-demo">
    <el-aside width="12%">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message />
              </el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <icon-menu />
              </el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
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
              <template #default="scope">
                <el-button type="primary" :icon="Edit" circle @click="EDIT(scope.row,'drugs',scope.row)" />
                <el-button type="danger" :icon="Delete" circle
                  @click="DELETE(scope.row.drugsName,'drugs',scope.row.drugsId)" />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="totals"
            @current-change="handleSizeChange" />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>




  <el-dialog v-model="EDIT_DIALOG" title="药物修改" width="30%" align-center>
    <el-form :model="drugsForm">
      <el-input v-model="drugsForm.drugsId"  hidden />
      <el-form-item label="药名" :label-width="formLabelWidth">
        <el-input v-model="drugsForm.drugsName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="药品类型" :label-width="formLabelWidth">
        <el-select v-model="drugsForm.drugsTypeId" placeholder="选择药品类型">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="药物规格" :label-width="formLabelWidth">
        <el-input v-model="drugsForm.drugsSpecifications" autocomplete="off" />
      </el-form-item>
      <el-form-item label="药物单位" :label-width="formLabelWidth">
        <el-select v-model="drugsForm.drugsUnitid" placeholder="选择药物单位">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="药物产地" :label-width="formLabelWidth">
        <el-input v-model="drugsForm.drugsPlace" autocomplete="off" />
      </el-form-item>
      <el-form-item label="药物原始价格" :label-width="formLabelWidth">
        <el-input v-model="drugsForm.drugsOriginPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="药物零售价格" :label-width="formLabelWidth">
        <el-input v-model="drugsForm.drugsRetailPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="创建时间" :label-width="formLabelWidth">
        <el-input v-model="drugsForm.drugsCreatTime" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EDIT_DIALOG = false">取消</el-button>
        <el-button type="primary" @click="EDIT">修改</el-button>
      </span>
    </template>
  </el-dialog>




</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Menu as IconMenu, Message, Setting, Delete, Edit } from '@element-plus/icons-vue'
import { QUERY_DRUGS_FOR_LIST } from "@/apis/Drugs_Request"
import { CURRENCY_DELETE, CURRENCY_EDIT } from "@/apis/FormRudApis"


let drugsList: any = reactive([])
let pageSize = ref(1); // 给初始值
let totals = ref(1); // 给初始值
let nowPage = ref(1);
const EDIT_DIALOG = ref(false) // 修改dialog窗口开关
const formLabelWidth = '100px' // dialog中组件的宽度
let drugsForm = reactive({
  drugsId: 0,
  drugsName: "",
  drugsTypeId: 0,
  drugsType: [""],
  drugsSpecifications: "",
  drugsUnitid: 0,
  drugsUnit: [""],
  drugsPlace: "",
  drugsOriginPrice: 0,
  drugsRetailPrice: 0,
  drugsCreatTime: "",
})

async function DELETE(Title: String, url: String, id: number) {
  await CURRENCY_DELETE(Title, url, id)
  handleSizeChange(nowPage.value)
}

async function EDIT(Title: String, url: String, data: any) {
  console.log(data.drugsId)
  
  drugsForm.drugsId = data.drugsId
  drugsForm.drugsName = data.drugsName
  drugsForm.drugsTypeId = data.drugsTypeId
  drugsForm.drugsType = data.drugsType
  drugsForm.drugsSpecifications = data.drugsSpecifications
  drugsForm.drugsUnitid = data.drugsUnitid
  drugsForm.drugsUnit = data.drugsUnit
  drugsForm.drugsPlace = data.drugsPlace
  drugsForm.drugsOriginPrice = data.drugsOriginPrice
  drugsForm.drugsRetailPrice = data.drugsRetailPrice
  drugsForm.drugsCreatTime = data.drugsCreatTime

  
  // console.log("....=",drugsForm)

  // drugsForm.values = data;
  // console.log("this is data = drugsForm",drugsForm)
  
  EDIT_DIALOG.value = !EDIT_DIALOG.value; // dialog开关

  // await CURRENCY_EDIT(Title, url, drugsForm)
  // handleSizeChange(nowPage.value)
}

function handleSizeChange(val: number) {
  QUERY_DRUGS_FOR_LIST(val).then(res => {
    drugsList.length = 0
    nowPage.value = val
    pageSize.value = res.size
    totals.value = res.total
    drugsList.push(...res.data)
  })
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
