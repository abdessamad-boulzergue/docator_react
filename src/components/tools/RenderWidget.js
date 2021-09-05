import React from 'react'
import TextEditorWidget from "../editors/TextEditor";
import TextStyleEditor from "../editors/TextStyleEditor";
import TextLine from "../editors/TextLine";
const widgets = {
  TextEditor : TextEditorWidget,
  Text : TextEditorWidget,
  TextStyle:TextStyleEditor,
  "TextLine":TextLine
}
/**
 *
 * @param jsonWidget :
 * @param options
 * @returns {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
 */
export default function renderWidget(jsonWidget,options) {

     return React.createElement(
         getReactElement(jsonWidget.name),
       {key:jsonWidget.props.aposId , ...jsonWidget.props, ...options },
       []
     )
}

function getReactElement(name){
  if(Object.keys(widgets).indexOf(name) !==-1){
    return widgets[name];
  }else {
    throw new Error("Unknown widget : " + name)
  }
}