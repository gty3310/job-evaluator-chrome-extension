console.log('running context.js')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){

    switch(request.command){
      case "findAllSkills":
        //-----------------------------------------------------------
        var keywords = request.keywords.sort((a,b)=>b.length - a.length);
        var keywordCounter = {};

        var reader = document.body.innerHTML;
        var setter = document.body.innerHTML;

        var inCode = false;
        var inQuotes = false;
        var ridx = 0;
        var sidx = 0;

        while(ridx < reader.length){
          // makes sure keyword isn't in html code
          if(reader[i]==="<" && !inQuotes)
            inCode = true;
          else if(reader[i]===">" && !inQuotes)
            inCode = false;
          else if("`'\"".indexOf(reader[i]) > -1)
            inQuotes = !inQuotes;

          // scans for keywords by checking strong + 1 char before and after
          if(!inCode){
            for(let i = 0;i < keywords.length;i++){
              skillInReg = new RegExp("\\b"+keywords[i]+ "\\b",'gi');
              skillsCount += (wholeText.match(skillInReg) || []).length;

            }
          }
        }
        //-----------------------------------------------------------
        var skillsList = ["react.js", "JavaScript", "react", 'retrieve'];
        var userSkillsList = [ "JavaScript"];

        //get the number of appearances of a keyword
        var wholeText =  document.body.innerText;
        var skillInReg = "";
        var skillsCount = 0;
        var userSkillsCount = 0;
        for (let listIndex = 0; listIndex < skillsList.length; listIndex ++){
          skillInReg = new RegExp("\\b"+skillsList[listIndex]+ "\\b",'gi');
          skillsCount += (wholeText.match(skillInReg) || []).length;

          //add highlight to words
          var replaceText = "<cake style='background-color:red;'>"
                            + skillsList[listIndex]
                            + "</cake>";
          var wholeHTML = document.body.innerHTML;
          var newHTML = wholeHTML.replace(skillInReg, replaceText);
          if(wholeHTML !== newHTML)
            document.body.innerHTML = newHTML;
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
