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
    'data:text/html,',
    rurl,
    RPH.resolveURI(IOS.newURI(rurl, null, null)),
    'chrome://bt/content/bt.htm',
    ].sort(function() Math.random() - .5);
  B.setAttribute('src', '');
  B.addEventListener('load', function(){
    var {location} = B.contentWindow;
    location.href = 'javascript:0,'+ function(){
      dump(location.protocol +'\n  ');
      try{ dump(Components.ID) } catch(e){ dump(e) }
      dump('\n');
      var xhr = XMLHttpRequest();
      for each(var url in ['http://www.google.com/', location.href]){
        dump('  ');
        try {
          xhr.open('GET', url, false);
          xhr.send(null);
          dump(url +' '+ xhr.status +' '+ xhr.statusText);
        } catch(e){ dump(e.message) }
        dump('\n');
      }
    } +'()';
    var u = urls.pop();
    if(u) setTimeout(function(){ B.setAttribute('src', u) }, 42);
    else {
      B.removeEventListener('load', arguments.callee, false);
      button.disabled = false;
    }
  }, false);
  B.setAttribute('src', urls.pop());
  dump('\n');
}
