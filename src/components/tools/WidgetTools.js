import ResourceTools from './ResourceTools';

 export default class WidgetTools{
        constructor() {
            this.rt  = new ResourceTools()
        }
            createJsonForWidget (resource) {
              return (resource===null)? {} : {
                        name:this.rt.getResourceType(resource),
                        props:{
                            bus: null,
                            aposId:this.rt.randomUUID(),
                            id:this.rt.getResourceIdStr(resource) ,
                            type:this.rt.getResourceType(resource),
                            content: this.rt.getContent(resource),
                            attributes: this.rt.getAttributes(resource)
                        }

                    };
            }
            removeNode(domNode){
                if (domNode.remove) {
                    domNode.remove();
                } else {
                    domNode.removeNode(true);  //For IE
                }
            }
          isDeleteEvent(event){
            return  event.keyCode===8
          }
            selectionRemoveAllRanges(sel){
                if(this.isInternetBrowserIE()){
                    const range = document.body.createTextRange();
                    range.collapse();
                    range.select();
                }
                else{
                    sel.removeAllRanges();
                }
            }
            isInternetBrowserIE () {
                const ua = window.navigator.userAgent;

                const msie = ua.indexOf('MSIE ');
                if (msie > 0) {
                    // IE 10 or older => return version number
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                }

                const trident = ua.indexOf('Trident/');
                if (trident > 0) {
                    // IE 11 => return version number
                    const rv = ua.indexOf('rv:');
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                }

                const edge = ua.indexOf('Edge/');
                if (edge > 0) {
                    // IE 12 => return version number
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                }

                // other browser
                return false;
            }
            dropHandle (event,callback) {
                const dropData =event.dataTransfer.getData("text");
                if(dropData && dropData.length>0) {
                    const jsonData = JSON.parse(dropData);
                    const dataResource = this.rt.getDefaultJson(jsonData.type);
                   const widget = this.createJsonForWidget(dataResource);
                   callback(widget);
                }

            }
            getRangeFromSelection(){
              const sel = document.getSelection();
              if(sel && sel.rangeCount > 0) {
                return  sel.getRangeAt(0);
              }
              return null;
            }
            afterWidgetCreat (node , cssClass) {
                node.style.setProperty("position", "relative");
                const labelNode = document.createElement('div');
                labelNode.classList.add("actionBase");
                labelNode.classList.add("sefasEditorPosition");
                labelNode.classList.add(cssClass);
                labelNode.style.setProperty("display", "block");
                labelNode.style.setProperty("height", node.style.height + "px");
                document.body.appendChild(labelNode);
            }
    }
