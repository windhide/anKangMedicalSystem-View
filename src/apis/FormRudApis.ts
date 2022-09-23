import { ElMessageBox, ElMessage } from "element-plus"
import axios from "axios"

export async function CURRENCY_DELETE(Title: String, url: String, id: number) {
    await ElMessageBox.confirm(
        '确认要删除 >>' + Title + '<<吗?',
        '删除确认',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'error',
        }
    ).then(() => {
        axios.post(url + "/remove/" + id).then((res: any) => {
            if (res.data == true) {
                ElMessage({ type: 'success', message: '删除成功' })
            } else {
                ElMessage({ type: 'error', message: '因为服务器原因删除失败!' })
            }
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消操作',
        })
    })
}

export async function CURRENCY_EDIT(Title: String, url: String, data: any) {
    await ElMessageBox.confirm(
        '确认修改吗?',
        '修改确认',
        {
            confirmButtonText: '修改',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        axios.post(url + "/update",data).then((res: any) => {
            if (res.data == true) {
                ElMessage({ type: 'success', message: '修改成功' })
            } else {
                ElMessage({ type: 'error', message: '因为服务器原因修改失败!' })
            }
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消操作',
        })
    })
}