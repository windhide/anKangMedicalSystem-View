import axios from "axios"
import { ElMessage } from "element-plus"

axios.defaults.baseURL = '/api'

export function CURRENCY_DELETE_REQUEST(url: String, id: number) {
    axios.post(url + "/remove/" + id).then((res: any) => {
        if (res.data == true) {
            ElMessage({ type: 'success', message: '删除成功' })
        } else {
            ElMessage({ type: 'error', message: '因为服务器原因删除失败!' })
        }
    })
}
