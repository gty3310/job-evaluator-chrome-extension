console.log('running context.js')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log('receive message');

    switch(request.command){
      case "findAllSkills":
        console.log("finding all skills");

        var skillsList = ["react.js", "JavaScript", "script", "react"];
        var userSkillsList = [ "JavaScript"];

        //get the number of appearances of a keyword
        var wholeText =  document.body.innerText;
        var skillInReg = "";
        var skillsCount = 0;
        var userSkillsCount = 0;
        for (let listIndex = 0; listIndex < skillsList.length; listIndex ++){
            skillInReg = new RegExp("\\b"+skillsList[listIndex]+ "\\b",'gi');
            skillsCount += (wholeText.match(skillInReg) || []).length;
        }
        for (let listIndex = 0; listIndex < userSkillsList.length; listIndex ++){
            skillInReg = new RegExp("\\b"+userSkillsList[listIndex]+ "\\b",'gi');
            userSkillsCount += (wholeText.match(skillInReg) || []).length;
        }

        console.log("------skillsCount:");
        console.log(skillsCount);
        console.log("------userSkillsCount:");
        console.log(userSkillsCount);

        break;
      default:
        console.log('invalid request command');
        break;
    }
    console.log('end of onMesasge');
  }
);
