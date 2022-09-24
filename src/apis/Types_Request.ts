import axios from "axios"

axios.defaults.baseURL = '/api'

// drugsType - apis
export function QUERY_DRUGS_TYPE(){
    return axios.post("drugsType/select/list").then((res:any) =>{
        return res;
    })
}

// drugsUnit - apis
export function QUERY_DRUGSUNIT(){
    return axios.post("drugsUnit/select/list").then((res:any) =>{
        return res;
    })
}


// operatorType - apis
export function QUERY_OPERATOR_TYPE(){
    return axios.post("operatorType/select/list").then((res:any) =>{
        return res;
    })
}

// userLevelType - apis
export function QUERY_USERLEVEL_TYPE(){
    return axios.post("userLevelType/select/list").then((res:any) =>{
        return res;
    })
}

// warehouseType - apis
export function QUERY_WAREHOUSE_TYPE(){
    return axios.post("warehouseType/select/list").then((res:any) =>{
        return res;
    })
}
