<template>
  <el-container class="layout-container-demo">
    <el-aside width="12%">
      <el-scrollbar>
        <el-menu :default-openeds="['0', '1', '2', '3']" v-for="(navigation,index) in NAVIGATION.children">
          <el-sub-menu :index="String(index)">
            <template #title>
              <el-icon>
                <component :is="navigation.icon" />
              </el-icon>{{ navigation.childrenName }}
            </template>
            <div v-for="(children, childrenIndex) in navigation.children">
              <router-link :to="navigation.childrenPath + children.childrenPath">
                <el-menu-item :index="index + '-' + childrenIndex">
                  <el-icon>
                    <component :is="children.icon" />
                  </el-icon>
                  {{ children.childrenName }}
                </el-menu-item>
              </router-link>
            </div>
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
            <template #dropdown  v-if="loginName != ''">
              <el-dropdown-menu>
                <el-dropdown-item @click="logOut()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span v-if="loginName == ''"><a href="/userLogin">请先去登陆</a></span>
          <span v-else>{{ "欢迎您" + loginName }}</span>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { getNavigation } from '@/apis/NavigationApis'
import store from '@/store/index'
import router from '@/router';

let loginName:any = ""
if(localStorage.getItem("Aunother") == undefined) loginName = ""
else loginName = localStorage.getItem("Aunother")

const NAVIGATION = getNavigation("")

function logOut(){
  store.commit('logOut')
  router.push("/userLogin")
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
