
!function(e){"use strict";var t,i,n,s;function o(t){return e.each([{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}],function(){t=t.replace(this.re,this.ch)}),t}function a(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},i="(?:"+Object.keys(t).join("|")+")",n=new RegExp(i),s=new RegExp(i,"g"),o=null===e?"":""+e;return n.test(o)?o.replace(s,function(e){return t[e]}):o}String.prototype.includes||(t={}.toString,i=function(){try{var e={},t=Object.defineProperty,i=t(e,e,e)&&t}catch(e){}return i}(),n="".indexOf,s=function(e){if(null===this)throw TypeError();var i=String(this);if(e&&"[object RegExp]"===t.call(e))throw TypeError();var s=i.length,o=String(e),a=o.length,l=arguments.length>1?arguments[1]:void 0,r=l?Number(l):0;return r!=r&&(r=0),!(a+Math.min(Math.max(r,0),s)>s)&&-1!==n.call(i,o,r)},i?i(String.prototype,"includes",{value:s,configurable:!0,writable:!0}):String.prototype.includes=s),String.prototype.startsWith||function(){var e=function(){try{var e={},t=Object.defineProperty,i=t(e,e,e)&&t}catch(e){}return i}(),t={}.toString,i=function(e){if(null===this)throw TypeError();var i=String(this);if(e&&"[object RegExp]"===t.call(e))throw TypeError();var n=i.length,s=String(e),o=s.length,a=arguments.length>1?arguments[1]:void 0,l=a?Number(a):0;l!=l&&(l=0);var r=Math.min(Math.max(l,0),n);if(o+r>n)return!1;for(var d=-1;++d<o;)if(i.charCodeAt(r+d)!==s.charCodeAt(d))return!1;return!0};e?e(String.prototype,"startsWith",{value:i,configurable:!0,writable:!0}):String.prototype.startsWith=i}(),e.expr[":"].icontains=function(t,i,n){var s=e(t);return(s.data("tokens")||s.text()).toUpperCase().includes(n[3].toUpperCase())},e.expr[":"].ibegins=function(t,i,n){var s=e(t);return(s.data("tokens")||s.text()).toUpperCase().startsWith(n[3].toUpperCase())},e.expr[":"].aicontains=function(t,i,n){var s=e(t),o=(s.data("tokens")||s.data("normalizedText")||s.text()).toUpperCase();return o.includes(o,n[3])},e.expr[":"].aibegins=function(t,i,n){var s=e(t);return(s.data("tokens")||s.data("normalizedText")||s.text()).toUpperCase().startsWith(n[3].toUpperCase())};var l=function(t,i,n){n&&(n.stopPropagation(),n.preventDefault()),this.$element=e(t),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=i,null===this.options.title&&(this.options.title=this.$element.attr("title")),this.val=l.prototype.val,this.render=l.prototype.render,this.refresh=l.prototype.refresh,this.setStyle=l.prototype.setStyle,this.selectAll=l.prototype.selectAll,this.deselectAll=l.prototype.deselectAll,this.destroy=l.prototype.remove,this.remove=l.prototype.remove,this.show=l.prototype.show,this.hide=l.prototype.hide,this.init()};function r(t,i){var n=arguments,s=t,o=i;[].shift.apply(n);var a,r=this.each(function(){var t=e(this);if(t.is("select")){var i=t.data("selectpicker"),r="object"==typeof s&&s;if(i){if(r)for(var d in r)r.hasOwnProperty(d)&&(i.options[d]=r[d])}else{var h=e.extend({},l.DEFAULTS,e.fn.selectpicker.defaults||{},t.data(),r);t.data("selectpicker",i=new l(this,h,o))}"string"==typeof s&&(a=i[s]instanceof Function?i[s].apply(i,n):i.options[s])}});return a||r}l.VERSION="1.6.4",l.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results matched {0}",countSelectedText:function(e,t){return 1===e?"{0} item selected":"{0} items selected"},maxOptionsText:function(e,t){return[1===e?"Limit reached ({n} item max)":"Limit reached ({n} items max)",1===t?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:", ",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,tickIcon:"glyphicon glyphicon-ok",caretIcon:"caret",maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1},l.prototype={constructor:l,init:function(){var t=this,i=this.$element.attr("id");this.$element.hide(),this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement),this.$button=this.$newElement.children("button"),this.$menu=this.$newElement.children(".dropdown-menu"),this.$searchbox=this.$menu.find("input"),this.options.dropdownAlignRight&&this.$menu.addClass("dropdown-menu-right"),i&&(this.$button.attr("data-id",i),e('label[for="'+i+'"]').click(function(e){e.preventDefault(),t.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.liHeight(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile()},createDropdown:function(){var t=this.multiple?" show-tick":"",i=this.$element.parent().hasClass("input-group")?" input-group-btn":"",n=this.autofocus?" autofocus":"",s=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",o=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?"":' placeholder="'+a(this.options.liveSearchPlaceholder)+'"')+"></div>":"",l=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button class="actions-btn bs-select-all btn btn-default">'+this.options.selectAllText+'</button><button class="actions-btn bs-deselect-all btn btn-default">'+this.options.deselectAllText+"</button></div></div>":"",r=this.multiple&&this.options.doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button class="btn btn-sm btn-default">'+this.options.doneButtonText+"</button></div></div>":"",d='<div class="btn-group bootstrap-select'+t+i+'"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown"'+n+'><span class="filter-option pull-left"></span>&nbsp;<span class="'+this.options.caretIcon+'" aria-hidden="true"></span></button><div class="dropdown-menu open">'+s+o+l+'<ul class="dropdown-menu inner" role="menu"></ul>'+r+"</div></div>";return e(d)},createView:function(){var e=this.createDropdown(),t=this.createLi();return e.find("ul").append(t),e},reloadLi:function(){this.destroyLi();var e=this.createLi();this.$menu.find("ul").append(e)},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var t=this,i=[],n=0,s=function(e,t,i,n){return"<li"+(void 0!==i&""!==i?' class="'+i+'"':"")+(void 0!==t&null!==t?' data-original-index="'+t+'"':"")+(void 0!==n&null!==n?' data-optgroup="'+n+'"':"")+">"+e+"</li>"},l=function(e,i,n,s,l,r){return'<a tabindex="0"'+(void 0!==s?' title="'+s+'"':"")+(void 0!==i?' class="'+i+'"':"")+(void 0!==n?' style="'+n+'"':"")+' data-normalized-text="'+o(a(e))+'"'+(void 0!==l||null!==l?' data-tokens="'+l+'"':"")+">"+e+(r?'<span class="'+t.options.tickIcon+' check-mark" aria-hidden="true"></span>':"")+"</a>"};return this.$element.find("option").each(function(o){var a=e(this),r=a.attr("class")||"",d=a.attr("style"),h=a.attr("title"),c=a.data("content")?a.data("content"):a.html(),p=a.data("tokens")?a.data("tokens"):null,u=a.data("subtext")?'<small class="text-muted">'+a.data("subtext")+"</small>":"",m=a.data("icon")?'<span class="'+a.data("icon")+'" aria-hidden="true"></span> ':"",f=a.is(":disabled")||a.parent().is(":disabled");if(""!==m&&f&&(m="<span>"+m+"</span>"),a.data("thumbnail")?c='<span class="media"><span class="media-left"><img src="'+a.data("thumbnail")+'" class="media-object" onerror="src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'"></span><span class="media-body">'+c+"</span></span>":a.data("content")||(c=m+'<span class="text">'+c+u+"</span>"),!t.options.hideDisabled||!f)if(a.parent().is("optgroup")&&!0!==a.data("divider")){if(0===a.index()){n+=1;var v=a.parent().attr("label"),b=a.parent().data("subtext")?'<small class="text-muted">'+a.parent().data("subtext")+"</small>":"";v=(a.parent().data("icon")?'<span class="'+a.parent().data("icon")+'" aria-hidden="true"></span> ':"")+'<span class="text">'+v+b+"</span>",0!==o&&i.length>0&&i.push(s("",null,"divider",n+"div")),i.push(s(v,null,"dropdown-header",n))}i.push(s(l(c,"opt "+r,d,h,p,t.multiple),o,"",n))}else!0===a.data("divider")?i.push(s("",o,"divider")):!0===a.data("hidden")?i.push(s(l(c,r,d,h,p,t.multiple),o,"hidden is-hidden")):(a.prev().is("optgroup")&&i.push(s("",null,"divider",n+"div")),i.push(s(l(c,r,d,h,p,t.multiple),o)))}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),e(i.join(""))},findLis:function(){return null===this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(t){var i=this;!1!==t&&this.$element.find("option").each(function(t){i.setDisabled(t,e(this).is(":disabled")||e(this).parent().is(":disabled")),i.setSelected(t,e(this).is(":selected"))}),this.tabIndex();var n=this.options.hideDisabled?":enabled":"",s=this.$element.find("option:selected"+n).map(function(){var t,n=e(this),s=n.data("icon")?'<i class="'+n.data("icon")+'" aria-hidden="true"></i> ':"";return t=n.data("subtext")&&!i.multiple?' <small class="text-muted">'+n.data("subtext")+"</small>":"",n.attr("title")?n.attr("title"):n.data("content")?n.data("content"):s+n.html()+t}).toArray(),o=this.multiple?s.join(this.options.multipleSeparator):s[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var a=this.options.selectedTextFormat.split(">");if(a.length>1&&s.length>a[1]||1===a.length&&s.length>=2){n=this.options.hideDisabled?", [disabled]":"";var l=this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]'+n).length;o=("function"==typeof this.options.countSelectedText?this.options.countSelectedText(s.length,l):this.options.countSelectedText).replace("{0}",s.length.toString()).replace("{1}",l.toString())}}o||(o=this.options.title||this.options.noneSelectedText),this.$button.children(".filter-option").html(this.multiple&&"values"!==this.options.selectedTextFormat?this.options.title:o),this.$button.attr("title",this.options.title)},setStyle:function(e,t){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi,""));var i=e||this.options.style;"add"===t?this.$button.addClass(i):"remove"===t?this.$button.removeClass(i):(this.$button.removeClass(this.options.style),this.$button.addClass(i))},liHeight:function(){if(!1!==this.options.size){var e=this.$menu.parent().clone().children(".dropdown-toggle").prop("autofocus",!1).end().appendTo("body"),t=e.addClass("open").children(".dropdown-menu"),i=t.find("li").not(".divider, .dropdown-header").filter(":visible").children("a").outerHeight(),n=this.options.header?t.find(".popover-title").outerHeight():0,s=this.options.liveSearch?t.find(".bs-searchbox").outerHeight():0,o=this.options.actionsBox?t.find(".bs-actionsbox").outerHeight():0,a=this.multiple?t.find(".bs-donebutton").outerHeight():0;e.remove(),this.$newElement.data("liHeight",i).data("headerHeight",n).data("searchHeight",s).data("actionsHeight",o).data("doneButtonHeight",a)}},setSize:function(){this.findLis();var t,i,n,s=this,o=this.$menu,a=o.children(".inner"),l=this.$newElement.outerHeight(),r=this.$newElement.data("liHeight"),d=this.$newElement.data("headerHeight"),h=this.$newElement.data("searchHeight"),c=this.$newElement.data("actionsHeight"),p=this.$newElement.data("doneButtonHeight"),u=this.$lis.filter(".divider").outerHeight(!0),m=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"))+parseInt(o.css("border-top-width"))+parseInt(o.css("border-bottom-width")),f=this.options.hideDisabled?".disabled":"",v=e(window),b=m+parseInt(o.css("margin-top"))+parseInt(o.css("margin-bottom"))+2,g=function(){i=s.$newElement.offset().top-v.scrollTop(),n=v.height()-i-l};if(g(),this.options.header&&o.css("padding-top",0),"auto"===this.options.size){var $=function(){var e,l=s.$lis.not(".hidden");g(),t=n-b,s.options.dropupAuto&&s.$newElement.toggleClass("dropup",i>n&&t-b<o.height()),s.$newElement.hasClass("dropup")&&(t=i-b),e=l.length+l.filter(".dropdown-header").length>3?3*r+b-2:0,o.css({"max-height":t+"px",overflow:"hidden","min-height":e+d+h+c+p+"px"}),a.css({"max-height":t-d-h-c-p-m+"px","overflow-y":"auto","min-height":Math.max(e-m,0)+"px"})};$(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",$),v.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize",$)}else if(this.options.size&&"auto"!==this.options.size&&o.find("li").not(f).length>this.options.size){var x=this.$lis.not(".divider").not(f).children().slice(0,this.options.size).last().parent().index(),w=this.$lis.slice(0,x+1).filter(".divider").length;t=r*this.options.size+w*u+m,s.options.dropupAuto&&this.$newElement.toggleClass("dropup",i>n&&t<o.height()),o.css({"max-height":t+d+h+c+p+"px",overflow:"hidden"}),a.css({"max-height":t-m+"px","overflow-y":"auto"})}},setWidth:function(){if("auto"===this.options.width){this.$menu.css("min-width","0");var e=this.$newElement.clone().appendTo("body"),t=e.children(".dropdown-menu").css("width"),i=e.css("width","auto").children("button").css("width");e.remove(),this.$newElement.css("width",Math.max(parseInt(t),parseInt(i))+"px")}else"fit"===this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){var t,i,n=this,s=e("<div />"),o=function(e){s.addClass(e.attr("class").replace(/form-control/gi,"")).toggleClass("dropup",e.hasClass("dropup")),t=e.offset(),i=e.hasClass("dropup")?0:e[0].offsetHeight,s.css({top:t.top+i,left:t.left,width:e[0].offsetWidth,position:"absolute"})};this.$newElement.on("click",function(){n.isDisabled()||(o(e(this)),s.appendTo(n.options.container),s.toggleClass("open",!e(this).hasClass("open")),s.append(n.$menu))}),e(window).on("resize scroll",function(){o(n.$newElement)}),e("html").on("click",function(t){e(t.target).closest(n.$newElement).length<1&&s.removeClass("open")})},setSelected:function(e,t){this.findLis(),this.$lis.filter('[data-original-index="'+e+'"]').toggleClass("selected",t)},setDisabled:function(e,t){this.findLis(),t?this.$lis.filter('[data-original-index="'+e+'"]').addClass("disabled").children("a").attr("href","#").attr("tabindex",-1):this.$lis.filter('[data-original-index="'+e+'"]').removeClass("disabled").children("a").removeAttr("href").attr("tabindex",0)},isDisabled:function(){return this.$element.is(":disabled")},checkDisabled:function(){var e=this;this.isDisabled()?this.$button.addClass("disabled").attr("tabindex",-1):(this.$button.hasClass("disabled")&&this.$button.add(this.$menu.find("li")).removeClass("disabled"),-1!==this.$button.attr("tabindex")||this.$element.data("tabindex")||this.$button.removeAttr("tabindex")),this.$button.click(function(){return!e.isDisabled()})},tabIndex:function(){this.$element.is("[tabindex]")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex")))},clickListener:function(){var t=this;this.$newElement.on("touchstart.dropdown",".dropdown-menu",function(e){e.stopPropagation()}),this.$newElement.on("click",function(){t.setSize(),t.options.liveSearch||t.multiple||setTimeout(function(){t.$menu.find(".selected a").focus()},10)}),this.$menu.on("click","li a",function(i){var n=e(this),s=n.parent().data("originalIndex"),o=t.$element.val(),a=t.$element.prop("selectedIndex");if(t.multiple&&i.stopPropagation(),i.prev���V  ���V                   BV          �"�V  8 �V          ���V  j%      ���V          (s),h=d.prop("selected"),c=d.parent("optgroup"),p=t.options.maxOptions,u=c.data("maxOptions")||!1;if(t.multiple){if(d.prop("selected",!h),t.setSelected(s,!h),n.blur(),!1!==p||!1!==u){var m=p<r.filter(":selected").length,f=u<c.find("option:selected").length;if(p&&m||u&&f)if(p&&1===p)r.prop("selected",!1),d.prop("selected",!0),t.$menu.find(".selected").removeClass("selected"),t.setSelected(s,!0);else if(u&&1===u){c.find("option:selected").prop("selected",!1),d.prop("selected",!0);var v=n.data("optgroup");t.$menu.find(".selected").has('a[data-optgroup="'+v+'"]').removeClass("selected"),t.setSelected(s,!0)}else{var b="function"==typeof t.options.maxOptionsText?t.options.maxOptionsText(p,u):t.options.maxOptionsText,g=b[0].replace("{n}",p),$=b[1].replace("{n}",u),x=e('<div class="notify"></div>');b[2]&&(g=g.replace("{var}",b[2][p>1?0:1]),$=$.replace("{var}",b[2][u>1?0:1])),d.prop("selected",!1),t.$menu.append(x),p&&m&&(x.append(e("<div>"+g+"</div>")),t.$element.trigger("maxReached.bs.select")),u&&f&&(x.append(e("<div>"+$+"</div>")),t.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){t.setSelected(s,!1)},10),x.delay(750).fadeOut(300,function(){e(this).remove()})}}}else r.prop("selected",!1),d.prop("selected",!0),t.$menu.find(".selected").removeClass("selected"),t.setSelected(s,!0);if(t.multiple?t.options.liveSearch&&t.$searchbox.focus():t.$button.focus(),o!==t.$element.val()&&t.multiple||a!==t.$element.prop("selectedIndex")&&!t.multiple)"function"==typeof Event?l=new Event("change",{bubbles:!0}):(l=document.createEvent("Event")).initEvent("change",!0,!1),t.$element[0].dispatchEvent(l)}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(e){e.currentTarget===this&&(e.preventDefault(),e.stopPropagation(),t.options.liveSearch?t.$searchbox.focus():t.$button.focus())}),this.$menu.on("click","li.divider, li.dropdown-header",function(e){e.preventDefault(),e.stopPropagation(),t.options.liveSearch?t.$searchbox.focus():t.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){t.$button.focus()}),this.$searchbox.on("click",function(e){e.stopPropagation()}),this.$menu.on("click",".actions-btn",function(i){t.options.liveSearch?t.$searchbox.focus():t.$button.focus(),i.preventDefault(),i.stopPropagation(),e(this).hasClass("bs-select-all")?t.selectAll():t.deselectAll(),t.$element.change()}),this.$element.change(function(){t.checkDisabled(),t.render(!1)})},liveSearchListener:function(){var t=this,i=e('<li class="no-results"></li>');this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api",function(){t.$menu.find(".active").removeClass("active"),t.$searchbox.val()&&(t.$searchbox.val(""),t.$lis.not(".is-hidden").removeClass("hidden"),i.parent().length&&i.remove()),t.multiple||t.$menu.find(".selected").addClass("active"),setTimeout(function(){t.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api",function(e){e.stopPropagation()}),this.$searchbox.on("input propertychange",function(){if(t.$searchbox.val()){var n=t.$lis.not(".is-hidden").removeClass("hidden").children("a");(n=t.options.liveSearchNormalize?n.not(":a"+t._searchStyle()+"("+o(t.$searchbox.val())+")"):n.not(":"+t._searchStyle()+"("+t.$searchbox.val()+")")).parent().addClass("hidden"),t.$lis.filter(".dropdown-header").each(function(){var i=e(this),n=i.data("optgroup");0===t.$lis.filter("[data-optgroup="+n+"]").not(i).not(".hidden").length&&(i.addClass("hidden"),t.$lis.filter("[data-optgroup="+n+"div]").addClass("hidden"))});var s=t.$lis.not(".hidden");s.each(function(t){var i=e(this);i.hasClass("divider")&&(i.index()===s.eq(0).index()||i.index()===s.last().index()||s.eq(t+1).hasClass("divider"))&&i.addClass("hidden")}),t.$lis.not(".hidden, .no-results").length?i.parent().length&&i.remove():(i.parent().length&&i.remove(),i.html(t.options.noneResultsText.replace("{0}",'"'+a(t.$searchbox.val())+'"')).show(),t.$menu.append(i))}else t.$lis.not(".is-hidden").removeClass("hidden"),i.parent().length&&i.remove();t.$lis.filter(".active").removeClass("active"),t.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(),e(this).focus()})},_searchStyle:function(){var e="icontains";switch(this.options.liveSearchStyle){case"begins":break;case"startsWith":e="ibegins"}return e},val:function(e){return e?(this.$element.val(e),this.render(),this.$element):this.$element.val()},selectAll:function(){this.findLis(),this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected",!0),this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").addClass("selected"),this.render(!1)},deselectAll:function(){this.findLis(),this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected",!1),this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").removeClass("selected"),this.render(!1)},keydown:function(t){var i,n,s,a,l,r,d,h,c,p=e(this),u=p.is("input")?p.parent().parent():p.parent(),m=u.data("this"),f={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(m.options.liveSearch&&(u=p.parent().parent()),m.options.container&&(u=m.$menu),i=e("[role=menu] li a",u),!(c=m.$menu.parent().hasClass("open"))&&/([0-9]|[A-z])/.test(String.fromCharCode(t.keyCode))&&(m.options.container?m.$newElement.trigger("click"):(m.setSize(),m.$menu.parent().addClass("open"),c=!0),m.$searchbox.focus()),m.options.liveSearch&&(/(^9$|27)/.test(t.keyCode.toString(10))&&c&&0===m.$menu.find(".active").length&&(t.preventDefault(),m.$menu.parent().removeClass("open"),m.$button.focus()),i=e("[role=menu] li:not(.divider):not(.dropdown-header):visible a",u),p.val()||/(38|40)/.test(t.keyCode.toString(10))||0===i.filter(".active").length&&(i=m.$newElement.find("li a"),i=m.options.liveSearchNormalize?i.filter(":a"+m._searchStyle()+"("+o(f[t.keyCode])+")"):i.filter(":"+m._searchStyle()+"("+f[t.keyCode]+")"))),i.length){if(/(38|40)/.test(t.keyCode.toString(10)))n=i.index(i.filter(":focus")),a=i.parent(":not(.disabled):visible").first().index(),l=i.parent(":not(.disabled):visible").last().index(),s=i.eq(n).parent().nextAll(":not(.disabled):visible").eq(0).index(),r=i.eq(n).parent().prevAll(":not(.disabled):visible").eq(0).index(),d=i.eq(s).parent().prevAll(":not(.disabled):visible").eq(0).index(),m.options.liveSearch&&(i.each(function(t){e(this).hasClass("disabled")||e(this).data("index",t)}),n=i.index(i.filter(".active")),a=i.filter(":not(.disabled):visible").first().data("index"),l=i.filter(":not(.disabled):visible").last().data("index"),s=i.eq(n).nextAll(":not(.disabled):visible").eq(0).data("index"),r=i.eq(n).prevAll(":not(.disabled):visible").eq(0).data("index"),d=i.eq(s).prevAll(":not(.disabled):visible").eq(0).data("index")),h=p.data("prevIndex"),38===t.keyCode?(m.options.liveSearch&&(n-=1),n!==d&&n>r&&(n=r),n<a&&(n=a),n===h&&(n=l)):40===t.keyCode&&(m.options.liveSearch&&(n+=1),-1===n&&(n=0),n!==d&&n<s&&(n=s),n>l&&(n=l),n===h&&(n=a)),p.data("prevIndex",n),m.options.liveSearch?(t.preventDefault(),p.hasClass("dropdown-toggle")||(i.removeClass("active"),i.eq(n).addClass("active").children("a").focus(),p.focus())):i.eq(n).focus();else if(!p.is("input")){var v=[],b=e(document).data("keycount")+1;i.each(function(){e(this).parent().hasClass("disabled")||e.trim(e(this).text().toLowerCase()).substring(0,1)===f[t.keyCode]&&v.push(e(this).parent().index())}),e(document).data("keycount",b),e.trim(e(":focus").text().toLowerCase()).substring(0,1)!==f[t.keyCode]?(b=1,e(document).data("keycount",b)):b>=v.length&&(e(document).data("keycount",0),b>v.length&&(b=1)),i.eq(v[b-1]).focus()}if((/(13|32)/.test(t.keyCode.toString(10))||/(^9$)/.test(t.keyCode.toString(10))&&m.options.selectOnTab)&&c){if(/(32)/.test(t.keyCode.toString(10))||t.preventDefault(),m.options.liveSearch)/(32)/.test(t.keyCode.toString(10))||(m.$menu.find(".active a").click(),p.focus());else{var g=e(":focus");g.click(),g.focus(),t.preventDefault()}e(document).data("keycount",0)}(/(^9$|27)/.test(t.keyCode.toString(10))&&c&&(m.multiple||m.options.liveSearch)||/(27)/.test(t.keyCode.toString(10))&&!c)&&(m.$menu.parent().removeClass("open"),m.$button.focus())}},mobile:function(){this.$element.addClass("mobile-device").appendTo(this.$newElement),this.options.container&&this.$menu.hide()},refresh:function(){this.$lis=null,this.reloadLi(),this.render(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()}};var d=e.fn.selectpicker;e.fn.selectpicker=r,e.fn.selectpicker.Constructor=l,e.fn.selectpicker.noConflict=function(){return e.fn.selectpicker=d,this},e(document).data("keycount",0).on("keydown",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input",l.prototype.keydown).on("focusin.modal",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input",function(e){e.stopPropagation()}),e(window).on("load.bs.select.data-api",function(){e(".selectpicker").each(function(){var t=e(this);r.call(t,t.data())})})}(jQuery);