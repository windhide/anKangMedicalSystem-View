import axios from "axios"

axios.defaults.baseURL = '/api'

// drugs - apis
export function QUERY_DRUGS_FOR_LIST(page:number){
    return axios.post("drugs/select/list/"+page).then((res:any) =>{
        return res.data;
    })
}
