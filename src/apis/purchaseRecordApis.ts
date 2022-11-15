import { ElMessageBox, ElMessage } from "element-plus"
import axios from "@/apis/axiosTokenApi"
import router from "@/router";

export function SELECT_FOR_USER_PURCHASE_RECORD() {
    if (localStorage.getItem("username") == "" || localStorage.getItem("username") == null) {
        setTimeout(() => {
            ElMessage({ type: 'error', message: '没有登录！操作取消,请先登陆！', })
            if (router.currentRoute.value.path.indexOf("root") != -1) {
                router.push("/rootlogin")
            } else {
                router.push("/userLogin")
            }
        }, 300);
        return
    }
    let userId = localStorage.getItem("userId")
    return axios.post("purchaseRecord/selectUser", { "userId": userId }).then(res => {
        return res;
    })
}