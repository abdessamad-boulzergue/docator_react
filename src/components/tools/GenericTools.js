import resourceConst from './ResourceConstantTools'

export default class GenericTools {
  constructor() {
    const self=this;
    Object.keys(resourceConst).forEach(function (key) {
      self[key] = resourceConst[key];
    })
  }
  isBasicElement(value) {
  return value instanceof Array
  && value.length === 3
  && typeof value[this.INDEX_TYPE_] === "string"
  && typeof value[this.INDEX_ATTRIBUTES_] === "object"
  && value[this.INDEX_CHILDREN_] instanceof Array;
}
  getChildren (jsonObject) {
  if (!this.isBasicElement(jsonObject)) {
  return [];
}
  return jsonObject[this.INDEX_CHILDREN_];
}
  getResourceType (basicElement) {
  if (!this.isBasicElement(basicElement)) {
  return this.UNKNOWN_;
}
  return basicElement[this.INDEX_TYPE_];
}
  getChildNodeOfTypeRecursively(basicElement,typeString,nodes){
  if(!nodes)
  nodes=[];
  const self = this;
  let contentArray = this.getChildren(basicElement);
  if(self.getResourceType(basicElement) === typeString){
  nodes.push(basicElement);
}else {
  for(let i =0;i<contentArray.length; i++){
  this.getChildNodeOfTypeRecursively(contentArray[i],typeString,nodes);
}
}
  return nodes;
}
  getChildNodeOfType (basicElement, typeString) {
  const self = this;
  const contentArray = this.getChildren(basicElement);
  const nodes = contentArray.filter(function (element) {
  return (self.getResourceType(element) === typeString)
});
  return nodes[0];
}
  getContentChildren (basicElement) {
  return this.getChildren(this.getContent(basicElement));
}
  setAttribute (resource, attributeName, attributeValue) {
  if (!this.isBasicElement(resource)) {
  return;
}
  resource[this.INDEX_ATTRIBUTES_][attributeName] = attributeValue;
}

  getAttribute (resource, attributeName) {
  if(!this.isBasicElement(resource)){
  return "";
}
  if(resource[this.INDEX_ATTRIBUTES_][attributeName] === undefined){
  const msg = (resource) ? resource.toString() : "null";
  console.log("no " + attributeName + " for this resource : " + msg);
  return "";
}
  return resource[this.INDEX_ATTRIBUTES_][attributeName];
}
  getAttributes (resource) {
  if (!this.isBasicElement(resource)) {
  this.logNotABe(resource);
  return {};
}
  return resource[this.INDEX_ATTRIBUTES_];
}
  hasAttribute (resource, attributeName) {
  if(!this.isBasicElement(resource)){
  return false;
}
  return resource[this.INDEX_ATTRIBUTES_][attributeName] !== undefined;
}
  setAttributes (resource, attributes) {

  if (!this.isBasicElement(resource)) {
  return;
}
  attributes = attributes || {};
  Object.keys(attributes).map(function (key) {
  resource[this.INDEX_ATTRIBUTES_][key] = attributes[key];
}.bind(this))
}
  isContent (be) {
  return this.isBasicElement(be) && be[this.INDEX_TYPE_] === this.CONTENT_;
}
  replaceChild (into, basicElementToPut, where) {
    if (this.isBasicElement(into)) {
      if (this.isBasicElement(basicElementToPut) || typeof basicElementToPut === "string") {
      let iPlace = parseInt(where);
      if (isNaN(iPlace) || iPlace < 0 || iPlace > into[this.INDEX_CHILDREN_].length) {
        iPlace = into[this.INDEX_CHILDREN_].length;
      }
      into[this.INDEX_CHILDREN_][iPlace] = basicElementToPut;
    }
    }
  }
  addChild (into, basicElementToPut, where) {
    if (!this.isBasicElement(into)) {
     return;
    }
  if (!this.isBasicElement(basicElementToPut) && typeof basicElementToPut != "string") {
  this.debug("addInContent: basicElement basicElementToPut must be of basic element type");
  return;
}
  let iPlace = parseInt(where);
  if (isNaN(iPlace) || iPlace < 0 || iPlace > into[this.INDEX_CHILDREN_].length) {
  iPlace = into[this.INDEX_CHILDREN_].length;
}
  into[this.INDEX_CHILDREN_].splice(iPlace, 0, basicElementToPut);
}
  addContentChild (into, basicElementToPut, where) {
  const contentList = this.getChildren(into);
  if (this.isContent(contentList[0])) {
  this.addChild(contentList[0], basicElementToPut, where);
} else {
  console.log("addContentChild : into parameter has no CONTENT node : " + JSON.stringify(into));
}
}
  logNotABe (basicElement) {
  const msg = (basicElement) ? basicElement.toString() : "null";
  console.error("argument is not a basic element : " + msg);
}
}