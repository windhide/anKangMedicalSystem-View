import axios from "@/apis/axiosTokenApi"
import router from "@/router";
import { ElMessage } from "element-plus";

// drugs - apis
export function QUERY_DRUGS_FOR_LIST(page: number) {
    return axios.post("drugs/select/list/" + page).then((res: any) => {
        if (res.data.code == 2002) {
            setTimeout(() => {
                console.log(router.currentRoute.value)
                ElMessage({ type: 'error', message: '登陆凭证已过期，跳转登录中', })
                if (router.currentRoute.value.path.indexOf("root") != -1) {
                    router.push("/rootlogin")
                } else {
                    router.push("/userLogin")
                }
            }, 300);
            return;
        }
        return res.data;
    })
}
