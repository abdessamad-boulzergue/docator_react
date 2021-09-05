import React from 'react'
import WidgetTools from "../tools/WidgetTools";
import ResourceTools from "../tools/ResourceTools";

export default class AbstractWidget extends React.Component {

  constructor(props) {
    super(props);
    this.wt = new WidgetTools();
    this.rt = new ResourceTools();
    this.state = {
      widgets: this.parseContent(),
      widgetAttributes: props.attributes, type: props.type, children: []
    };
    this.initKeys();
  }

  initKeys() {
    this.keys = {
      ENTER: 13
    }
  }

  parseContent() {
    const self = this;
    return this.rt.getChildren(this.props.content).map(function (child) {
      return self.wt.createJsonForWidget(child);
    });
  }

  createWidgets(options) {
    let self = this;
    return this.state.widgets.map(function (widgetJson) {
      return self.createWidget(widgetJson, options)
    })
  }

  createWidget(resourceJson, options) {
    throw new Error("createWidget not implemented in  : " + this.getType())
  }

  getWidgetId() {
    return this.props.aposId;
  }

  getAttributes() {
    return this.state.widgetAttributes;
  }

  getJson() {
    const self = this;
    const jsonObj = this.rt.createBasicElement(this.getType(), true);
    this.rt.setAttributes(jsonObj, this.getAttributes());
    const content = this.getContent();
    if (Array.isArray(content)) {
      content.forEach(function (child) {
        self.rt.addContentChild(jsonObj, child)
      })
    }
    return jsonObj;
  }

  getType() {
    return this.state.type
  }

  toJsonFilter() {
    return true;
  }

  getContent() {
    return this.state.children.filter(this.toJsonFilter).map(function (widget) {
      return widget.getJson();
    });
  }

  getWidget(widgets, id) {
    return widgets.filter(function (wg) {
      return wg.props.aposId === id
    })[0];
  }

  getWidgetById(id) {
    return this.state.widgets.filter(function (wg) {
      return wg.props.aposId === id
    })[0];
  }

}