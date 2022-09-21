import { ElMessageBox, ElMessage } from "element-plus"
import { CURRENCY_DELETE_REQUEST } from "./RudRequestApis";

export const open = (Title: String, url: String, id: number) => {
    ElMessageBox.confirm(
        '确认要删除 >>' + Title + '<<吗?',
        '删除确认',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'error',
        }
    ).then(() => {
        CURRENCY_DELETE_REQUEST(url, id);
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消操作',
        })
    })
}