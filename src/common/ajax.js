import wepy from 'wepy'

// 域名配置
import domainConfig from '@/config/index'

class Ajax {
  constructor (options) {
    this.$http = function(config) {
        return wepy.request(config)
    }
    this.baseUrl = options && options.baseUrl ? options.baseUrl : domainConfig.build.baseUrl
    this.queryMap = {}
    this.createMap = {}
    this.putWayMap = {}
    this.deleteMap = {}
  }

  setConfig (config) {
    // 定义config
    let defaultConfig = {
      header: {
        'channelType': 'wx',
        'content-type': 'application/json' // 默认值
      }
    }
    // 获取access_token
    let accesstoken = wepy.getStorageSync('access_token')
    defaultConfig.header['access-token'] = accesstoken

    config = Object.assign(defaultConfig, config)
    return config
  }

  parse(path, id) {
    if (typeof id === 'string') {
      return path + '/' + id
    }
    if (typeof id === 'object') {
      let search = '?'
      let counter = 0
      for (let key in id) {
        if (counter) search += '&'
        search += key + '=' + id[key]
        counter++
      }
      return path + search
    }
    return path
  }

  query(path) {
    if (!this.queryMap[path]) { // cache path closure
      let url = ''
      this.queryMap[path] = (id, expand, config1 = {}) => {
        // 合并config
        let config = Object.assign({}, config1)
        url = expand ? (path + '/' + expand) : path
        let newPath = id ? this.parse(url, id) : url

        let baseUrl = config.baseUrl || this.baseUrl
        config = this.setConfig(Object.assign({
          method: 'GET',
          url: baseUrl + newPath
        }, config))

        return this.$http(config).then((res) => {
          return res.header ? res.data : res
        }, (res) => {
          return res
        })
      }
    }
    return this.queryMap[path]
  }

  create(path) {
    if (!this.createMap[path]) { // cache path closure
      let url = ''
      this.createMap[path] = (data, expand, config1 = {}) => {
        // 合并config
        let config = Object.assign({}, config1)
        url = expand ? (path + '/' + expand) : path

        let baseUrl = this.baseUrl
        config = this.setConfig(Object.assign({
          method: 'POST',
          url: baseUrl + url,
          data: data,
          dataType: 'json'
        }, config))

        return this.$http(config).then((res) => {
          return res.header ? res.data : res
        }, res => {
          return res
        })
      }
    }
    return this.createMap[path]
  }

  putWay(path) {
    if (!this.putWayMap[path]) { // cache path closure
      let url = ''
      this.putWayMap[path] = (data, expand, config1 = {}) => {
        // 合并config
        let config = Object.assign({}, config1)
        url = expand ? (path + '/' + expand) : path

        let baseUrl = this.baseUrl
        config = this.setConfig(Object.assign({
          method: 'PUT',
          url: baseUrl + url,
          data: data,
          dataType: 'json'
        }, config))

        return this.$http(config).then((res) => {
          return res.header ? res.data : res
        }, res => {
          return res
        })
      }
    }
    return this.putWayMap[path]
  }

  delete(path) {
   if (!this.deleteMap[path]) {
       let url = '';
       this.deleteMap[path] = (data, expand, config1 = {}) => {
           let config = Object.assign({}, config1);

           url = expand ? (url = path + '/' + expand) : path;
           let baseUrl = config.baseUrl || this.baseUrl;
           config = this.setConfig(Object.assign({
               method: 'DELETE',
               url: baseUrl + url,
               data: data,
               dataType: 'json'
           }, config));

           return this.$http(config).then((res) => {
               return res.data;
           }, (res) => {
               return res;
           });
       }
   }
   return this.deleteMap[path];
  }
  // 小程序暂不支持patch（局部修改）请求
}

export default new Ajax()
