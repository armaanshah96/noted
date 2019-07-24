var DEBUG_ENV = "DEBUG"
var PRODUCTION_ENV = "PRODUCTION"

/*
  Currently unused
*/
function isDebugMode() {
  var m = null;
  var m = chrome.runtime.getManifest;
  return m && !m.key && !m.update_url ? DEBUG_ENV : PRODUCTION_ENV ;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {

      var url = "https://www.google.com/search?q=" + request.q;

      chrome.tabs.query({
          active: true
        }, tabs => {
          let index = tabs[0].index;
          chrome.tabs.create({
            url,
            index: index + 1
          });
        }
      );

    }
  }
);
