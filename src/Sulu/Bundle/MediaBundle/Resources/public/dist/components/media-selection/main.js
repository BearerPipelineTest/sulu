define(["sulumedia/collection/collections","sulumedia/model/collection"],function(a,b){"use strict";var c={eventNamespace:"sulu.media-selection",thumbnailKey:"thumbnails",thumbnailSize:"50x50",resultKey:"media",dataAttribute:"media-selection",dataDefault:{displayOption:"top",ids:[]},hideConfigButton:!0,translations:{noContentSelected:"media-selection.nomedia-selected",addImages:"media-selection.add-images",choose:"public.choose",collections:"media-selection.collections",upload:"media-selection.upload-new",collection:"media-selection.upload-to-collection",createNewCollection:"media-selection.create-new-collection",newCollection:"media-selection.new-collection"}},d={lastVisitedCollectionKey:"last-visited-collection"},e=function(){return h.call(this,"input-retrieved")},f=function(){return h.call(this,"record-selected")},g=function(){return h.call(this,"record-deselected")},h=function(a){return this.options.eventNamespace+(this.options.instanceName?this.options.instanceName+".":"")+a},i={addTab:function(a,b){return['<div id="',a.ids.chooseTab,'">','   <div class="heading">',"       <h3>",b,"</h3>","   </div>",'   <div id="',a.ids.gridGroup,'"/>','   <div class="overlay-loader" id="',a.ids.loader,'"></div>',"</div>"].join("")},uploadTab:function(a,b){return['<div id="',a.ids.uploadTab,'">','   <div class="grid-row">',"       <label>",b,"</label>",'       <div id="',a.ids.collectionSelect,'"></div>',"   </div>",'   <div class="grid-row">','       <div id="',a.ids.dropzone,'"></div>',"   </div>","</div>"].join("")},contentItem:function(a,b){return['   <img src="',b["50x50"],'"/>','   <span class="title">',a,"</span>"].join("")}},j=function(a){return"#"+this.options.ids[a]},k=function(){var a=this.$find(j.call(this,"loader"));a.length&&this.sandbox.start([{name:"loader@husky",options:{el:a,size:"100px",color:"#cccccc"}}])},l=function(){this.sandbox.stop(j.call(this,"loader"))},m=function(){this.sandbox.on(this.DISPLAY_OPTION_CHANGED(),function(a){x.call(this,{displayOption:a},!1)},this),this.sandbox.on("husky.tabs.overlaymedia-selection."+this.options.instanceName+".add.initialized",function(){k.call(this),this.collections.fetchSorted("title",{success:function(a){this.collectionArray=a.toJSON(),l.call(this),p.call(this),q.call(this),r.call(this)}.bind(this)})}.bind(this)),this.sandbox.on("husky.overlay.media-selection."+this.options.instanceName+".add.opened",function(){this.gridGroupDeprecated===!0&&(o.call(this),this.gridGroupDeprecated=!1)}.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".height-changed",function(){this.sandbox.emit("husky.overlay.media-selection."+this.options.instanceName+".add.set-position")}.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".initialized",function(){this.sandbox.emit("husky.overlay.media-selection."+this.options.instanceName+".add.set-position")}.bind(this)),this.sandbox.on("husky.select.media-selection-"+this.options.instanceName+".selected.item",n.bind(this)),this.sandbox.on("husky.dropzone.media-selection-"+this.options.instanceName+".files-added",u.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".record-selected",function(a){this.sandbox.emit(f.call(this),a)}.bind(this)),this.sandbox.on("sulu.grid-group."+this.options.instanceName+".record-deselected",function(a){this.sandbox.emit(g.call(this),a)}.bind(this))},n=function(a){this.uploadCollection=a,this.sandbox.emit("husky.dropzone.media-selection-"+this.options.instanceName+".change-url","/admin/api/media?collection="+a)},o=function(){var a=this.getData();this.sandbox.emit("sulu.grid-group."+this.options.instanceName+".reload",{data:this.collectionArray,preselected:a.ids})},p=function(){var a,b={},c=this.getData();""!=this.options.types?(a="filterByTypes",b={types:this.options.types}):a="all",this.sandbox.start([{name:"grid-group@suluadmin",options:{data:this.collectionArray,el:this.sandbox.dom.find(j.call(this,"gridGroup")),instanceName:this.options.instanceName,gridUrl:a,urlParameter:b,preselected:c.ids,resultKey:this.options.resultKey,dataGridOptions:{view:"table",viewOptions:{table:{excludeFields:["id"],showHead:!1,cssClass:"minimal"}},pagination:!1,matchings:[{name:"id"},{name:"thumbnails",translation:"thumbnails",type:"thumbnails"},{name:"title",translation:"title"}]}}}])},q=function(){var a=this.sandbox.util.extend([],!0,this.collectionArray),b=this.sandbox.sulu.getUserSetting(d.lastVisitedCollectionKey)||"new";a.unshift({id:"new",title:this.sandbox.translate(this.options.translations.createNewCollection)}),n.call(this,b),this.sandbox.start([{name:"select@husky",options:{el:j.call(this,"collectionSelect"),instanceName:"media-selection-"+this.options.instanceName,valueName:"title",data:a,preSelectedElements:[b]}}])},r=function(){this.sandbox.start([{name:"dropzone@husky",options:{el:j.call(this,"dropzone"),url:"/admin/api/media?collection="+this.uploadCollection,method:"POST",paramName:"fileVersion",showOverlay:!1,instanceName:"media-selection-"+this.options.instanceName,afterDropCallback:s.bind(this),keepFilesAfterSuccess:!0}}])},s=function(){var a=this.sandbox.data.deferred();return"new"===this.uploadCollection?this.newCollectionId?(this.uploadCollection=this.newCollectionId,n.call(this,this.uploadCollection),a.resolve()):(this.newCollection.set({title:t.call(this)}),this.newCollection.save(null,{success:function(b){b=b.toJSON(),this.newCollectionId=b.id,n.call(this,b.id),this.collectionArray.push(b),a.resolve()}.bind(this),error:function(){this.sandbox.logger.log("Error while saving collection")}.bind(this)})):a.resolve(),a.promise()},t=function(){var a=this.sandbox.translate(this.options.translations.newCollection),b=0;return this.sandbox.util.foreach(this.collectionArray,function(c){-1!==c.title.indexOf(a)&&b++}.bind(this)),b>0&&(a=a+" ("+b+")"),a},u=function(a){if(a.length){var b=this.getData();this.sandbox.util.foreach(a,function(a){b.ids.push(a.id)}.bind(this)),this.setData(b),this.sandbox.emit("sulu.labels.success.show","labels.success.media-upload-desc","labels.success"),o.call(this)}},v=function(){var a=i.addTab(this.options,this.sandbox.translate(this.options.translations.collections)),b=i.uploadTab(this.options,this.sandbox.translate(this.options.translations.collection)),c=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,c),this.sandbox.start([{name:"overlay@husky",options:{triggerEl:this.$addButton,cssClass:"media-selection-overlay",el:c,removeOnClose:!1,container:this.$el,draggable:!1,instanceName:"media-selection."+this.options.instanceName+".add",skin:"medium",slides:[{title:this.sandbox.translate(this.options.translations.addImages),okCallback:w.bind(this),cssClass:"media-selection-overlay-add",tabs:[{title:this.sandbox.translate(this.options.translations.choose),data:a},{title:this.sandbox.translate(this.options.translations.upload),data:b}]}]}}])},w=function(){var a=this.sandbox.data.deferred();this.sandbox.emit("sulu.grid-group."+this.options.instanceName+".get-selected-ids",function(b){x.call(this,{ids:b}),a.resolve()}.bind(this)),a.then(function(){this.sandbox.emit(e.call(this))}.bind(this))},x=function(a,b){var c=this.getData();for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);this.setData(c,b)};return{type:"itembox",initialize:function(){this.options=this.sandbox.util.extend(!0,{},c,this.options);var d=this.getData();this.collections=new a,this.newCollection=new b,this.collectionArray=null,this.newCollectionId=null,this.gridGroupDeprecated=!1,this.options.ids={container:"media-selection-"+this.options.instanceName+"-container",addButton:"media-selection-"+this.options.instanceName+"-add",configButton:"media-selection-"+this.options.instanceName+"-config",displayOption:"media-selection-"+this.options.instanceName+"-display-option",content:"media-selection-"+this.options.instanceName+"-content",chooseTab:"media-selection-"+this.options.instanceName+"-choose-tab",uploadTab:"media-selection-"+this.options.instanceName+"-upload-tab",gridGroup:"media-selection-"+this.options.instanceName+"-grid-group",loader:"media-selection-"+this.options.instanceName+"-loader",collectionSelect:"media-selection-"+this.options.instanceName+"-collection-select",dropzone:"media-selection-"+this.options.instanceName+"-dropzone"},this.uploadCollection=null,m.call(this),this.render(),d.displayOption&&this.setDisplayOption(d.displayOption),v.call(this)},isDataEmpty:function(a){return this.sandbox.util.isEmpty(a.ids)},getUrl:function(a){var b=-1===this.options.url.indexOf("?")?"?":"&";return[this.options.url,b,this.options.idsParameter,"=",(a.ids||[]).join(",")].join("")},getItemContent:function(a){return i.contentItem(a.title,a.thumbnails)},sortHandler:function(a){var b=this.getData();b.ids=a,this.setData(b,!1)},removeHandler:function(a){for(var b=this.getData(),c=-1,d=b.ids.length;++c<d;)if(b.ids[c]===a){b.ids.splice(b.ids.indexOf(a),1);break}this.setData(b,!1)}}});