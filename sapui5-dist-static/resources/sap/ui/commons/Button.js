/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.commons.Button");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Button",{metadata:{interfaces:["sap.ui.commons.ToolbarItem"],publicMethods:["focus"],library:"sap.ui.commons",properties:{"text":{type:"string",group:"Appearance",defaultValue:''},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"helpId":{type:"string",group:"Behavior",defaultValue:''},"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},"iconHovered":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},"iconSelected":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},"iconFirst":{type:"boolean",group:"Appearance",defaultValue:true},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"styled":{type:"boolean",group:"Appearance",defaultValue:true},"lite":{type:"boolean",group:"Appearance",defaultValue:false},"style":{type:"sap.ui.commons.ButtonStyle",group:"Appearance",defaultValue:sap.ui.commons.ButtonStyle.Default}},associations:{"ariaDescribedBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},"ariaLabelledBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{"press":{}}}});sap.ui.commons.Button.M_EVENTS={'press':'press'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.ui.commons.Button.prototype);
sap.ui.commons.Button.prototype.onclick=function(e){if(this.getEnabled()){this.firePress({})}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Button.prototype.onsapenter=function(e){e.stopPropagation()};
sap.ui.commons.Button.prototype.onmousedown=function(e){this.handleMouseDown(e,true)};
sap.ui.commons.Button.prototype.handleMouseDown=function(e,f){if(this.getEnabled()&&this.getRenderer().onactive){this.getRenderer().onactive(this)}if(f&&(!!sap.ui.Device.browser.webkit||(!!sap.ui.Device.browser.firefox&&navigator.platform.indexOf("Mac")===0))){if(sap.ui.Device.browser.mobile&&!!sap.ui.Device.browser.webkit){this.focus()}jQuery.sap.delayedCall(0,this,function(){this.focus()})}};
sap.ui.commons.Button.prototype.onmouseup=function(e){if(this.getEnabled()&&this.getRenderer().ondeactive){this.getRenderer().ondeactive(this)}};
sap.ui.commons.Button.prototype.onmouseout=function(e){if(this.getEnabled()&&this.getRenderer().onmouseout){this.getRenderer().onmouseout(this)}};
sap.ui.commons.Button.prototype.onmouseover=function(e){if(this.getEnabled()&&this.getRenderer().onmouseover){this.getRenderer().onmouseover(this)}};
sap.ui.commons.Button.prototype.onfocusout=function(e){if(this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this)}};
sap.ui.commons.Button.prototype.onfocusin=function(e){if(this.getEnabled()&&this.getRenderer().onfocus){this.getRenderer().onfocus(this)}};
sap.ui.commons.Button.prototype.setIcon=function(i){this._setIcon(i,"icon");return this};
sap.ui.commons.Button.prototype.setIconHovered=function(i){this._setIcon(i,"iconHovered");return this};
sap.ui.commons.Button.prototype.setIconSelected=function(i){this._setIcon(i,"iconSelected");return this};
sap.ui.commons.Button.prototype._setIcon=function(i,p){var I=this.getProperty(p);var s=true;if((!I&&i)||(I&&!i)){s=false}this.setProperty(p,i,s);if(s==true&&this.getDomRef()&&this.getRenderer().changeIcon){this.getRenderer().changeIcon(this)}};
