const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
var IOS = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService);
var RPH = (IOS.getProtocolHandler('resource')
           .QueryInterface(Ci.nsIResProtocolHandler));
var B = document.getElementById('test-browser');
var rurl = 'resource://bt/bt.htm';
var urls = [
  rurl,
  RPH.resolveURI(IOS.newURI(rurl, null, null)),
  'data:text/html,bt',
  'chrome://bt/content/bt.htm',
  ];
urls.sort(function() Math.random() - .5);
B.addEventListener('load', function(){
  var {location} = B.contentWindow;
  location.href =
    'javascript:dump("'+ location.protocol +' "+window.Application+"\\n")';
  var u = urls.shift();
  if(u) setTimeout(function(){ B.setAttribute('src', u) });
}, false);
B.setAttribute('src', urls.shift());
dump('\n');
