import '../css/welcomepage.css'
import React from 'react'
import EditToolbar from './EditorToolbar'
import AbstractWelcomePage from "./AbstractWelcomePage";
import DocumentEditor from "./editors/DocumentEditor";
import {AjaxContext} from './ajax/ajaxContext'
export default class HomePage  extends React.Component {

  render(){
    return(
      <AbstractWelcomePage
        header={<EditToolbar/>}
      >
        <h3>
          <AjaxContext.Consumer>
            {
              ajaxCtx=>( <DocumentEditor ajax={ajaxCtx.ajax} /> )
            }
          </AjaxContext.Consumer>

        </h3>
      </AbstractWelcomePage>
    )
  }
}