import React from "react";
import AbstractWidget from "./AbstractWidget";
import TextLine from "./TextLine";
export default class TextEditor extends AbstractWidget{


  componentDidMount() {
    this.props.onRef(this);
      this.setState({
      style:this.getDefaultStyle()
     });

  }

  getTextContent(jsonObject){
    return this.rt.getChildren(jsonObject).join();
  }
  getDefaultStyle(){
    return {display:'block'}
  }
  isTextEditor(node){
    return node && node.nodeType === 1 && node.className.indexOf("TextEditor") !==-1;
  }
  isRawText(node){
    return node && node.nodeType === 3 ;
  }
  isTextStyleEditor(node){
    return node && node.nodeType === 1 && node.className.indexOf("TextStyleEditor") !==-1;
  }
  getParentTextStyle(node){
    if(this.isRawText(node))
      return node.parentElement
    else if (this.isTextStyleEditor(node))
      return node
    return null;
  }
  onKeyDown(event){
    if(event.keyCode ===this.keys.ENTER){
      event.stopPropagation();
      event.preventDefault();
      this.splitLine();
    }
  }
  splitLine(){
  }
  getTextStyleWidget(node){
    if(this.isTextStyleEditor(node)) {
      return this.getWidgetById(node.getAttribute('aposid'));
    }else{
      return null;
    }
  }
  render() {
    let self =this;
    return(
      <div className="TextEditor" style={this.state.style} aposid={this.props.aposId}
           onKeyDown={this.onKeyDown.bind(this)}
      >
          {
            this.state.widgets.map(function (line) {
              return <TextLine onRef={ref=>self.state.children.push(ref)} key={line.props.aposId} {...line.props} />
            })
          }
      </div>
    )
  }
}