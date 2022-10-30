<template>
    <div>
        <el-space fill wrap :fill-ratio="85" direction="vertical" style="width: 100%">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Card name</span>
                        <el-button class="button" text>修改</el-button>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">
                    {{ 'List item ' + o }}
                </div>
            </el-card>
        </el-space>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>