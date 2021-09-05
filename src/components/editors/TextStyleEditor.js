import React from 'react'
import AbstractWidget from "./AbstractWidget";

export default class  TextStyleEditor extends AbstractWidget{

  componentDidMount() {
    this.props.onRef(this);
    this.setState({
      content:this.getTextContent(this.props.content),
      style:this.getDefaultStyle()
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getDefaultStyle(){
    return {display:'inline'}
  }
  getTextContent(jsonObject){
    let content =  this.rt.getChildren(jsonObject).join().replace("\n","");
    return content
  }
  handleInput(event){
    console.log(event)
  }
  emitChange(event){
    const newValue =  event.target.textContent;
    if (this.props.onChange &&  newValue !==this.oldContent) {
      this.props.onChange({
          value: event.target.textContent
      });
    }

    this.oldContent = newValue;
  }
  render() {
    return(
      <div className="TextStyle" style={this.state.style} aposid={this.props.aposId}>
        {this.state.content}
      </div>
    )
  }
}