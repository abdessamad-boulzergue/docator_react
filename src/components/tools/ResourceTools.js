import GenericTools from './GenericTools'

export default  class ResourceTools extends GenericTools{
            getContent(basicElement){
                return this.getChildNodeOfType(basicElement, this.CONTENT_);
            }
          randomUUID () {
              const  replacer = function (c) {
                return (((c ^ crypto.getRandomValues(new Uint8Array(1))[0]) & 15) >> c / 4).toString(16)
              }
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, replacer);
          }
          utf8_to_b64 ( str ) {
              return window.btoa(unescape(encodeURIComponent( str )));
          }
          b64_to_utf8 ( str ) {
              return decodeURIComponent(escape(window.atob( str )));
            }
            getDefaultJson(type,args){
                let data={};
                switch (type) {
                    case this.TEXT_EDITOR_TYPE:
                        data = this.getDefaultTextEditorJson(args)
                        break
                    case this.IMAGE_TYPE:
                        data = this.getDefaultImageEditorJson()
                        break
                    case this.TABLE_EDITOR_TYPE:
                        data = this.getDefaultTableEditorJson()
                        break
                    case this.WF_ACTIVITY_TYPE:
                        data = this.getDefaultActivity();
                        break
                    default:
                        throw Error("drag of unknown type: "+ type + " is not supported")
                }
                return data;
            }
          getDefaultWorkflow({attributes,activities}){

            const workflowNode = this.createBasicElement(this.WF_REPOSITORY_WORKFLOW_TYPE,false);
            this.setAttributes(workflowNode,attributes);
           // const content = this.getContent(workflowNode);

            const xpdlNode = this.createBasicElement(this.WF_XPDL_TYPE);
            const xpdlPackageNode = this.createBasicElement(this.WF_XPDL_PACKAGE_TYPE);
            const xpdlPlugSrcNode = this.createBasicElement(this.WF_XPDL_WORKFLOW_PLUGIN_SOURCES_TYPE);
            const xpdlProcessesNode = this.createBasicElement(this.WF_XPDL_WORKFLOW_PROCESSES_TYPE);
            const xpdlProcessNode = this.createBasicElement(this.WF_XPDL_WORKFLOW_PROCESS_TYPE);
            const activitiesNode = this.createBasicElement(this.WF_ACTIVITIES_TYPE);
            const transitionsNode = this.createBasicElement(this.WF_TRANSITIONS_TYPE);

            if(Array.isArray(activities)){
              activities.forEach(function (activity) {
                const activityNode = this.getDefaultActivity(activity.extendedAttributes);
                this.getChildren(activitiesNode).push(activityNode);
              })
            }

            this.getChildren(xpdlProcessNode).push(activitiesNode);
            this.getChildren(xpdlProcessNode).push(transitionsNode);
            this.getChildren(xpdlProcessesNode).push(xpdlProcessNode);
            this.getChildren(xpdlPackageNode).push(xpdlPlugSrcNode);
            this.getChildren(xpdlPackageNode).push(xpdlProcessesNode);
            this.getChildren(xpdlNode).push(xpdlPackageNode);

            this.getChildren(workflowNode).push(xpdlNode);
            return workflowNode;
          }
            getDefaultTransition({ extendedAttributes,attributes}){
                const transitionNode = this.createBasicElement(this.WF_TRANSITION_TYPE);
                this.setAttributes(transitionNode,{...attributes});

                const descriptionNode = this.createBasicElement(this.WF_Description_TYPE);

                const extendAttrsNode = this.createBasicElement(this.WF_ExtendedAttributes_TYPE);
                this.setAttributes(extendAttrsNode,{...extendedAttributes});


                this.getChildren(transitionNode).push(descriptionNode)
                this.getChildren(transitionNode).push(extendAttrsNode)
                return transitionNode;
            }
            getDefaultImplementation({extendedAttributes, attributes}){
              const implementationNode = this.createBasicElement(this.WF_Implementation_TYPE);
              const toolNode = this.getDefaultXpdlTool({extendedAttributes,attributes});
              this.getChildren(implementationNode).push(toolNode)

              return implementationNode;
            }
            getDefaultXpdlTool({extendedAttributes}){
              const toolNode = this.createBasicElement(this.WF_Tool_TYPE);
              const attrs ={};
              attrs[this.ATTR_TYPE] = this.WF_APPLICATION_TYPE
              this.setAttributes(toolNode,attrs);
              const extendAttrsToolNode = this.createBasicElement(this.WF_ExtendedAttributes_TYPE);
              this.setAttributes(extendAttrsToolNode,extendedAttributes);
              this.getChildren(toolNode).push(extendAttrsToolNode)
              return toolNode;
            }
          getDefaultPluginSource({attributes}) {

            const plugSrcNode = this.createBasicElement(this.WF_XPDL_WORKFLOW_PLUGIN_SOURCE_TYPE);
            this.setAttributes(plugSrcNode, attributes);
            return plugSrcNode;
          }
            getDefaultActivity({extendedAttributes,attributes}){

                const activityNode = this.createBasicElement(this.WF_ACTIVITY_TYPE);
                this.setAttributes(activityNode,attributes);

                const descriptionNode = this.createBasicElement(this.WF_Description_TYPE);

                const extendAttrsNode = this.createBasicElement(this.WF_ExtendedAttributes_TYPE);
                this.setAttributes(extendAttrsNode,extendedAttributes);

                this.getChildren(activityNode).push(descriptionNode)
                this.getChildren(activityNode).push(extendAttrsNode)

                return activityNode;
            }
            getCellText(basicElement){

                if(this.isBasicElement(basicElement) ){
                    const content = this.getContent(basicElement);
                    if(this.isBasicElement(content)){
                        return this.getChildren(content)[0];
                    }
                }
                return "";
            }
            getDefaultTextEditorJson(args){
                const txtEditorNode = this.createBasicElement(this.TEXT_EDITOR_TYPE,true);
                this.setAttributes(txtEditorNode,{"name":"New Text Editor","resdescid":"-1"});
                const txtStyleNode = this.createBasicElement(this.TEXT_STYLE_TYPE,true);
                this.setAttributes(txtStyleNode,{"name":"New Text Style","resdescid":"-1"});
                if(args!==undefined && args.content !==undefined)
                this.getContent(txtStyleNode)[2].push(args.content)
                this.getContent(txtEditorNode)[2].push(txtStyleNode);
                return txtEditorNode;
            }
              getDefaultTextLineJson(args){
                const txtLineNode = this.createBasicElement(this.TEXT_LINE_TYPE,true);
                if(args && args.attributes && typeof args.attributes ==="object" && Object.keys(args.attributes).length>0){
                  this.setAttributes(txtLineNode,args.attributes);
                }else{
                  this.setAttributes(txtLineNode,this.getDefaultAttributes(this.TEXT_LINE_TYPE));
                }
                if(args && args.content){
                  const txtStyleNode = this.getDefaultTextStyleJson(args);
                  this.addContentChild(txtLineNode,txtStyleNode)
                }
                return txtLineNode;
              }
            getDefaultTextStyleJson(args){
                const txtStyleNode = this.createBasicElement(this.TEXT_STYLE_TYPE,true);
                this.setAttributes(txtStyleNode,{"name":"New Text Style","resourceId":"-1"});
                if(args!==undefined && args.content !==undefined){
                  this.getContent(txtStyleNode)[2].push(args.content)
                }
                return txtStyleNode;
            }
            getDefaultImageEditorJson(){
                const txtEditorNode = this.createBasicElement(this.IMAGE_TYPE);
                this.setAttributes(txtEditorNode,this.getDefaultAttributes(this.IMAGE_TYPE));
                return txtEditorNode;
            }
          getDefaultAttributes(type){
            const attrs = {};
            attrs[this.RESDESC_ID_]="-1";
            if(type===this.TABLE_EDITOR_TYPE){
              attrs[this.ATTR_NAME]="New Table Editor";
            }
            else if(type===this.IMAGE_TYPE){
              attrs[this.ATTR_NAME]="New Image Editor";
            }
            return attrs;
          }
            getDefaultTableEditorJson(){
                const tableEditorNode = this.createBasicElement(this.TABLE_EDITOR_TYPE,true);
                this.setAttributes(tableEditorNode,this.getDefaultAttributes(this.TABLE_EDITOR_TYPE));
                const rowsNode =  this.createBasicElement(this.ROWS_TYPE,true);
                const rowNode =  this.createBasicElement(this.ROW_TYPE,true);
                const cellNode =  this.createBasicElement(this.CELL_TYPE,true);
                const cellNode2 =  this.createBasicElement(this.CELL_TYPE,true);
                const cellParagraphNode =  this.getDefaultTextEditorJson();
                this.getContent(cellNode)[2].push(cellParagraphNode);
                this.getContent(rowNode)[2].push(cellNode);
                this.getContent(rowNode)[2].push(cellNode2);
                this.getContent(rowsNode)[2].push(rowNode);
                this.getContent(rowsNode)[2].push(rowNode);
                this.getContent(tableEditorNode)[2].push(rowsNode);
                return tableEditorNode;
            }
            createBasicElement (beType,withContent) {
                let content = [];
                if(withContent){
                    content = [this.createBasicElement(this.CONTENT_)];
                }
                return [beType, {}, content];
            }
            getResourceIdStr (resource) {
                let result = "";
                if(this.hasAttribute(resource, this.RESOURCE_ORIG_ID_)){
                    result = this.getAttribute(resource, this.RESOURCE_ORIG_ID_);
                }
                else{
                    result = this.getAttribute(resource, this.RESOURCE_ID);
                }
                return result;
            }
        }