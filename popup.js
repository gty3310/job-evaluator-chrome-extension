let button = document.getElementById('search');

//get info for searching and editting skills
let extensionSwitch;

chrome.storage.sync.get(
  ['jobScannerSwitch'],
  (result) => {
    extensionSwitch = result.jobScannerSwitch || false;
  }
);

button.onclick = function(element){
  let input = document.getElementsByTagName('input')[0];
  extensionSwitch = !extensionSwitch;
  chrome.storage.sync.set(
    {'jobScannerSwitch': extensionSwitch},
    function() {

    }
  );

  chrome.tabs.query(
    {active: true, currentWindow: true},
    tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          command: "findAllSkills",
          allSkills:['JavaScript','question'],
          userSkills:['question']
        },
        function(response) {
          //do something with the response
        }
      );
    }
  );
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{
    let input = document.getElementsByTagName('input')[0].split(', ');

    console.log('receive request ',request.command);
    switch(request.command){
      case "getParams":
        sendResponse({
          userSkills:input,
          allSkills:['JavaScript', 'question']
        });
        break;
      default:
        console.log("bad request command to popup");
        break;
    }
  }
);
