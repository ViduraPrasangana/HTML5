/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.uiext.inbox.SubstitutionRulesManager");jQuery.sap.require("sap.uiext.inbox.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.uiext.inbox.SubstitutionRulesManager",{metadata:{publicMethods:["bindSubstitutionRules"],library:"sap.uiext.inbox"}});
/*!
 * @copyright@
 */
jQuery.sap.require("sap.uiext.inbox.InboxUtils");jQuery.sap.require("sap.uiext.inbox.SubstitutionRulesManagerConstants");jQuery.sap.require("sap.uiext.inbox.SubstitutionRulesManagerUtils");
sap.uiext.inbox.SubstitutionRulesManager.prototype.init=function(){var c=sap.ui.getCore().getConfiguration().getTheme();this._imgResourcePath=sap.ui.resource('sap.uiext.inbox','themes/'+c+'/img/');this._oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.uiext.inbox");this.sUrl="";this.sPath="/SubstitutionRuleCollection";this.inboxUtils=sap.uiext.inbox.InboxUtils;this.substitutionRulesManagerUtils=sap.uiext.inbox.SubstitutionRulesManagerUtils;this.inboxConstants=sap.uiext.inbox.InboxConstants;this.substitutionConstants=sap.uiext.inbox.SubstitutionRulesManagerConstants};
sap.uiext.inbox.SubstitutionRulesManager.prototype.exit=function(){this.vLayout.destroy();this.vLayout=null;function r(i){var I=sap.ui.getCore().byId(i);I&&I.destroy()}this._oBundle=undefined};
sap.uiext.inbox.SubstitutionRulesManager.prototype.open=function(){this.sUrl=this.getModel().sServiceUrl;this.overlayContainer=this.populateOverlayContainer();this.overlayContainer.open()};
sap.uiext.inbox.SubstitutionRulesManager.prototype.populateOverlayContainer=function(){var t=this;var d=this.getId()+'--';var s=sap.ui.getCore().byId(d+'substitutionOverlayContainer');if(s===undefined){s=new sap.ui.ux3.OverlayContainer(d+"substitutionOverlayContainer");s.setParent(this);s.setOpenButtonVisible(false);s.attachClose(t,t.deleteMessage);var o=sap.ui.getCore().byId(d+'substitutionVLayout');if(o===undefined){o=new sap.ui.commons.layout.VerticalLayout(d+"substitutionVLayout")}o.setWidth("95%");o.addStyleClass("verticalLayoutStyle");var e=sap.ui.getCore().byId(d+'substDummyLabel0');if(e===undefined){e=new sap.ui.commons.Label(this.getId()+'--'+"substDummyLabel0",{text:""})}var n=sap.ui.getCore().byId(d+'newSubstitutionLink');if(n===undefined){n=new sap.ui.commons.Link(d+'newSubstitutionLink',{text:this._oBundle.getText("SUBSTITUTION_RULE_CREATE_NEW_BUTTON"),tooltip:this._oBundle.getText("SUBSTITUTION_RULE_CREATE_TOOLTIP")})}n.attachPress(t,t.openCreateSubstRulePopup);n.addStyleClass("newSubstitutionLink");var N=sap.ui.getCore().byId(d+'subsNavBar');if(N===undefined){N=new sap.ui.ux3.NavigationBar(d+"subsNavBar",{items:[new sap.ui.ux3.NavigationItem(d+"mySubstitutes",{key:d+"mySubstitutes",text:this._oBundle.getText("SUBSTITUTION_MY_SUBSTITUTES_TAB_TITLE")}),new sap.ui.ux3.NavigationItem(d+"iamSubstituting",{key:d+"iamSubstituting",text:this._oBundle.getText("SUBSTITUTION_I_AM_SUBSTITUTING_TAB_TITLE")})]})}N.setSelectedItem(d+"mySubstitutes");N.addStyleClass("navigationBarMargin");var a=sap.ui.getCore().byId(d+'substDummyLabel');if(a===undefined){a=new sap.ui.commons.Label(this.getId()+'--'+"substDummyLabel",{text:""})}var v=0;o.insertContent(e,v);if(sap.ui.getCore().byId(this.getId()+'--'+'msgBarContainer')===undefined){o.insertContent(this.populateMsgBar(),++v)}o.insertContent(N,++v);o.insertContent(n,++v);o.insertContent(a,++v);var b=sap.ui.getCore().byId(d+'activeAndinactiveRulesVLayout');if(b===undefined){b=new sap.ui.commons.layout.VerticalLayout(d+"activeAndinactiveRulesVLayout");b.setWidth("100%");b.insertContent(new sap.ui.commons.Label({text:t._oBundle.getText("SUBSTITUTION_ACTIVE_SUBSTITUTION_RULE"),design:sap.ui.commons.LabelDesign.Bold}),0);b.insertContent(new sap.ui.commons.Label({text:""}),1);b.insertContent(new sap.ui.commons.Label({text:""}),2);b.insertContent(new sap.ui.commons.Label({text:""}),3);b.insertContent(new sap.ui.commons.Label({text:""}),4);b.insertContent(new sap.ui.commons.Label({text:""}),5);b.insertContent(new sap.ui.commons.Label({text:t._oBundle.getText("SUBSTITUTION_INACTIVE_SUBSTITUTION_RULE"),design:sap.ui.commons.LabelDesign.Bold}),6);b.insertContent(new sap.ui.commons.Label({text:""}),7);b.insertContent(new sap.ui.commons.Label({text:""}),8)}var m=++v;o.insertContent(t.getOverlayContent(d+"mySubstitutes",b),m);s.addContent(o);N.attachSelect(function(E){t.deleteMessage();var i=E.getParameter("item").getKey();o.removeContent(m);o.insertContent(t.getOverlayContent(i,b),m);s.rerender()})}else{var N=sap.ui.getCore().byId(d+'subsNavBar');N.setSelectedItem(d+"mySubstitutes");var b=sap.ui.getCore().byId(d+'activeAndinactiveRulesVLayout');var o=sap.ui.getCore().byId(d+'substitutionVLayout');o.insertContent(t.getOverlayContent(d+"mySubstitutes",b),m);s.addContent(o)}return s};
sap.uiext.inbox.SubstitutionRulesManager.prototype.getOverlayContent=function(i,a){var d=this.getId()+'--';var t=this;var s={};var S=sap.ui.getCore().byId(d+'substitutionOverlayContainer');var n=sap.ui.getCore().byId(d+'newSubstitutionLink');var o=sap.ui.getCore().byId(d+'substitutionVLayout');if(s[i])return s[i];if(i===d+"mySubstitutes"){n.setVisible(true);a.removeContent(2);a.insertContent(t.createSubtRuleRowReapterContent(i,true),2);a.removeContent(8);a.insertContent(t.createSubtRuleRowReapterContent(i,false),8);s[i]=a}else if(i===d+"iamSubstituting"){n.setVisible(false);a.removeContent(2);a.insertContent(t.createSubtRuleRowReapterContent(i,true),2);a.removeContent(8);a.insertContent(t.createSubtRuleRowReapterContent(i,false),8);s[i]=a}return s[i]};
sap.uiext.inbox.SubstitutionRulesManager.prototype.openCreateSubstRulePopup=function(e,s){var t=this;var d=s.getId()+'--';var n=sap.ui.getCore().byId(d+'newSubstitutionLink');var c=sap.ui.getCore().byId(d+'createSubsRulePopup');if(c===undefined){c=new sap.ui.ux3.ToolPopup(d+'createSubsRulePopup',{modal:true});var p=new sap.ui.commons.layout.MatrixLayout(d+'popupMainMatrix',{layoutFixed:true,width:'300px',columns:2,widths:["35%","65%"]});var a=new sap.ui.commons.layout.MatrixLayoutCell(d+'popupMainMatrixCell1',{colSpan:2});var b=new sap.ui.commons.layout.MatrixLayoutCell(d+'popupMainMatrixCellMsgBar',{colSpan:2});a.addContent(new sap.ui.commons.TextView(d+'popupCreateSubstRuleTxt',{text:s._oBundle.getText("CREATE_SUBSTITUTION_RULE"),design:sap.ui.commons.TextViewDesign.H3}).addStyleClass("textFontColour"));p.createRow(a);p.createRow(b);s.populateMessageBar(s);var f=new sap.ui.commons.layout.MatrixLayoutCell(d+'popupMainMatrixCell2',{colSpan:2});f.addContent(new sap.ui.commons.HorizontalDivider(d+'popHorzDivdr1'));p.createRow(f);var g=new sap.ui.commons.Label(d+'popupSubstLbl',{text:s._oBundle.getText("SUBSTITUTION_RULE_SUBSTITUTE_LABEL")});var h=new sap.ui.commons.ValueHelpField(d+'popupValueHelp',{width:'100%',value:""});h.attachValueHelpRequest(s,s.openUsersDialog);h.setRequired(true);h.setTooltip(s._oBundle.getText("SUBSTITUTION_RULE_SUBSTITUTE_TOOLTIP"));g.setLabelFor(h);p.createRow(g,h);var i=new sap.ui.commons.Label(d+'popupAutoFwdtLbl',{text:s._oBundle.getText("SUBSTITUTION_AUTOMATIC_FORWARDING_LABEL")});var j=new sap.ui.commons.SegmentedButton(d+'popupSegBtn',{buttons:[new sap.ui.commons.Button(d+'popupSegBtnON',{text:s._oBundle.getText("SUBSTITUTION_AUTOMATIC_FORWARDING_ON_STATE")}),new sap.ui.commons.Button(d+'popupSegBtnOFF',{text:s._oBundle.getText("SUBSTITUTION_AUTOMATIC_FORWARDING_OFF_STATE")})]});j.attachSelect(function(e){if(sap.ui.getCore().byId(e.getParameters().selectedButtonId).getText()==s._oBundle.getText("SUBSTITUTION_AUTOMATIC_FORWARDING_ON_STATE")){sap.ui.getCore().byId(d+'popupFromDatePicker').setProperty("visible",true);sap.ui.getCore().byId(d+'popupToDatePicker').setProperty("visible",true);sap.ui.getCore().byId(d+'popupFromLbl').setProperty("visible",true);sap.ui.getCore().byId(d+'popupToLbl').setProperty("visible",true);sap.ui.getCore().byId(d+'popupFromDatePicker').setProperty("required",true);sap.ui.getCore().byId(d+'popupToDatePicker').setProperty("required",true)}else{sap.ui.getCore().byId(d+'popupFromDatePicker').setProperty("visible",false);sap.ui.getCore().byId(d+'popupToDatePicker').setProperty("visible",false);sap.ui.getCore().byId(d+'popupFromLbl').setProperty("visible",false);sap.ui.getCore().byId(d+'popupToLbl').setProperty("visible",false);sap.ui.getCore().byId(d+'popupFromDatePicker').setProperty("required",false);sap.ui.getCore().byId(d+'popupToDatePicker').setProperty("required",false)}p.rerender()});j.setSelectedButton(d+"popupSegBtnON");i.setLabelFor(j);i.setWrapping(true);p.createRow(i,j);var k=new sap.ui.commons.Label(d+'popupFromLbl',{text:s._oBundle.getText("SUBSTITUTION_SUBSTITUTION_FROM_DATE_LABEL")});var l=new sap.ui.commons.DatePicker(d+'popupFromDatePicker',{text:s._oBundle.getText("SUBSTITUTION_SUBSTITUTION_FROM_DATE_LABEL"),width:'100%'});l.setRequired(true);l.setYyyymmdd(s.substitutionRulesManagerUtils._getTodaysDateinYYYYMMDD());k.setLabelFor(l);p.createRow(k,l);var m=new sap.ui.commons.Label(d+'popupToLbl',{text:s._oBundle.getText("SUBSTITUTION_SUBSTITUTION_TO_DATE_LABEL")});var o=new sap.ui.commons.DatePicker(d+'popupToDatePicker',{text:s._oBundle.getText("SUBSTITUTION_SUBSTITUTION_TO_DATE_LABEL"),width:'100%'});o.setRequired(true);m.setLabelFor(o);p.createRow(m,o);var q=new sap.ui.commons.layout.MatrixLayoutCell(d+'popupMainMatrixCell3',{colSpan:2});q.addContent(new sap.ui.commons.HorizontalDivider(d+'popHorzDivdr2'));p.createRow(q);var r=new sap.ui.commons.Button(d+'popupCreateBtn',{text:s._oBundle.getText("SUBSTITUTION_SUBSTITUTIN_RULE_CREATE_BUTTON")});r.attachPress(s,s.createSubstitutionRule);var u=new sap.ui.commons.Button(d+'popupCancelBtn',{text:s._oBundle.getText("SUBSTITUTION_SUBSTITUTIN_RULE_CANCEL_BUTTON"),press:function(){c.close();c.destroy()}});p.createRow(r,u);c.addContent(p)}s.deleteMessage();c.setPosition(sap.ui.core.Popup.Dock.LeftTop,sap.ui.core.Popup.Dock.RightTop,n.getDomRef(),"13 -10","none");c.open()};
sap.uiext.inbox.SubstitutionRulesManager.prototype.createSubtRuleRowReapterContent=function(i,a){var b=(i===this.getId()+'--'+'mySubstitutes')?true:false;var d=i;if(a){d=d+'active'+'--'}else{d=d+'inactive'+'--'}var t=this;var s=sap.ui.getCore().byId(d+'subsRowRepeater');if(s===undefined){s=new sap.ui.commons.RowRepeater(d+'subsRowRepeater',{numberOfRows:2});s.attachPage(t,t.deleteMessage);s.setDesign(sap.ui.commons.RowRepeaterDesign.Transparent);s.setNoData(new sap.ui.commons.TextView({text:t._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_NO_SUBSTITUTION_RULES_FOUND")}));var r=new sap.ui.commons.layout.MatrixLayout(d+'rowRepMainMatrix',{layoutFixed:true,columns:6,widths:['2%','37%','24%','21%','12%','3%']});if(a){r.addStyleClass('borderFillColorGreen');r.addStyleClass('shadowEffectGreen');r.addStyleClass('mySapUiMltPadRight')}else{r.addStyleClass('borderFillColorGray');r.addStyleClass('shadowEffectGray')}var c=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepEmptyCell');var e=new sap.ui.commons.TextView(d+'substitutionID');e.setVisible(false);e.bindProperty("text","SubstitutionRuleId");c.addContent(e);var f=new sap.ui.commons.layout.MatrixLayout(d+'rowRepSubsDetailMatLyt',{columns:1,layoutFixed:true});var g=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepEmptyRow1');var h=new sap.ui.commons.TextView(d+'rowRepEmpltyTxt1',{text:""});var j=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepEmpltyCell1',{backgroundDesign:sap.ui.commons.layout.BackgroundDesign.Transparent});j.addContent(h);g.addCell(j);var k=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepSubstNameRow');var l;l=new sap.ui.commons.TextView(d+'rowRepSubstNameTxtView');l.bindProperty("text","FullName",function(Q){if(Q!==null&&Q!==""){return Q}});l.addStyleClass('blueFontColor');var m=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepSubstNameCell',{backgroundDesign:sap.ui.commons.layout.BackgroundDesign.Transparent});m.addContent(l);k.addCell(m);f.addRow(k);var n=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepUsrFriendlyRow');var o=new sap.ui.commons.TextView(d+'rowRepUsrFriendlyTxt');o.addStyleClass('blackFontColor');o.bindProperty("text","FullName",function(Q){if(Q!==null&&Q!==""&&Q){var R=this.getModel();return t.substitutionRulesManagerUtils._getText(Q,b,a,R.getProperty('IsEnabled',this.getBindingContext(),false),R.getProperty('Mode',this.getBindingContext(),false),R.getProperty('BeginDate',this.getBindingContext(),false),R.getProperty('EndDate',this.getBindingContext(),false))}});var p=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepUsrFriendly');p.addContent(o);n.addCell(p);f.addRow(n);var q=new sap.ui.commons.layout.MatrixLayout(d+'rowRepSinceUntilMatLyt',{columns:1,layoutFixed:true});var u=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepSinceDateRow');var v=new sap.ui.commons.TextView(d+'rowRepSinceDateTxt');v.addStyleClass('grayFontColor');var w=t._oBundle.getText("SUBSTITUTION_RULE_SINCE_LABEL");if(!a){w=t._oBundle.getText("SUBSTITUTION_SUBSTITUTION_FROM_DATE_LABEL")}v.bindProperty("text","BeginDate",function(Q){if(Q!==undefined&&Q!==null&Q!==""){var R=this.getModel();if(R.getProperty('Mode',this.getBindingContext(),false)==="RECEIVE_TASKS")return w+" : "+t.substitutionRulesManagerUtils._getFormattedDate(Q)}});var x=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepSinceDate',{backgroundDesign:sap.ui.commons.layout.BackgroundDesign.Transparent});x.addContent(v);u.addCell(x);q.addRow(u);var y=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepUntilDateRow');var z=new sap.ui.commons.TextView(d+'rowRepUntilDateTxt');z.addStyleClass('grayFontColor');z.bindProperty("text","EndDate",function(Q){if(Q!==undefined&&Q!==null&Q!==""){var R=this.getModel();if(R.getProperty('Mode',this.getBindingContext(),false)==="RECEIVE_TASKS")return t._oBundle.getText("SUBSTITUTION_RULE_UNTIL_LABEL")+" : "+t.substitutionRulesManagerUtils._getFormattedDate(Q)}});var A=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepUntilDateCell');A.addContent(z);y.addCell(A);q.addRow(y);var B=new sap.ui.commons.layout.MatrixLayout(d+'rowRepActiveTimeMatLyt',{columns:1,layoutFixed:true});var C=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepActiveRow');var D=new sap.ui.commons.TextView(d+'rowRepActiveTxt');D.addStyleClass('grayFontColor');D.bindProperty("text","FullName",function(Q){if(Q!==null&&Q!==""){var R=this.getModel();var S=R.getProperty('Mode',this.getBindingContext(),false);if(S==="RECEIVE_TASKS"){var T=t.substitutionRulesManagerUtils._getStatus(b,a,R.getProperty('IsEnabled',this.getBindingContext(),false),S,R.getProperty('BeginDate',this.getBindingContext(),false),R.getProperty('EndDate',this.getBindingContext(),false));return T}}});D.addStyleClass('blueFontColor');var E=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepActiveCell',{backgroundDesign:sap.ui.commons.layout.BackgroundDesign.Transparent});E.addContent(D);C.addCell(E);B.addRow(C);var F=new sap.ui.commons.layout.MatrixLayoutRow(d+'rowRepTimeInDaysRow');var G=new sap.ui.commons.TextView(d+'rowRepTimeInDaysTxt');G.addStyleClass('blueFontColor');var H='';var I=new sap.ui.commons.layout.MatrixLayoutCell(d+'rowRepTimeInDaysCell');I.addContent(G);F.addCell(I);B.addRow(F);B.addRow(F);var J=new sap.ui.commons.SegmentedButton(d+'rowRepOnOffSegBtn',{visible:false,buttons:[new sap.ui.commons.Button(d+'rowRepOnSegBtn',{text:t._oBundle.getText("SUBSTITUTION_AUTOMATIC_FORWARDING_ON_STATE")}),new sap.ui.commons.Button(d+'rowRepOffSegBtn',{text:t._oBundle.getText("SUBSTITUTION_AUTOMATIC_FORWARDING_OFF_STATE")})]});var K="IsEnabled";if(i===this.getId()+'--iamSubstituting'){J.bindProperty("visible","Mode",function(Q){var R=t.getModel();var S=J.getBindingContext();var T=R.getProperty("SupportsEnable",S);if(Q!==null){if(Q==="RECEIVE_TASKS"){return false}else{return T}}else{return false}});K="TakenOver"}else{J.bindProperty("visible","Mode",function(Q){var R=t.getModel();var S=J.getBindingContext();var T=R.getProperty("SupportsEnable",S);if(Q!==null){if(Q==="RECEIVE_TASKS"){return T}else{return false}}else{return false}});K="IsEnabled"}J.bindProperty("enabled","IsEnabled",function(Q){if(Q!=null&&Q!==""){if(!Q){this.setSelectedButton(this.getButtons()[1].getId())}else{this.setSelectedButton(this.getButtons()[0].getId())}}return true});J.attachSelect(this,function(Q,R){var S=true;var T=true;if(K==="IsEnabled"){if(Q.getParameters().selectedButtonId.indexOf('rowRepOnSegBtn')===-1){S=false;T=true}else{S=true;T=true}}else{if(Q.getParameters().selectedButtonId.indexOf('rowRepOnSegBtn')===-1){T=false;S=true}else{T=true;S=true}}t.updateSubstitutionRule(Q,S,T,R)});if(b){var L=new sap.ui.commons.Image(d+'rowRepDeleteImg',{src:t._imgResourcePath+sap.uiext.inbox.SubstitutionRulesManagerConstants.deleteSubstRule,tooltip:this._oBundle.getText("SUBSTITUTION_RULE_DELETE"),decorative:false});L.setWidth("21px");L.setHeight("21px");L.attachPress(this,this.deleteSubstitutionRule);r.createRow(c,f,q,B,J,L)}else{r.createRow(c,f,q,B,J)}var M=new sap.ui.commons.layout.MatrixLayout(d+'rowRepMainMatrixWapperMatrix',{layoutFixed:true});M.createRow(r);M.createRow(new sap.ui.commons.TextView(d+'rowRepWapperMatEmptyTxt',{text:""}));var N="true";if(i===this.getId()+'--iamSubstituting'){N="false"}var O=[];var P=new sap.ui.model.Filter("IsSubstituted",sap.ui.model.FilterOperator.EQ,N);O.push(P);P=new sap.ui.model.Filter("IsActive",sap.ui.model.FilterOperator.EQ,a?"true":"false");O.push(P);s.bindRows(this.sPath,M,null,O)}else{this._refreshBindings(i,a)}return s};
sap.uiext.inbox.SubstitutionRulesManager.prototype.formatUserName=function(v){if(v!==null&&v!==""){var i=v.indexOf(",");var l=v.substring(i+1);if(l===" ")v=v.substring(0,i);return v}};
sap.uiext.inbox.SubstitutionRulesManager.prototype.bindSubstitutionRules=function(p){};
sap.uiext.inbox.SubstitutionRulesManager.prototype.populateMsgBar=function(){var m=new sap.ui.commons.Toolbar(this.getId()+'--'+"msgBarContainer",{visible:false});var a=new sap.ui.commons.Image({id:this.getId()+'--'+"msbBarTypeImg",text:"",decorative:false});var b=new sap.ui.commons.TextView({id:this.getId()+'--'+"msbBarTextView",text:""});var c=new sap.ui.commons.Image({id:this.getId()+'--'+"msbBarCloseImg",text:"",decorative:false,tooltip:this._oBundle.getText("INBOX_MSGBAR_CLOSE_TOOLTIP")});c.addStyleClass("sapUiExtInboxToolbarRight");c.setSrc(this._imgResourcePath+sap.uiext.inbox.InboxConstants.closeImg);c.attachPress(this,this.deleteMessage);m.addItem(a);m.addItem(b);m.addItem(c);return m};
sap.uiext.inbox.SubstitutionRulesManager.prototype.deleteMessage=function(e,s){if(s===undefined)s=this;var m=sap.ui.getCore().byId(s.getId()+'--'+'msgBarContainer');if(m!=undefined){m.setVisible(false);sap.ui.getCore().byId(s.getId()+'--'+'msbBarTextView').setText("");sap.ui.getCore().byId(s.getId()+'--'+'msbBarTypeImg').setSrc("")}};
sap.uiext.inbox.SubstitutionRulesManager.prototype.showMessage=function(m,a){var b=sap.ui.getCore().byId(this.getId()+'--'+'msgBarContainer');if(b!=undefined){b.setVisible(true);var c=this._getComponent('msbBarTextView');c.setText(a);var d=this._getComponent('msbBarTypeImg');d.setSrc(this._imgResourcePath+sap.uiext.inbox.InboxConstants.messageTypeIcons[m]);d.setTooltip(this._oBundle.getText(sap.uiext.inbox.InboxConstants.messageTypeToolTip[m])+" "+a)}};
sap.uiext.inbox.SubstitutionRulesManager.prototype._getComponent=function(c){return sap.ui.getCore().byId(this.getId()+'--'+c)};
sap.uiext.inbox.SubstitutionRulesManager.prototype.deleteSubstitutionRule=function(e,s){var m=s.getModel();m.oHeaders["DataServiceVersion"]="1.0";m.remove(e.getSource().getBindingContext().sPath,undefined,function(){var n=sap.ui.getCore().byId(s.getId()+'--subsNavBar');var a=n.getSelectedItem();s._refreshBindings(a);s.showMessage("info",s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SUBSTITUTION_RULE_DELETED_SUCCESSFULLY"))},function(a){if(a.response===undefined||a.response.statusCode!=205){s.showMessage("error",s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SUBSTITUTION_RULE_DELETION_FAILURE_CONTACT_ADMIN"))}else if(a.response.statusCode==205){var b={statusCode:a.response.statusCode,statusText:a.response.statusText};m.fireRequestFailed(b)}})};
sap.uiext.inbox.SubstitutionRulesManager.prototype.updateSubstitutionRule=function(e,a,t,s){var m=s.getModel();var c=e.getSource().getBindingContext();var r=m.getProperty("SubstitutionRuleId",c);var b=m.getProperty("SAP__Origin",c);var T=(t!==undefined)?t:false;var E=(a!==undefined)?a:false;var I=s.inboxConstants.forwardSlash+s.substitutionConstants.updateRuleExecutionFunctionImport+s.inboxConstants.query+"SubstitutionRuleId='"+r+"'"+s.inboxConstants.amperSand+"Enabled='"+E+"'"+s.inboxConstants.amperSand+"TakenOver='"+T+"'"+s.inboxConstants.amperSand+"SAP__Origin='"+b+"'"+s.inboxConstants.amperSand+s.inboxConstants.formatJSONURLParam;var d=s.sUrl+I;var f={async:false,requestUri:d,method:"POST",headers:{Accept:s.inboxConstants.acceptHeaderforJSON,"x-csrf-token":m.oHeaders["x-csrf-token"]}};OData.request(f,function(g,h){var n=sap.ui.getCore().byId(s.getId()+'--subsNavBar');var i=n.getSelectedItem();s._refreshBindings(i);s.showMessage("info",s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SUBSTITUTION_RULE_UPDATED_SUCCESSFULLY"))},function(g){if(g.response===undefined||g.response.statusCode!=205){s.showMessage("error",s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SUBSTITUTION_RULE_UPDATION_FAILURE_CONTACT_ADMIN"))}else if(g.response.statusCode==205){var h={statusCode:g.response.statusCode,statusText:g.response.statusText};m.fireRequestFailed(h)}})};
sap.uiext.inbox.SubstitutionRulesManager.prototype.createSubstitutionRule=function(e,s){var t=this;var a=s.validate(s);if(a===false){var m=s.getModel();m.oHeaders["DataServiceVersion"]="1.0";var E={};var f=sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyyMMdd"});var b;var c;var d=s._getComponent('popupToDatePicker').getYyyymmdd();if(d!=undefined&&d!==""){var g=d.substr(0,4);var h=d.substr(4,2);var i=d.substr(6,8);var o=s.substitutionRulesManagerUtils._getTimeZoneOffset();if(o!==undefined){o=o/(60*1000);c=new Date(Date.UTC(g,h-1,i,23,59-o,59,59))}else{c=f.parse(d);c.setHours(23,59,59,59)}}else{c=new Date(2100,01,01)}var j=s._getComponent('popupFromDatePicker').getYyyymmdd();if(j!=undefined&&j!==""){var k=j.substr(0,4);var l=j.substr(4,2);var n=j.substr(6,8);var o=s.substitutionRulesManagerUtils._getTimeZoneOffset();if(o!==undefined){o=o/(60*1000);b=new Date(Date.UTC(k,l-1,n,0,-o,0,0))}else{b=f.parse(j)}}else{b=new Date();b.setHours(0,0,0,0)}E.EndDate="\/Date("+c.getTime()+")\/";E.BeginDate="\/Date("+b.getTime()+")\/";var p=s._getComponent('popupValueHelp');E.FullName=p.getValue();E.User=p.data("uniqueName");var q=s._getComponent('popupSegBtn');var r=q.getSelectedButton();if(r.indexOf("popupSegBtnON")>=0){E.Mode="RECEIVE_TASKS";E.IsEnabled=true}else{E.Mode="TAKE_OVER";E.IsEnabled=true}var u=sap.ui.getCore().byId(s.getId()+'--createSubsRulePopup');m.create(s.sPath,E,null,function(D,v){s.showMessage("info",s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SUBSTITUTION_RULE_CREATED_SUCCESSFULLY"));s._refreshBindings(s.getId()+"--mySubstitutes");m.oHeaders["DataServiceVersion"]="2.0"},function(a){if(a.response===undefined||a.response.statusCode!=205){s.showMessage("error",s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SUBSTITUTION_RULE_CREATION_FAILURE_CONTACT_ADMIN"))}else if(a.response.statusCode==205){var v={statusCode:a.response.statusCode,statusText:a.response.statusText};m.fireRequestFailed(v)}});u.close();u.destroy()}};
sap.uiext.inbox.SubstitutionRulesManager.prototype.openUsersDialog=function(e,s){var d=s.getId()+'--';var u=sap.ui.getCore().byId(d+"usersDialog");var t=sap.ui.getCore().byId(d+"userTable");if(u===undefined){var l=new sap.ui.commons.layout.MatrixLayout({id:d+'dLayout',layoutFixed:true,width:'100%',columns:2,widths:['91%','9%']});var a=new sap.ui.commons.TextField({id:d+'searchF',value:s._oBundle.getText("SUBSTITUTION_USERS_PICKLIST_SEARCH_LABEL"),editable:true,width:'100%'});a.addStyleClass("sapUiExtInboxSubstitutionValueHelpTextStyle");a.onfocusin=function(){a.removeStyleClass("sapUiExtInboxSubstitutionValueHelpTextStyle");if(a.getLiveValue()===s._oBundle.getText("SUBSTITUTION_USERS_PICKLIST_SEARCH_LABEL")){a.setValue("")}};a.onfocusout=function(){if(a.getLiveValue()===""){a.addStyleClass("sapUiExtInboxSubstitutionValueHelpTextStyle");a.setValue(s._oBundle.getText("SUBSTITUTION_USERS_PICKLIST_SEARCH_LABEL"))}else{a.setValue(a.getLiveValue())}};var g=new sap.ui.commons.Button(d+"goBtn",{text:s._oBundle.getText("SUBSTITUTION_USERS_PICKLIST_SEARCH_GO_BUTTON"),tooltip:s._oBundle.getText("SUBSTIUTION_RULE_SEARCH_FOR_USERS"),press:function(e){var c=sap.ui.getCore().byId(d+'searchF').getValue();var f=[];var h=new sap.ui.model.Filter("SearchPattern",sap.ui.model.FilterOperator.EQ,c);f.push(h);t.bindRows("/UserInfoCollection",null,f)}});l.createRow(a,g);var b={collection:"UserInfoCollection",propertiesLabel:[s._oBundle.getText("SUBSTITUTION_USERS_PICKLIST_LOGONID"),s._oBundle.getText("SUBSTITUTION_USERS_PICKLIST_NAME")],properties:["UniqueName","DisplayName"]};if(t===undefined){t=new sap.ui.table.Table(d+"userTable",{selectionMode:sap.ui.table.SelectionMode.Single})}t.setModel(s.getModel());t.setVisibleRowCount(5);t.bDynamic=true;for(var i=0;i<=b.properties.length-1;i++){t.addColumn(new sap.ui.table.Column().setLabel(new sap.ui.commons.Label({text:s._oBundle.getText(b.propertiesLabel[i]),design:sap.ui.commons.LabelDesign.Bold})).setTemplate(new sap.ui.commons.TextField({editable:false,value:{path:b.properties[i]}})))}var L=new sap.ui.commons.layout.VerticalLayout(d+"userDialogVLayout",{width:"100%"});L.insertContent(l,0);L.insertContent(t,1);u=new sap.ui.commons.Dialog(d+"usersDialog",{modal:true,title:s._oBundle.getText("SUBSTIUTION_RULE_SEARCH_FOR_USERS"),content:[L],buttons:[new sap.ui.commons.Button(d+"usersDialogOKBtn",{text:s._oBundle.getText("INBOX_BUTTON_OK_TEXT"),press:function(){var c=sap.ui.getCore().byId(d+"userTable");var f=c.getSelectedIndex();var r=c.getContextByIndex(f);var h=sap.ui.getCore().byId(d+'userTable').getModel();var j=h.getProperty("DisplayName",r);if(j===null)j="";var k=h.getProperty("UniqueName",r);var p=s._getComponent('popupValueHelp');p.setValue(j);p.data("uniqueName",k);u.destroy();u.close()}})]})}u.setWidth("400px");u.open()};
sap.uiext.inbox.SubstitutionRulesManager.prototype.validate=function(s){var t=this;var v=false;var r="";var a,f;var F=sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyyMMdd"});var e=s._getComponent('popupToDatePicker').getYyyymmdd();var b=s._getComponent('popupFromDatePicker').getYyyymmdd();if(e!=undefined&&e!==""){var c=e.substr(0,4);var d=e.substr(4,2);var g=e.substr(6,8);var o=s.substitutionRulesManagerUtils._getTimeZoneOffset();if(o!==undefined){o=o/(60*1000);a=new Date(Date.UTC(c,d-1,g,23,59-o,59,59))}else{a=F.parse(e);a.setHours(23,59,59,59)}}if(b!=undefined&&b!==""){var h=b.substr(0,4);var i=b.substr(4,2);var j=b.substr(6,8);var o=s.substitutionRulesManagerUtils._getTimeZoneOffset();if(o!==undefined){o=o/(60*1000);f=new Date(Date.UTC(h,i-1,j,0,-o,0,0))}else{f=F.parse(b)}}var k=s._getComponent('popupValueHelp').getValue();var p=s._getComponent('popupFromDatePicker').getProperty("required");if(k===null||k===""){v=true;r=s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_SELECT_SUBSTITUTE")}if(v!=true&&p===true){if(a===null||f===null||a===""||f===""||isNaN(a)||isNaN(f)){v=true;r=s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_ENTER_VALID_DATE_RANGE")}if(v!=true){if(a<f){v=true;r=s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_FROM_DATE_AFTER_TODATE")}}}if(v!=true&&p!=true){if(a!=null&&f!=null){if(v!=true&&a<f){v=true;r=s._oBundle.getText("SUBSTITUTION_VALIDATION_MESSAGE_FROM_DATE_AFTER_TODATE")}}}if(v===true){s.displayMessage(s,"error",r)}return v};
sap.uiext.inbox.SubstitutionRulesManager.prototype.populateMessageBar=function(s){var d=s.getId()+'--';var m=new sap.ui.commons.Toolbar(d+"msgBarContainer1",{visible:false});var a=new sap.ui.commons.Image({id:d+"msbBarTypeImg1",text:"",decorative:false});var b=new sap.ui.commons.TextView({id:d+"msbBarTextView1",text:""});var c=new sap.ui.commons.Image({id:d+"msbBarCloseImg1",text:"",decorative:false,tooltip:this._oBundle.getText("INBOX_MSGBAR_CLOSE_TOOLTIP")});c.addStyleClass("sapUiExtInboxToolbarRight");c.setSrc(this._imgResourcePath+sap.uiext.inbox.InboxConstants.closeImg);c.attachPress(s,this.hideMsgBar);m.addItem(a);m.addItem(b);m.addItem(c);var e=s._getComponent('popupMainMatrixCellMsgBar');e.addContent(m)};
sap.uiext.inbox.SubstitutionRulesManager.prototype.displayMessage=function(s,m,a){var d=s.getId()+'--';var b=sap.ui.getCore().byId(d+'msgBarContainer1');if(b!=undefined){b.setVisible(true);var c=sap.ui.getCore().byId(d+'msbBarTextView1');c.setProperty("text",a);var e=sap.ui.getCore().byId(d+'msbBarTypeImg1');e.setProperty("src",this._imgResourcePath+sap.uiext.inbox.InboxConstants.messageTypeIcons[m]);e.setTooltip(this._oBundle.getText(sap.uiext.inbox.InboxConstants.messageTypeToolTip[m])+" "+a)}};
sap.uiext.inbox.SubstitutionRulesManager.prototype.hideMsgBar=function(e,s){var d=s.getId()+"--";if(s===undefined)s=this;var m=sap.ui.getCore().byId(d+'msgBarContainer1');if(m!=undefined){m.setVisible(false);sap.ui.getCore().byId(d+'msbBarTextView1').setText("");sap.ui.getCore().byId(d+'msbBarTypeImg1').setSrc("")}};
sap.uiext.inbox.SubstitutionRulesManager.prototype._refreshBindings=function(i,a){var d=i;var b="true";if(i===this.getId()+'--iamSubstituting'){b="false"}if(a===undefined){this._refreshBindings(i,true);this._refreshBindings(i,false)}else if(a){var f=[];var c=new sap.ui.model.Filter("IsSubstituted",sap.ui.model.FilterOperator.EQ,b);f.push(c);c=new sap.ui.model.Filter("IsActive",sap.ui.model.FilterOperator.EQ,"true");f.push(c);var w=sap.ui.getCore().byId(d+'active'+'--'+'rowRepMainMatrixWapperMatrix');var s=sap.ui.getCore().byId(d+'active'+'--'+'subsRowRepeater');s.bindRows(this.sPath,w,null,f);s.rerender()}else{var F=[];var e=new sap.ui.model.Filter("IsSubstituted",sap.ui.model.FilterOperator.EQ,b);F.push(e);e=new sap.ui.model.Filter("IsActive",sap.ui.model.FilterOperator.EQ,"false");F.push(e);var g=sap.ui.getCore().byId(d+'inactive'+'--'+'rowRepMainMatrixWapperMatrix');var S=sap.ui.getCore().byId(d+'inactive'+'--'+'subsRowRepeater');S.bindRows(this.sPath,g,null,F);S.rerender()}};
sap.uiext.inbox.SubstitutionRulesManager.prototype.getSubstitutionRulesManagerUtils=function(){return this.substitutionRulesManagerUtils}