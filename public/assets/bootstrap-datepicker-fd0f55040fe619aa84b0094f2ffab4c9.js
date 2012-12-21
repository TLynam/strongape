/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(a){var b=function(b,e){this.element=a(b),this.language=e.language||this.element.data("date-language")||"en",this.language=this.language in c?this.language:"en",this.format=d.parseFormat(e.format||this.element.data("date-format")||"mm/dd/yyyy"),this.picker=a(d.template).appendTo("body").on({click:a.proxy(this.click,this),mousedown:a.proxy(this.mousedown,this)}),this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on"):!1,this.component&&this.component.length===0&&(this.component=!1);if(this.isInput)this.element.on({focus:a.proxy(this.show,this),blur:a.proxy(this._hide,this),keyup:a.proxy(this.update,this),keydown:a.proxy(this.keydown,this)});else if(this.component){this.component.on("click",a.proxy(this.show,this));var b=this.element.find("input");b.on({blur:a.proxy(this._hide,this)})}else this.element.on("click",a.proxy(this.show,this));this.autoclose=!1,"autoclose"in e?this.autoclose=e.autoclose:"dateAutoclose"in this.element.data()&&(this.autoclose=this.element.data("date-autoclose"));switch(e.startView){case 2:case"decade":this.viewMode=this.startViewMode=2;break;case 1:case"year":this.viewMode=this.startViewMode=1;break;case 0:case"month":default:this.viewMode=this.startViewMode=0}this.weekStart=(e.weekStart||this.element.data("date-weekstart")||c[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.startDate=-Infinity,this.endDate=Infinity,this.setStartDate(e.startDate||this.element.data("date-startdate")),this.setEndDate(e.endDate||this.element.data("date-enddate")),this.fillDow(),this.fillMonths(),this.update(),this.showMode()};b.prototype={constructor:b,show:function(b){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.place(),a(window).on("resize",a.proxy(this.place,this)),b&&(b.stopPropagation(),b.preventDefault()),this.isInput||a(document).on("mousedown",a.proxy(this.hide,this)),this.element.trigger({type:"show",date:this.date})},_hide:function(b){if(!a.browser.msie)return this.hide.apply(this,arguments);var c=this,d=arguments;function e(){clearTimeout(g),b.target.focus(),c.picker.off("click",e)}function f(){c.hide.apply(c,d),c.picker.off("click",e)}this.picker.on("click",e);var g=setTimeout(f,100)},hide:function(b){this.picker.hide(),a(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||a(document).off("mousedown",this.hide),b&&b.currentTarget.value&&this.setValue(),this.element.trigger({type:"hide",date:this.date})},setValue:function(){var a=d.formatDate(this.date,this.format,this.language);this.isInput?this.element.prop("value",a):(this.component&&this.element.find("input").prop("value",a),this.element.data("date",a))},setStartDate:function(a){this.startDate=a||-Infinity,this.startDate!==-Infinity&&(this.startDate=d.parseDate(this.startDate,this.format,this.language)),this.update(),this.updateNavArrows()},setEndDate:function(a){this.endDate=a||Infinity,this.endDate!==Infinity&&(this.endDate=d.parseDate(this.endDate,this.format,this.language)),this.update(),this.updateNavArrows()},place:function(){var a=this.component?this.component.offset():this.element.offset();this.picker.css({top:a.top+this.height,left:a.left})},update:function(){this.date=d.parseDate(this.isInput?this.element.prop("value"):this.element.data("date"),this.format,this.language),this.date<this.startDate?this.viewDate=new Date(this.startDate):this.date>this.endDate?this.viewDate=new Date(this.endDate):this.viewDate=new Date(this.date),this.fill()},fillDow:function(){var a=this.weekStart,b="<tr>";while(a<this.weekStart+7)b+='<th class="dow">'+c[this.language].daysMin[a++%7]+"</th>";b+="</tr>",this.picker.find(".datepicker-days thead").append(b)},fillMonths:function(){var a="",b=0;while(b<12)a+='<span class="month">'+c[this.language].monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").html(a)},fill:function(){var a=new Date(this.viewDate),b=a.getFullYear(),e=a.getMonth(),f=this.startDate!==-Infinity?this.startDate.getFullYear():-Infinity,g=this.startDate!==-Infinity?this.startDate.getMonth():-Infinity,h=this.endDate!==Infinity?this.endDate.getFullYear():Infinity,i=this.endDate!==Infinity?this.endDate.getMonth():Infinity,j=this.date.valueOf();this.picker.find(".datepicker-days th:eq(1)").text(c[this.language].months[e]+" "+b),this.updateNavArrows(),this.fillMonths();var k=new Date(b,e-1,28,0,0,0,0),l=d.getDaysInMonth(k.getFullYear(),k.getMonth());k.setDate(l),k.setDate(l-(k.getDay()-this.weekStart+7)%7);var m=new Date(k);m.setDate(m.getDate()+42),m=m.valueOf(),html=[];var n;while(k.valueOf()<m){k.getDay()==this.weekStart&&html.push("<tr>"),n="";if(k.getFullYear()<b||k.getFullYear()==b&&k.getMonth()<e)n+=" old";else if(k.getFullYear()>b||k.getFullYear()==b&&k.getMonth()>e)n+=" new";k.valueOf()==j&&(n+=" active");if(k.valueOf()<this.startDate||k.valueOf()>this.endDate)n+=" disabled";html.push('<td class="day'+n+'">'+k.getDate()+"</td>"),k.getDay()==this.weekEnd&&html.push("</tr>"),k.setDate(k.getDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(html.join(""));var o=this.date.getFullYear(),p=this.picker.find(".datepicker-months").find("th:eq(1)").text(b).end().find("span").removeClass("active");o==b&&p.eq(this.date.getMonth()).addClass("active"),(b<f||b>h)&&p.addClass("disabled"),b==f&&p.slice(0,g).addClass("disabled"),b==h&&p.slice(i+1).addClass("disabled"),html="",b=parseInt(b/10,10)*10;var q=this.picker.find(".datepicker-years").find("th:eq(1)").text(b+"-"+(b+9)).end().find("td");b-=1;for(var r=-1;r<11;r++)html+='<span class="year'+(r==-1||r==10?" old":"")+(o==b?" active":"")+(b<f||b>h?" disabled":"")+'">'+b+"</span>",b+=1;q.html(html)},updateNavArrows:function(){var a=new Date(this.viewDate),b=a.getFullYear(),c=a.getMonth();switch(this.viewMode){case 0:this.startDate!==-Infinity&&b<=this.startDate.getFullYear()&&c<=this.startDate.getMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==Infinity&&b>=this.endDate.getFullYear()&&c>=this.endDate.getMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.startDate!==-Infinity&&b<=this.startDate.getFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==Infinity&&b>=this.endDate.getFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(b){b.stopPropagation(),b.preventDefault();var c=a(b.target).closest("span, td, th");if(c.length==1)switch(c[0].nodeName.toLowerCase()){case"th":switch(c[0].className){case"switch":this.showMode(1);break;case"prev":case"next":var e=d.modes[this.viewMode].navStep*(c[0].className=="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,e);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,e)}this.fill()}break;case"span":if(!c.is(".disabled")){if(c.is(".month")){var f=c.parent().find("span").index(c);this.viewDate.setMonth(f)}else{var g=parseInt(c.text(),10)||0;this.viewDate.setFullYear(g)}this.showMode(-1),this.fill()}break;case"td":if(c.is(".day")&&!c.is(".disabled")){var h=parseInt(c.text(),10)||1,g=this.viewDate.getFullYear(),f=this.viewDate.getMonth();c.is(".old")?f==0?(f=11,g-=1):f-=1:c.is(".new")&&(f==11?(f=0,g+=1):f+=1),this.date=new Date(g,f,h,0,0,0,0),this.viewDate=new Date(g,f,h,0,0,0,0),this.fill(),this.setValue(),this.element.trigger({type:"changeDate",date:this.date});var i;this.isInput?i=this.element:this.component&&(i=this.element.find("input")),i&&(i.change(),this.autoclose&&i.blur())}}},mousedown:function(a){a.stopPropagation(),a.preventDefault()},moveMonth:function(a,b){if(!b)return a;var c=new Date(a.valueOf()),d=c.getDate(),e=c.getMonth(),f=Math.abs(b),g,h;b=b>0?1:-1;if(f==1){h=b==-1?function(){return c.getMonth()==e}:function(){return c.getMonth()!=g},g=e+b,c.setMonth(g);if(g<0||g>11)g=(g+12)%12}else{for(var i=0;i<f;i++)c=this.moveMonth(c,b);g=c.getMonth(),c.setDate(d),h=function(){return g!=c.getMonth()}}while(h())c.setDate(--d),c.setMonth(g);return c},moveYear:function(a,b){return this.moveMonth(a,b*12)},keydown:function(a){if(this.picker.is(":not(:visible)")){a.keyCode==27&&this.show();return}var b=!1,c,d,e;switch(a.keyCode){case 27:this.hide(),a.preventDefault();break;case 37:case 39:c=a.keyCode==37?-1:1,a.ctrlKey?(this.date=this.moveYear(this.date,c),this.viewDate=this.moveYear(this.viewDate,c)):a.shiftKey?(this.date=this.moveMonth(this.date,c),this.viewDate=this.moveMonth(this.viewDate,c)):(this.date.setDate(this.date.getDate()+c),this.viewDate.setDate(this.viewDate.getDate()+c)),this.setValue(),this.update(),a.preventDefault(),b=!0;break;case 38:case 40:c=a.keyCode==38?-1:1,a.ctrlKey?(this.date=this.moveYear(this.date,c),this.viewDate=this.moveYear(this.viewDate,c)):a.shiftKey?(this.date=this.moveMonth(this.date,c),this.viewDate=this.moveMonth(this.viewDate,c)):(this.date.setDate(this.date.getDate()+c*7),this.viewDate.setDate(this.viewDate.getDate()+c*7)),this.setValue(),this.update(),a.preventDefault(),b=!0;break;case 13:this.hide(),a.preventDefault()}if(b){this.element.trigger({type:"changeDate",date:this.date});var f;this.isInput?f=this.element:this.component&&(f=this.element.find("input")),f&&f.change()}},showMode:function(a){a&&(this.viewMode=Math.max(0,Math.min(2,this.viewMode+a))),this.picker.find(">div").hide().filter(".datepicker-"+d.modes[this.viewMode].clsName).show(),this.updateNavArrows()}},a.fn.datepicker=function(c){var d=Array.apply(null,arguments);return d.shift(),this.each(function(){var e=a(this),f=e.data("datepicker"),g=typeof c=="object"&&c;f||e.data("datepicker",f=new b(this,a.extend({},a.fn.datepicker.defaults,g))),typeof c=="string"&&f[c].apply(f,d)})},a.fn.datepicker.defaults={},a.fn.datepicker.Constructor=b;var c=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},d={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,d.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[-`{-~\t\n\r]+/g,parseFormat:function(a){var b=a.replace(this.validParts,"\0").split("\0"),c=a.match(this.validParts);if(!b||!b.length||!c||c.length==0)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(d,e,f){if(d instanceof Date)return d;if(/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(d)){var g=/([-+]\d+)([dmwy])/,h=d.match(/([-+]\d+)([dmwy])/g),i,j;d=new Date;for(var k=0;k<h.length;k++){i=g.exec(h[k]),j=parseInt(i[1]);switch(i[2]){case"d":d.setDate(d.getDate()+j);break;case"m":d=b.prototype.moveMonth.call(b.prototype,d,j);break;case"w":d.setDate(d.getDate()+j*7);break;case"y":d=b.prototype.moveYear.call(b.prototype,d,j)}}return new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0)}var h=d?d.match(this.nonpunctuation):[],d=new Date,l={},m=["yyyy","yy","M","MM","m","mm","d","dd"],n={yyyy:function(a,b){return a.setFullYear(b)},yy:function(a,b){return a.setFullYear(2e3+b)},m:function(a,b){return a.setMonth(b-1)},d:function(a,b){return a.setDate(b)}},o,p,i;n.M=n.MM=n.mm=n.m,n.dd=n.d,d=new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0);if(h.length==e.parts.length){for(var k=0,q=e.parts.length;k<q;k++){o=parseInt(h[k],10)||1,i=e.parts[k];switch(i){case"MM":p=a(c[f].months).filter(function(){var a=this.slice(0,h[k].length),b=h[k].slice(0,a.length);return a==b}),o=a.inArray(p[0],c[f].months)+1;break;case"M":p=a(c[f].monthsShort).filter(function(){var a=this.slice(0,h[k].length),b=h[k].slice(0,a.length);return a==b}),o=a.inArray(p[0],c[f].monthsShort)+1}l[i]=o}for(var k=0,r;k<m.length;k++)r=m[k],r in l&&n[r](d,l[r])}return d},formatDate:function(b,d,e){var f={d:b.getDate(),m:b.getMonth()+1,M:c[e].monthsShort[b.getMonth()],MM:c[e].months[b.getMonth()],yy:b.getFullYear().toString().substring(2),yyyy:b.getFullYear()};f.dd=(f.d<10?"0":"")+f.d,f.mm=(f.m<10?"0":"")+f.m;var b=[],g=a.extend([],d.separators);for(var h=0,i=d.parts.length;h<i;h++)g.length&&b.push(g.shift()),b.push(f[d.parts[h]]);return b.join("")},headTemplate:'<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};d.template='<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">'+d.headTemplate+"<tbody></tbody>"+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+d.headTemplate+d.contTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+d.headTemplate+d.contTemplate+"</table>"+"</div>"+"</div>"}(window.jQuery),function(a){a.fn.datepicker.dates.br={days:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],daysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],daysMin:["Do","Se","Te","Qu","Qu","Se","Sa","Do"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]}}(jQuery),function(a){a.fn.datepicker.dates.da={days:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag","Søndag"],daysShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør","Søn"],daysMin:["Sø","Ma","Ti","On","To","Fr","Lø","Sø"],months:["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"],monthsShort:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]}}(jQuery),function(a){a.fn.datepicker.dates.de={days:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],daysShort:["Son","Mon","Die","Mit","Don","Fre","Sam","Son"],daysMin:["So","Mo","Di","Mi","Do","Fr","Sa","So"],months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]}}(jQuery),function(a){a.fn.datepicker.dates.es={days:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],daysShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],daysMin:["Do","Lu","Ma","Mi","Ju","Vi","Sa","Do"],months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthsShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]}}(jQuery),function(a){a.fn.datepicker.dates.fi={days:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai","sunnuntai"],daysShort:["sun","maa","tii","kes","tor","per","lau","sun"],daysMin:["su","ma","ti","ke","to","pe","la","su"],months:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],monthsShort:["tam","hel","maa","huh","tou","kes","hei","elo","syy","lok","mar","jou"]}}(jQuery),function(a){a.fn.datepicker.dates.fr={days:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"],daysShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam","Dim"],daysMin:["D","L","Ma","Me","J","V","S","D"],months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthsShort:["Jan","Fev","Mar","Avr","Mai","Jui","Jul","Aou","Sep","Oct","Nov","Dec"]}}(jQuery),function(a){a.fn.datepicker.dates.is={days:["Sunnudagur","Mánudagur","Þriðjudagur","Miðvikudagur","Fimmtudagur","Föstudagur","Laugardagur","Sunnudagur"],daysShort:["Sun","Mán","Þri","Mið","Fim","Fös","Lau","Sun"],daysMin:["Su","Má","Þr","Mi","Fi","Fö","La","Su"],months:["Janúar","Febrúar","Mars","Apríl","Maí","Júní","Júlí","Ágúst","September","Október","Nóvember","Desember"],monthsShort:["Jan","Feb","Mar","Apr","Maí","Jún","Júl","Ágú","Sep","Okt","Nóv","Des"]}}(jQuery),function(a){a.fn.datepicker.dates.it={days:["Domenica","Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato","Domenica"],daysShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab","Dom"],daysMin:["Do","Lu","Ma","Me","Gi","Ve","Sa","Do"],months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],monthsShort:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"]}}(jQuery),function(a){a.fn.datepicker.dates.lv={days:["Svētdiena","Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena","Svētdiena"],daysShort:["Sv","P","O","T","C","Pk","S","Sv"],daysMin:["Sv","Pr","Ot","Tr","Ce","Pk","St","Sv"],months:["Janvāris","Februāris","Marts","Aprīlis","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"],monthsShort:["Jan","Feb","Mar","Apr","Mai","Jūn","Jūl","Aug","Sep","Okt","Nov","Dec."],weekStart:1}}(jQuery),function(a){a.fn.datepicker.dates.nb={days:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag","Søndag"],daysShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør","Søn"],daysMin:["Sø","Ma","Ti","On","To","Fr","Lø","Sø"],months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],monthsShort:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"]}}(jQuery),function(a){a.fn.datepicker.dates.nl={days:["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"],daysShort:["Zo","Ma","Di","Wo","Do","Vr","Za","Zo"],daysMin:["Zo","Ma","Di","Wo","Do","Vr","Za","Zo"],months:["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],monthsShort:["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]}}(jQuery),function(a){a.fn.datepicker.dates.pl={days:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"],daysShort:["Nie","Pn","Wt","Śr","Czw","Pt","So","Nie"],daysMin:["N","Pn","Wt","Śr","Cz","Pt","So","N"],months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthsShort:["Sty","Lu","Mar","Kw","Maj","Cze","Lip","Sie","Wrz","Pa","Lis","Gru"]}}(jQuery),function(a){a.fn.datepicker.dates.ru={days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],daysShort:["Вск","Пнд","Втр","Срд","Чтв","Птн","Суб","Вск"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб","Вс"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"]}}(jQuery),function(a){a.fn.datepicker.dates.sv={days:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"],daysShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör","Sön"],daysMin:["Sö","Må","Ti","On","To","Fr","Lö","Sö"],months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],monthsShort:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]}}(jQuery),function(a){a.fn.datepicker.dates.th={days:["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์","อาทิตย์"],daysShort:["อา","จ","อ","พ","พฤ","ศ","ส","อา"],daysMin:["อา","จ","อ","พ","พฤ","ศ","ส","อา"],months:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],monthsShort:["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]}}(jQuery),function(a){a.fn.datepicker.dates.tr={days:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],daysShort:["Pz","Pzt","Sal","Çrş","Prş","Cu","Cts","Pz"],daysMin:["Pz","Pzt","Sa","Çr","Pr","Cu","Ct","Pz"],months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],monthsShort:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"]}}(jQuery),function(a){a.fn.datepicker.dates["zh-CN"]={days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六","星期日"],daysShort:["周日","周一","周二","周三","周四","周五","周六","周日"],daysMin:["日","一","二","三","四","五","六","日"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthsShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}}(jQuery);