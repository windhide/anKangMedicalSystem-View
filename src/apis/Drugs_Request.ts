import axios from "axios"
import {ElNotification} from 'element-plus'

axios.defaults.baseURL = '/api'

// drugs - apis
export function QUERY_DRUGS_FOR_LIST(){
    return axios.post("drugs/select/list").then((res:any) =>{
        return res.data;
    })
}
