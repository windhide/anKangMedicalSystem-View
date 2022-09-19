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
          <el-table :data="drugsList" max-height="600">
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
                <el-button type="primary" :icon="Edit" circle />
                <el-button type="danger" :icon="Delete" circle />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="totals" @current-change="handleSizeChange" />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Menu as IconMenu, Message, Setting, Delete, Edit } from '@element-plus/icons-vue'
import { QUERY_DRUGS_FOR_LIST } from "@/apis/Drugs_Request"



let drugsList: any = reactive([])
let pageSize = ref(String);
let totals = ref(String);

QUERY_DRUGS_FOR_LIST(1).then(res => {
  drugsList.push(...res.data);
  pageSize.value = res.size;
  totals.value = res.total;
  console.log(res.size)
  console.log(res.total)
})

const handleSizeChange = (val: number) => {
  QUERY_DRUGS_FOR_LIST(val).then(res => {
    drugsList.length = 0;
    drugsList.push(...res.data);
  })
}

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
