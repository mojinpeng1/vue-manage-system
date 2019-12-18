import axios from 'axios';
import cityService from '../api/CityApi'
import { Loading, Message } from 'element-ui';


const service = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000
});

// 封装所有请求api进入
const Http = {}

for (let key in cityService) {
    let api = cityService[key];
    Http[key] = async function (
        params,// 请求参数  get: url   put,post,patch:data   delete:url
        isFormData,// 标识是否是form-data请求
        config = {}  // 配置参数
    ) {
        let newParams = {};
        // content-type 是否是form-data的判断
        if (params && isFormData) {
            newParams = new FormData();
            for (let param in params) {
                newParams.append(param, params[param]);
            }
        } else {
            newParams = params;
        }

        // 不同的请求判断
        let response = null;
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await service[api.method](api.url, newParams, config);
            } catch (error) {
                response = error;
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams;
            try {
                response = await service[api.method](api.url, config);
            } catch (err) {
                response = err;
            }
        }
        return response;

    }
}

let loading;
// 页面加载效果
function startLoading() {
    Loading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close();
}

// 拦截器
service.interceptors.request.use(
    // 请求前
    req => {
        // startLoading();
        return req;
    },
    // 请求错误
    err => {
        // endLoading();
        Message.error("错了哦,这是一条请求错误提示!");
    })

service.interceptors.response.use(
    // 响应成功
    res => {
        // endLoading();
        console.log(res.data)
        return res.data;

    },
    // 响应错误
    err => {
        // endLoading();
        console.log(err);
        Message.error('服务器内部错误...');
    }
)

export default Http;
