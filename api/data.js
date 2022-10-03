import axios from './axios'

const baseURL='http://localhost:8090/'
//const baseURL='http://1.116.226.116:8090/'

export const getMenu = (param)=>{
    return axios.request({
        url:baseURL+'getMenu',
        method:'post',
        data:param
    })
}
export const adminLogin = (param)=>{
    return axios.request({
        url:baseURL+'admin/Login',
        method:'post',
        data:param
    })
}
