var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
var IOS = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService);
if(location.search === '?options'){
  let uri = IOS.newURI(/^[^?]+/(location)[0], null, null);
  Application.activeWindow.open(uri).focus();
  close();
}
function test(ev){
  var button = this;
  button.disabled = true;
  var RPH = (IOS.getProtocolHandler('resource')
             .QueryInterface(Ci.nsIResProtocolHandler));
  var B = document.getElementById('test-browser');
  var rurl = 'resource://bt/bt.htm';
  var urls = [
    rurl,
    RPH.resolveURI(IOS.newURI(rurl, null, null)),
    ('data:text/html,'+
     '<body onload="with(document)write(typeof Application);close()">'),
    'chrome://bt/content/bt.htm',
    ];
  urls.sort(function() Math.random() - .5);
  B.addEventListener('load', function(){
    var {location} = B.contentWindow;
    location.href =
      'javascript:dump("'+ location.protocol +' "+window.Application+"\\n")';
    var u = urls.shift();
    if(u) setTimeout(function(){ B.setAttribute('src', u) }, 99);
    else {
      B.removeEventListener('load', arguments.callee, false);
      button.disabled = false;
    }
  }, false);
  dump('\n'+ [/^\w+/(u) for each(u in urls)].join(' -> ') +'\n');
  B.setAttribute('src', urls.shift());
}
