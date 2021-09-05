import React from 'react'
import AjaxLoader from "./AjaxLoader";

 export const AjaxContext = React.createContext({
  ajax: new AjaxLoader()
});
