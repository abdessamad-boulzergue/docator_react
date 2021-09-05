import DocatorDomain from "./DocatorDomain";

class AposSocketResponse {
    constructor(obj){
        this.response = obj;
    }
    getStatus(){
        return this.response.status;
    }
    getException(){
        return this.response.exception;
    }
    getType(){
        return this.response.type;
    }
    getData(){
        return this.response;
    }
    isRegister(){
        return this.response && this.response.type && this.response.type==="register";
    }
    isException(){
        return this.response && this.response.exception ;
    }
}

export default class AjaxLoader {
    constructor() {
       // this.onAuthError = onAuthError || function() {};
        this.docaDomain = new DocatorDomain();
        this.socket=null;
        this.topics={};
    }
    onAuthError(){
    }
     _errorHandle(error) {
        console.log(error)
        if(error.status ===401)
            this.onAuthError();
    }
    // RESOURCES **************************************************************
    getResourceTypes(callback){
        const deferred= this.docaDomain.getResourceTypes();
        this.managePromiseResponse(deferred,callback)
    }
    getResources(callback){
        const deferred= this.docaDomain.getResources();
        this.managePromiseResponse(deferred,callback)
    }
    deleteResource(id,callback){
        const deferred= this.docaDomain.deleteResource(id);
        this.managePromiseResponse(deferred,callback)
    }
    // END RESOURCES **********************************************************
    // WORKFLOW **********************************************************
    saveResource(resource, callback){
        const deferred= this.docaDomain.saveResource(resource);
        this.managePromiseResponse(deferred , callback)
    }
    createWorkflow(callback){
        const deferred= this.docaDomain.createWorkflow();
        this.managePromiseResponse(deferred , callback)
    }
    createDocument(callback){
        const deferred= this.docaDomain.createDocument();
        this.managePromiseResponse(deferred , callback)
    }
    saveWorkflow(workflowJson){
        const deferred= this.docaDomain.saveWorkflow(workflowJson);
        this.managePromiseResponse(deferred)
    }
    saveDocument(json){
        const deferred= this.docaDomain.saveDocument(json);
        this.managePromiseResponse(deferred)
    }
    runWorkflow(workflowId){
        const deferred= this.docaDomain.runWorkflow(workflowId);
        this.managePromiseResponse(deferred)
    }
    loadWorkflow(id,callback){
        const deferred= this.docaDomain.loadWorkflow(id);
        this.managePromiseResponse(deferred,callback)
    }
    loadDocument(id,callback){
        const deferred= this.docaDomain.loadDocument(id);
        this.managePromiseResponse(deferred,callback)
    }
    getWorkflow(resourceId, callback) {
        const deferred= this.docaDomain.getWorkflow(resourceId);
        this.managePromiseResponse(deferred,callback)
    }
    // END WORKFLOW **********************************************************
    // JOB CONFIG *************************************************************
    createJobConfiguration(){
    }
    getJobTicketConfig(id,callback){
        const deferred= this.docaDomain.getJobTicketConfig(id);
        this.managePromiseResponse(deferred,callback)
    }
    // PLUGINS *************************************************************
    getPlugin(srcKey,key,callback){
        const deferred= this.docaDomain.getPlugin(srcKey,key);
        this.managePromiseResponse(deferred,callback)
    }
    loadPlugins (callback){
            const deferred= this.docaDomain.getPlugins();
            this.managePromiseResponse(deferred,callback)
        }
    // END PLUGINS **********************************************************
    // USERS **********************************************************
        getUsers(callback) {
            const deferred= this.docaDomain.getUsers();
            this.managePromiseResponse(deferred,callback)
        }
        login(username, password, callback,onLoginFails) {
            const deferred= this.docaDomain.login({username:username,password:password});
            const onloginSuccess=function (authToken) {
                console.log(authToken);
                if(authToken && authToken.token !=null) {
                    this.docaDomain.setAuthToken(authToken.token)
                    callback();
                }
            }.bind(this);
            this.managePromiseResponse(deferred,onloginSuccess,onLoginFails)
        }
    // END USERS **********************************************************
    // WEB SOCKET **********************************************************
    pushTopic(topic,callback){
        // eslint-disable-next-line no-prototype-builtins
        if(!this.topics.hasOwnProperty(topic)){
                this.topics[topic] = []
        }
        if(this.topics[topic].indexOf(callback) ===-1){
            this.topics[topic].push(callback)
        }
    }
    buildSendData(type,topic){
        return {
            type:type,
            topic:topic
        }
    }
    prepareDataToSend(object){
        if(typeof object ==="object"){
            object = JSON.stringify(object)
        }
        return object; //encodeURIComponent(object);
    }
    register(topic,callback,onRegister){
        const self = this;
        if(this.socket===null || this.socket.readyState!== this.socket.OPEN ||
          // eslint-disable-next-line no-prototype-builtins
          !(self.topics.hasOwnProperty(topic) && self.topics[topic].indexOf(callback)!==-1) ){
            const deferred = this.docaDomain.connect();
            let socketConnect = function (socket) {
                socket.onmessage = function (data) {
                    const socketResponse = new  AposSocketResponse(JSON.parse(data.data));
                    if(socketResponse.isRegister()){
                        self.pushTopic(topic,callback);
                        onRegister();
                    }
                    // eslint-disable-next-line no-prototype-builtins
                    else if(socketResponse.isException()) {
                        window.$log.error(socketResponse.getException());
                    }
                    // eslint-disable-next-line no-prototype-builtins
                    else if(self.topics.hasOwnProperty(socketResponse.getType())) {
                        const registerCalls = self.topics[socketResponse.getType()];
                        for(let i in registerCalls){
                            registerCalls[i](socketResponse.getData())
                        }
                    }else{
                       console.error("no callback registered for ", socketResponse.getType() , "data : ", socketResponse.getData())
                    }
                }
                self.socket = socket;
                self.socket.send(self.prepareDataToSend(self.buildSendData("register",topic)));
            }
            this.managePromiseResponse(deferred, socketConnect)
        }else{
            onRegister();
        }
    }
    // END WEB SOCKET **********************************************************

    managePromiseResponse(deferred,callback, errorCallback){
          const self = this;
            deferred.then(function (result) {
                if(callback) {
                    callback(result);
                }
            }, function (error) {
                if(errorCallback)
                    errorCallback(error)
                else
                    self._errorHandle(error)
            })
        }
}