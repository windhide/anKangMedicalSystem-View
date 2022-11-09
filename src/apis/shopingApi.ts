import axios from "@/apis/axiosTokenApi"
import router from "@/router";
import { ElMessage } from "element-plus";

export function ADD_ITEM_TO_SHOPINGCAR(data:any){
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
    let username = localStorage.getItem("username")

    axios.post("shopingCar/insert",{"shopingCar": data,"userKey":userId+"-"+username+"-car"}).then(res =>{
        if(res.data){
            ElMessage({ type: 'success', message: '成功添加至购物车！', })
        }else{
            ElMessage({ type: 'error', message: '因未知原因，添加到购物车失败。', })
        }
    })
}

export function SELECT_SHOPINGCAR(){
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
    let username = localStorage.getItem("username")

    return axios.post("shopingCar/select",{"userKey":userId+"-"+username+"-car"}).then(res =>{
        if (res.data.code == 2002) {
            setTimeout(() => {
                ElMessage({ type: 'error', message: '没有登录！操作取消,请先登陆！', })
                if (router.currentRoute.value.path.indexOf("root") != -1) {
                    router.push("/rootlogin")
                } else {
                    router.push("/userLogin")
                }
            }, 300);
            return;
        }
        return res;
    })
}