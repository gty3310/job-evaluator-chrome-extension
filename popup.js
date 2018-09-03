//get info for searching and editting skills
let jobScannerSwitch,userSkills,floatingDivToggle;

chrome.storage.sync.get(
  ['jobScannerSwitch','userSkills','floatingDivToggle'],
  (result) => {
    jobScannerSwitch = result.jobScannerSwitch || false;
    floatingDivToggle = result.floatingDivToggle;
    userSkills = result.userSkills || [];

    let onoff = document.getElementById('onoff');
    if(jobScannerSwitch){
      onoff.innerText = 'Turn Off';
      onoff.setAttribute('style','background-color:red;')
    }
    else{
      onoff.innerText = 'Turn On';
      onoff.setAttribute('style','background-color:#00ffcc;')
    }

    let toggle = document.getElementById('toggleFloatingDiv');
    if(floatingDivToggle){
      toggle.innerText = 'Hide Floating Element';
      toggle.setAttribute('style','background-color:red;');
    }
    else{
      toggle.innerText = 'Show Floating Element';
      toggle.setAttribute('style','background-color:#00ffcc;');
    }

    setSkillsHTML();
    document.getElementsByTagName('input')[0].focus();
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
  userSkills.splice(i,1);
  chrome.storage.sync.set(
    {"userSkills":userSkills},
    ()=>{
      setSkillsHTML();
      document.getElementsByTagName('input')[0].focus();
      chrome.tabs.query(
        {active: true, currentWindow: true},
        tabs =>chrome.tabs.sendMessage(
          tabs[0].id,
          {command: "findAllSkills"}
        )
      );
    }
  );
}

// set functionality of floating div toggle
let toggle = document.getElementById('toggleFloatingDiv');

toggle.onclick = function(element){
  floatingDivToggle = !floatingDivToggle;
  let toggle = document.getElementById('toggleFloatingDiv');
  if(floatingDivToggle){
    toggle.innerText = 'Hide Floating Element';
    toggle.setAttribute('style','background-color:red;');
  }
  else{
    toggle.innerText = 'Show Floating Element';
    toggle.setAttribute('style','background-color:#00ffcc;');
  }

  chrome.storage.sync.set(
    {'floatingDivToggle':floatingDivToggle},
    ()=>{
      document.getElementsByTagName('input')[0].focus();
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
}


// set function of onoff switch
let onoff = document.getElementById('onoff');

onoff.onclick = function(element){
  jobScannerSwitch = !jobScannerSwitch;
  if(jobScannerSwitch){
    onoff.innerText = 'Turn Off';
    onoff.setAttribute('style','background-color:red;')
  }
  else{
    onoff.innerText = 'Turn On';
    onoff.setAttribute('style','background-color:#00ffcc;')
  }
  chrome.storage.sync.set(
    {'jobScannerSwitch': jobScannerSwitch},
    ()=>{
      document.getElementsByTagName('input')[0].focus();
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

const updateScore=(score)=>{
  console.log('update score');
  let scoreDiv = document.getElementById('scoreDiv');
  if(score !== null)
    scoreDiv.innerText = `Score: ${score}%`;
  else
    scoreDiv.innerText = null;
}

// set form functionality
let form = document.getElementsByTagName('form')[0];

form.oninput = (e)=>{
  let textinput = document.getElementsByTagName('input')[0];
  textinput.setAttribute('style', `width:${textinput.value.length * 16}px;`);
}

form.onsubmit = (element)=>{
  // saves input to local storage
  let input = document.getElementsByTagName('input')[0].value.trim();
  if(input.length > 0 && userSkills.indexOf(input.toLowerCase())<0){
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
              tabs =>chrome.tabs.sendMessage(
                tabs[0].id,
                {command: "findAllSkills"}
              )
            );
            setSkillsHTML();
            document.getElementsByTagName('input')[0].focus();
          }
        );
      }
    );
  }
};

document.body.onclick = e=>{
  document.getElementsByTagName('input')[0].focus();
}

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    console.log(request.score);
    updateScore(request.score);
  }
)

chrome.tabs.query(
  {active: true, currentWindow: true},
  tabs =>chrome.tabs.sendMessage(
    tabs[0].id,
    {command: "findAllSkills"}
  )
);
