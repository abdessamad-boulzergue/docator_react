import DocatorAjax from "./DocatorAjax";


const docatorDomain =  function () {
    const docAjax = new DocatorAjax();
    const GET_USERS="/users";
    const GET_DOCUMENTS="/document";
    const GET_WORKFLOW="/workflow";
    const GET_JOB_TICKET_CONFIG="/jobTicket/config";
    const GET_PLUGIN="/plugin";
    const GET_ALL_PLUGINS="/plugin/all";
    const USER_LOGIN="/login";
    const SAVE_WORKFLOW="/workflow/save";
    const RUN_WORKFLOW="/workflow/run";
    const NEW_WORKFLOW="/workflow/new";
    const LOAD_WORKFLOW="/workflow/load";
    const LOAD_RESOURCE_TYPES="/resource/types";
    const SAVE_RESOURCE="/resource";
    const LOAD_RESOURCES="/resource/all";
    const DELETE_RESOURCE="/resource";
    const SOCKET_CONNECT="/aposWebSocket";
    const DOCUMENT="/document";
    const NEW_DOCUMENT="/document/new";
    return {
        getUsers : function () {
            return docAjax.get(GET_USERS)
        },
        login : function (credential) {
            return docAjax.post(USER_LOGIN,credential)
        },
        connect : function () {
            return docAjax.connect(SOCKET_CONNECT)
        },
        setAuthToken(authToken){
            docAjax.setAuthToken(authToken);
        },
        getWorkflow : function (resourceId) {
            return docAjax.get(this.buildUrl(GET_WORKFLOW,{id:resourceId}))
        },
        getJobTicketConfig(jobConfigId){
            return docAjax.get(this.buildUrl(GET_JOB_TICKET_CONFIG,null,[jobConfigId]))
        },
        getPlugin : function (srcKey,key) {
            return docAjax.get(this.buildUrl(GET_PLUGIN,{srcKey:srcKey,key:key}))
        },
        getPlugins : function () {
            return docAjax.get(this.buildUrl(GET_ALL_PLUGINS))
        },
        createWorkflow : function () {
            return docAjax.post(NEW_WORKFLOW);
        },
        createDocument : function () {
            return docAjax.post(NEW_DOCUMENT);
        },
        saveWorkflow : function (workflowJson) {
            return docAjax.post(SAVE_WORKFLOW,
              {workflow:encodeURIComponent(workflowJson)}
            )
        },
        saveDocument : function (json) {
            return docAjax.post(DOCUMENT,encodeURIComponent(json))
        },
        runWorkflow : function (workflowId) {
            return docAjax.post(this.buildUrl(RUN_WORKFLOW, {workflowId:workflowId}))
        },
        loadWorkflow : function (id) {
            return docAjax.get(this.buildUrl(LOAD_WORKFLOW,{id:id}))
        },
        loadDocument : function (id) {
            return docAjax.get(this.buildUrl(DOCUMENT,{id:id}))
        },
        // RESOURCES **************************************************************
        saveResource: function(resource){
            return docAjax.post(SAVE_RESOURCE, resource)
        },
        getResourceTypes: function(){
            return docAjax.get(this.buildUrl(LOAD_RESOURCE_TYPES))
        },
        getResources: function(){
            return docAjax.get(this.buildUrl(LOAD_RESOURCES))
        },
        deleteResource: function(id){
            return docAjax.delete(this.buildUrl(DELETE_RESOURCE,null,[id]))
        },
        //END  RESOURCES **************************************************************
        getDocument : function () {
            return docAjax.get(GET_DOCUMENTS)
        },

        encodePostParams: function(params){
            let  encodeParams=[];
            if(params!=null && Object.keys(params).length>0) {
                Object.keys(params).forEach(function (key) {
                    encodeParams.push(key.concat("=").concat(encodeURIComponent(params[key])));
                })
            }
            return encodeParams.join("&")
        },
        buildUrl: function(url, params,pathArgs){
            if(pathArgs!=null && Array.isArray(pathArgs) && pathArgs.length>0) {
                pathArgs.forEach(function (arg) {
                    url = url.concat("/").concat(arg);
                })
            }
            if(params!=null && Object.keys(params).length>0) {
                url = url.concat('?');
                Object.keys(params).forEach(function (key) {
                    url = url.concat(key).concat("=").concat(params[key]).concat("&");
                    
                })
            }
            return url
        },

    }
}

export default docatorDomain;