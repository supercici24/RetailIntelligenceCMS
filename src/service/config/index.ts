export const BASE_URL = 'http://codercba.com:8000'
export const TIME_OUT = 5000

// 分线上(生产)环境和开发环境
// vite默认提供了环境变量
// import.meta.env.MODE :值是production或者devolopment
// import.meta.env.DEV: boolen，是否是开发环境
// import.meta.env.PROD: boolean 是否是正式环境
// import.meta.env.SSR: boolean // 是否是服务端渲染

// if(import.meta.env.DEV){
// BASE_URL = 'http://codercba.com:8000'  开发环境地址
// }else{
// BASE_URL = 'http://codercba.com:8000'  线上环境地址
// }
