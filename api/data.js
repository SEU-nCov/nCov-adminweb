import axios from './axios'

const baseURL = 'http://localhost:9000/'
const AliyunURL = 'https://geo.datav.aliyun.com/'
//const baseURL='http://1.116.226.116:8090/'

export const getMenu = (param) => {
	return axios.request({
		url: baseURL + 'getMenu',
		method: 'post',
		data: param
	})
}
export const adminLogin = (param) => {
	return axios.request({
		url: baseURL + 'admin/Login',
		method: 'post',
		data: param
	})
}

// 主页相关
export const getChinaMap = () => {
	return axios.request({
		url: AliyunURL+'areas_v3/bound/100000_full.json',
		method: 'get'
	})
}

// 使用新浪疫情数据接口获取数据
export const getChinaCovData = () => {
	return axios.request({
		//url: '/g2/getOnsInfo?name=disease_h5',
		url:'/ug/api/wuhan/app/data/list-total',
		method: 'get'
	})
}
export const getCityCovData = (code) => {
	return axios.request({
		url:'/newsqa/v1/query/pubished/daily/list?adCode='+code+'&limit=1',
		method: 'get'
	})
}
export const getChinaCovAddData = () => {
	return axios.request({
		url:'/news/wap/fymap2020_data.d.json?_=1580892522427',
		method: 'get'
	})
}
export const getVaccineTopData = () => {
	return axios.request({
		url:'/newsqa/v1/automation/modules/list?modules=VaccineTopData',
		method: 'get'
	})
}

// 核酸检测点相关接口
export const getTests = (param) => {	// 核酸采样点
	return axios.request({
		url: baseURL + 'getNatPointbycity',//admin/CovTest/get
		method: 'post',
		data: param
	})
}
export const addTest = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovTest/add',
		method: 'post',
		data: param
	})
}
export const editTest = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovTest/edit',
		method: 'post',
		data: param
	})
}
export const deleteTests = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovTest/delete',
		method: 'post',
		data: param
	})
}
export const searchTestByName = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/getPointsbyname',
		method: 'post',
		data: param
	})
}
export const searchTestByArea = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/getPointsbyarea',
		method: 'post',
		data: param
	})
}
export const filterTest = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/getPointsbyThreeVariable',
		method: 'post',
		data: param
	})
}
// 核酸检测机构相关接口
export const getAllTestPoint = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/get/TestPoint',
		method: 'post',
		data: param
	})
}
export const addTestPoint = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/add/TestPoint',
		method: 'post',
		data: param
	})
}
export const deleteTestPoints = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/delete/TestPoint',
		method: 'post',
		data: param
	})
}
export const editTestPoint = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/edit/TestPoint',
		method: 'post',
		data: param
	})
}
export const searchTestPoint = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/get/AreaTestPoint',
		method: 'post',
		data: param
	})
}

// 疫苗接种相关接口
export const searchVaccineByNameDateAddressDose = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/search',
		method: 'post',
		data: param
	})
}
export const getVaccinedPeopleName = () => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/peopleName',
		method: 'get'
	})
}
export const getVaccinePointName = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/pointName',
		method: 'post',
		data: param
	})
}
export const getVaccineAreaRanking = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/vaccineAreaRanking',
		method: 'post',
		data: param
	})
}
export const getCityMap = (code) => {
	return axios.request({
		url: AliyunURL + 'areas_v3/bound/'+code+'_full.json',
		//url: '/areas_v3/bound/'+code+'_full.json',
		method: 'get'
	})
}
export const getCityVaccinedData = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/cityVaccinedData',
		method: 'post',
		data: param
	})
}
export const getVaccinePoints = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/vaccinedPoints',
		method: 'post',
		data: param
	})
}
export const editVaccinePoint = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/edit/vaccinedPoint',
		method: 'post',
		data: param
	})
}

// 核酸检测结果相关
export const getTenDayNatNumber = (param) => {
	return axios.request({
		url: baseURL + 'admin/get/TenDayNatnumber',
		method: 'post',
		data: param
	})
}
export const getNatStatisticsCollected = (param) => {
	return axios.request({
		url: baseURL + 'admin/NatStatisticsCollected',
		method: 'post',
		data: param
	})
}
export const getNatStatisticsTested = (param) => {
	return axios.request({
		url: baseURL + 'admin/NatStatisticsTested',
		method: 'post',
		data: param
	})
}
export const getNatStatisticsNegative = (param) => {
	return axios.request({
		url: baseURL + 'admin/NatStatisticsNegative',
		method: 'post',
		data: param
	})
}
export const getAreaTotalNat = (param) => {
	return axios.request({
		url: baseURL + 'admin/get/NatnumOfArea',
		method: 'post',
		data: param
	})
}
export const getAreaTodayNat = (param) => {
	return axios.request({
		url: baseURL + 'admin/get/TodayNatnumOfArea',
		method: 'post',
		data: param
	})
}
export const getNatResult = (param) => {
	return axios.request({
		url: baseURL + 'admin/getAllNatResult',
		method: 'post',
		data: param
	})
}

//风险区相关
export const getArea = () => {
	return axios.request({
		url: baseURL + 'admin/getAllRiskArea',
		method: 'get'
	})
}
export const addArea = (param) => {
	return axios.request({
		url: baseURL + 'admin/addRiskArea',
		method: 'post',
		data: param
	})
}
export const deleteArea = (param) => {
	return axios.request({
		url: baseURL + 'admin/deleteRiskArea',
		method: 'post',
		data: param
	})
}
export const editArea = (param) => {
	return axios.request({
		url: baseURL + 'admin/editRiskArea',
		method: 'post',
		data: param
	})
}

//疫情知识相关
export const getCovTelephone = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovKnowledge/telephone/get',
		method: 'post',
		data: param
	})
}
export const updateCovTelephone = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovKnowledge/telephone/update',
		method: 'post',
		data: param
	})
}

//发布核酸通知
export const notifyTest = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovAllTest/submit',
		method: 'post',
		data: param
	})
}

//出行防疫政策相关
export const getPolicy = (param) => {
	return axios.request({
		url: baseURL + 'getTravelPolicy',
		method: 'post',
		data: param
	})
}
export const getSingleCityPolicy = (param) => {
	return axios.request({
		url: baseURL + 'getSingleCityPolicy',
		method: 'post',
		data: param
	})
}
export const editPolicy = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovPolicy/edit',
		method: 'post',
		data: param
	})
}

// 申诉服务相关
export const getCityConsult = (param) => {
	return axios.request({
		url: baseURL + 'admin/getCityConsult',
		method: 'post',
		data: param
	})
}
export const handleConsult = (param) => {
	return axios.request({
		url: baseURL + 'admin/handleConsult',
		method: 'post',
		data: param
	})
}
export const getConsultStatusvalue = (param) => {
	return axios.request({
		url: baseURL + 'admin/getConsultStatusvalue',
		method: 'post',
		data: param
	})
}
export const getCityAppeal = (param) => {
	return axios.request({
		url: baseURL + 'admin/getCityAppeal',
		method: 'post',
		data: param
	})
}
export const handleAppeal = (param) => {
	return axios.request({
		url: baseURL + 'admin/handleAppeal',
		method: 'post',
		data: param
	})
}
export const getAppealStatusvalue = (param) => {
	return axios.request({
		url: baseURL + 'admin/getAppealStatusvalue',
		method: 'post',
		data: param
	})
}
export const setRedCode = (param) => {
	return axios.request({
		url: baseURL + 'admin/setRedCode',
		method: 'post',
		data: param
	})
}
export const setYellowCode = (param) => {
	return axios.request({
		url: baseURL + 'admin/setYellowCode',
		method: 'post',
		data: param
	})
}
export const setGreenCode = (param) => {
	return axios.request({
		url: baseURL + 'admin/setGreenCode',
		method: 'post',
		data: param
	})
}