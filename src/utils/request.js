import axios from 'axios'

// 创建axios实例

// var BASE_API = '';
// if (process.env.NODE_ENV == 'production') {
//     BASE_API = '"http://193.112.153.155:3001"';
// }else{
//     BASE_API = '"http://193.112.153.155:3001"';
// }
const service = axios.create({
  baseURL: 'http://127.0.0.1', // api的base_url
  timeout: 5000 // 请求超时时间
})

export default service
