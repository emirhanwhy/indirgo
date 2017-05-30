function get_host_name(url){var domain;if(typeof url==='undefined'||url===null){return""}
url=url.toLowerCase();if(url.search(/^http[s]?:\/\//)!==-1){domain=url.split('/')[2]}else{return""}
domain=domain.split(':')[0];return domain}
window.onload=function(){if(typeof adlinkfly_url==='undefined'){return}
if(typeof adlinkfly_api_token==='undefined'){return}
var advert_type=1;if(typeof adlinkfly_advert!=='undefined'){if(adlinkfly_advert==2){advert_type=2}
if(adlinkfly_advert==0){advert_type=0}}
var anchors=document.getElementsByTagName("a");if(typeof adlinkfly_domains!=='undefined'){for(var i=0;i<anchors.length;i++){var hostname=get_host_name(anchors[i].getAttribute("href"));if(hostname.length>0&&adlinkfly_domains.indexOf(hostname.toLowerCase())>-1){anchors[i].href=adlinkfly_url+"st/?api="+encodeURIComponent(adlinkfly_api_token)+"&url="+encodeURIComponent(anchors[i].getAttribute("href"))+"&type="+encodeURIComponent(advert_type)}else{if(anchors[i].protocol==="magnet:"){anchors[i].href=adlinkfly_url+"st/?api="+encodeURIComponent(adlinkfly_api_token)+"&url="+encodeURIComponent(anchors[i].getAttribute("href"))+"&type="+encodeURIComponent(advert_type)}}}
return}
if(typeof adlinkfly_exclude_domains!=='undefined'){for(var i=0;i<anchors.length;i++){var hostname=get_host_name(anchors[i].getAttribute("href"));if(hostname.length>0&&adlinkfly_exclude_domains.indexOf(hostname.toLowerCase())===-1){anchors[i].href=adlinkfly_url+"st/?api="+encodeURIComponent(adlinkfly_api_token)+"&url="+encodeURIComponent(anchors[i].getAttribute("href"))+"&type="+encodeURIComponent(advert_type)}else{if(anchors[i].protocol==="magnet:"){anchors[i].href=adlinkfly_url+"st/?api="+encodeURIComponent(adlinkfly_api_token)+"&url="+encodeURIComponent(anchors[i].getAttribute("href"))+"&type="+encodeURIComponent(advert_type)}}}
return}}