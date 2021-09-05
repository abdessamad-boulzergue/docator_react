import React from 'react'
import '../../css/documenteditor.css'
import AbstractWidget from "./AbstractWidget";
import renderWidget from "../tools/RenderWidget";
export default class DocumentEditor extends AbstractWidget{

  componentDidMount() {
    const self = this;
    this.props.ajax.loadDocument(83, function (docModel) {
      let docWidget = self.wt.createJsonForWidget(docModel);
      const widgets=self.rt.getChildren(docWidget.props.content).map(function (jsonChild) {
        return self.wt.createJsonForWidget(jsonChild)
      });
      self.setState({widgets : widgets , update:1})

    })
  }

  renderWidgets(){
    const self =this;
    return  this.state.widgets.map(function (widgetJson) {
      return renderWidget(widgetJson,{
        onRef:ref=>self.state.children.push(ref)
      })
    })
  }
  render() {
    return(
      <div className="documentEditor">
        <div className="documentEditorContent">
          <div className="pageContextContainer" update={this.state.update}>
            {
              this.renderWidgets()
            }
          </div>
        </div>
      </div>
    )
  }
}