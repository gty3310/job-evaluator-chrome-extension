//get info for searching and editting skills
let jobScannerSwitch,userSkills;

chrome.storage.sync.get(
  ['jobScannerSwitch','userSkills'],
  (result) => {
    jobScannerSwitch = result.jobScannerSwitch || false;
    userSkills = result.userSkills || [];
    setSkillsHTML();
  }
);

const originalForm = document.getElementsByTagName('form')[0].innerHTML;

// lists the skills and delete buttons in popup
const setSkillsHTML = ()=>{

  const form = document.getElementsByTagName('form')[0];

  // add UI for each skill
  let skillList = "";
  for(let i = 0;i < userSkills.length;i++){
    skillList += "<div id='skill'>" +
                    userSkills[i] +
                    "<button type='button' id='button"+i+"'>X</button>" +
                  "</div>"
  }
  form.innerHTML = skillList + originalForm;

  // add button functionality to X's
  for(let i = 0;i < userSkills.length;i++){
    let el = document.getElementById('button'+i);
    el.onclick = element=>{
      deleteSkill(i);
    };
  }
}

// delete skill from userskill list
const deleteSkill = i=>{
  console.log('deletSkill');
  userSkills.splice(i,1);
  chrome.storage.sync.set(
    {"userSkills":userSkills},
    ()=>{
      setSkillsHTML();
      chrome.tabs.query(
        {active: true, currentWindow: true},
        tabs =>chrome.tabs.sendMessage(tabs[0].id,{command: "findAllSkills"})
      );
    }
  );
}

// set function of onoff switch
let onoff = document.getElementById('onoff');

onoff.onclick = function(element){
  jobScannerSwitch = !jobScannerSwitch;
  chrome.storage.sync.set(
    {'jobScannerSwitch': jobScannerSwitch},
    ()=>{
      chrome.tabs.query(
        {active: true, currentWindow: true},
        tabs => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            {command: "findAllSkills"}
          );
        }
      );
    }
  );
};

// set form functionality
let form = document.getElementsByTagName('form')[0];

form.onsubmit = (element)=>{
  // saves input to local storage
  let input = document.getElementsByTagName('input')[0].value.trim();
  if(input.length > 0){
    userSkills.push(input);

    chrome.storage.sync.set(
      {'userSkills':userSkills},
      ()=>{
        jobScannerSwitch = true;
        chrome.storage.sync.set(
          {'jobScannerSwitch': true},
          ()=>{
            // send message to active tab to start search
            chrome.tabs.query(
              {active: true, currentWindow: true},
              tabs =>chrome.tabs.sendMessage(tabs[0].id,{command: "findAllSkills"})
            );
            setSkillsHTML();
          }
        );
      }
    );
  }
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{
    //should only receive conter hashes

  }
);
