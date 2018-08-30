//get info for searching and editting skills
let jobScannerSwitch;

chrome.storage.sync.get(
  ['jobScannerSwitch'],
  (result) => {
    jobScannerSwitch = result.jobScannerSwitch || false;
  }
);

// set input field
let inputField = document.getElementsByTagName('input')[0];

chrome.storage.sync.get(
  ['userSkills'],
  result => {
    console.log(result.userSkills);
    inputField.value = result.userSkills.join(', ');
  }
)

// set function of onoff switch
let onoff = document.getElementById('onoff');

onoff.onclick = function(element){
  jobScannerSwitch = !jobScannerSwitch;
  chrome.storage.sync.set(
    {'jobScannerSwitch': jobScannerSwitch}
  );

  chrome.tabs.query(
    {active: true, currentWindow: true},
    tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {command: "findAllSkills"}
      );
    }
  );
};

// set form functionality
let form = document.getElementsByTagName('form')[0];

form.onsubmit = (element)=>{
  element.preventDefault();//can remove if box entering is complete
  // input.value = textInput;


  // saves input to local storage
  let input = document.getElementsByTagName('input')[0];
  let textInput = input.value;
  chrome.storage.sync.set({"userSkills":input.value.split(", ")});

  jobScannerSwitch = true;
  chrome.storage.sync.set({'jobScannerSwitch': true});

  // send message to active tab to start search
  chrome.tabs.query(
    {active: true, currentWindow: true},
    tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {command: "findAllSkills"}
      );
    }
  );
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{
    //shoulud only receive conter hashes

  }
);
