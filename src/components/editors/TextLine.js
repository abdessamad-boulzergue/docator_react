import React from 'react'
import AbstractWidget from "./AbstractWidget";
import renderWidget from "../tools/RenderWidget";
import TextStyleEditor from "./TextStyleEditor";

export default class TextLine extends AbstractWidget{

  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  componentDidMount() {
    this.props.onRef(this);
    const self =this;
    const widgets=[];
    this.rt.getChildren(this.props.content).forEach(function (textStyle) {
      let widget = self.wt.createJsonForWidget(textStyle)
      widget.props.bus = self.bus;
      widgets.push(widget)
    });

    this.setState({
      widgets:widgets,
    });

  }
  renderWidgets(options){
    return  this.state.widgets.map(function (widgetJson) {
      return renderWidget(widgetJson,options)
    })
  }

  render() {
    const self=this;
    return (
      <div className="TextLine" contentEditable>
        {
          this.state.widgets.map(function (style) {
            return <TextStyleEditor onRef={ref=>self.state.children.push(ref)}  key={style.props.aposId} {...style.props} />
          })
        }
      </div>
    )
  }
}