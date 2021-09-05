import axios from "axios";

export default class DocatorAjax {
        constructor() {
          this.ROOT_URL  = 'http://127.0.0.1:8083';
          this.WS_ROOT_URL  = 'ws://127.0.0.1:8083';
          this.AJAX_API = this.ROOT_URL;
          this.authToken="";
        }
        setAuthToken(authToken){
          localStorage.setItem('jwtToken',authToken)
        }
        getAuthToken(){
          return localStorage.getItem('jwtToken');
        }
        getAxios(method,url,dataToSend){
            return axios({
                method: method,
                url: url,
                json:true,
                data:dataToSend,
                 headers: {
                  'Authorization': 'Bearer '+this.getAuthToken(),
                 'Content-Type': 'application/json; charset=utf-8'
                }
            })
        }
        get(url,args){
          return this._fetch("get",url,args)
        }
        delete(url,args){
          return this._fetch("delete",url,args)
        }
        post(url,args){
            return this._fetch("post",url,args)
        }
        connect(url){
          url = url.startsWith(this.WS_ROOT_URL)? url : this.WS_ROOT_URL+url;
          return new Promise(
            function (resolve, reject) {
              try {
                const ws= new WebSocket(url);
                ws.onopen = function() {
                  console.log("WSocket connected");
                  resolve(ws)
                }
              }catch (e) {
                reject(e)
              }


            })
        }
        _fetch(method,url,args){
            url = url.startsWith(this.ROOT_URL)? url : this.AJAX_API+url;
            const self= this;
            return new Promise(
                function (resolve, reject) {
                    self.getAxios(method,url,args)
                             .then((response)=> {
                                    if (response.status ===200) {
                                         resolve(response.data);
                                    }
                                    else{
                                        const jwtError = {status : response.response.status, message:response.response.data.message, path:response.response.data.path};
                                        reject(jwtError);
                                    }
                            }).catch((error)=> {
                                let jwtError = {}
                                if (error && error.response)
                                  jwtError = {status : error.response.status, message:error.response.data.message, path:error.response.config.url};
                                else
                                    jwtError = {status :error.status, message:error.message}
                                 reject(jwtError);
                            });
                });
        }
}