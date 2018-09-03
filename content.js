// get base document to revert to when search is undone
let originalHTML = document.body.innerHTML;
let oldSwitch = undefined;

// finds
const findAllSkills = (sendResponse) => {
  const notChar = (c)=>{
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) < 0;
  }

  let jobScannerSwitch, allSkills, userSkills,floatingDivToggle;
  chrome.storage.sync.get(
    ['jobScannerSwitch','allSkills','userSkills','floatingDivToggle'],
    (result) => {
      jobScannerSwitch = result.jobScannerSwitch || false;
      floatingDivToggle = result.floatingDivToggle;
      allSkills = result.allSkills || [];
      userSkills = result.userSkills || [];

      if(oldSwitch === undefined)
        oldswitch = jobScannerSwitch;
      if(originalHTML === undefined)
        originalHTML = document.body.innerHTML;

      if(!oldSwitch)
        originalHTML = document.body.innerHTML;

      if(!jobScannerSwitch){
        oldSwitch = jobScannerSwitch;
        document.body.innerHTML = originalHTML;
        deleteDiv();
        sendScore(null);
        return;
      }


      allSkills = allSkills.sort((a,b)=>b.length - a.length);
      userSkills = userSkills.sort((a,b)=>b.length - a.length);
      let userCounter = {};
      let allCounter = {};

      let setter = originalHTML;

      let inCode = false;
      let inQuotes = null;
      let sidx = 0;

      while(sidx < setter.length){
        if(inCode && !inQuotes && `\`"'`.indexOf(setter[sidx])>-1)
          inQuotes = setter[sidx];
        else if(inQuotes && setter[sidx] === inQuotes)
          inQuotes = null;
        else if(!inQuotes && setter[sidx]==="<")
          inCode = true;
        else if(!inQuotes && setter[sidx]===">")
          inCode = false;

        // scans for keywords by checking strong + 1 char before and after
        let found = false;
        if(!inCode){
          for(let i = 0;i < userSkills.length;i++){
            if(userSkills[i].length < 1)
              continue;

            // checks if the keyword is in the beginning of the string
            let substring = setter.substring(sidx, sidx + userSkills[i].length);
            if(substring.toLowerCase() === userSkills[i].toLowerCase() &&
                notChar(setter[sidx - 1]) &&
                notChar(setter[sidx + userSkills[i].length])){
              // increase counter or set counter to 1 for skill
              if(!userCounter[userSkills[i]])
                userCounter[userSkills[i]] = 1;
              else
                userCounter[userSkills[i]] += 1;

              if(!allCounter[userSkills[i]])
                allCounter[userSkills[i]] = 1;
              else
                allCounter[userSkills[i]] += 1;

              // insert first half of highligh html
              const highlight1=`<span style="background-color:#00ffcc;">`;
              setter = setter.slice(0,sidx)
                  + highlight1
                  + setter.slice(sidx);
              sidx += highlight1.length + userSkills[i].length;

              const highlight2=`</span>`;
              setter = setter.slice(0,sidx)
                  + highlight2
                  + setter.slice(sidx);
              sidx += highlight2.length - 1;

              found = true;
              break;
            }
          }

          if(!found){
            for(let i = 0;i < allSkills.length;i++){
              // checks if the keyword is in the beginning of the string
              let substring = setter.substring(sidx, sidx + allSkills[i].length);
              if(substring.toLowerCase() === allSkills[i].toLowerCase() &&
                  notChar(setter[sidx - 1]) &&
                  notChar(setter[sidx + allSkills[i].length])) {
                // increase counter or set counter to 1 for keyword
                if(!allCounter[allSkills[i]])
                  allCounter[allSkills[i]] = 1;
                else
                  allCounter[allSkills[i]] += 1;

                // insert first half of highligh html
                const highlight1="<span style='background-color:#ffaa80;'>";
                setter = setter.slice(0,sidx)
                    + highlight1
                    + setter.slice(sidx);
                sidx += highlight1.length + allSkills[i].length;

                const highlight2="</span>";
                setter = setter.slice(0,sidx)
                    + highlight2
                    + setter.slice(sidx);
                sidx += highlight2.length - 1;

                break;
              }
            }
          }
        }
        sidx++;
      }
      document.body.innerHTML = setter;
      const score = processScore(userCounter,allCounter);
      if(floatingDivToggle)
        createUpdateDiv(score);
      else
        deleteDiv();

      sendScore(score);

      oldSwitch = jobScannerSwitch;
    }
  );
};
window.onload = ()=> {
  chrome.storage.sync.get(
    ['jobScannerSwitch','allSkills','userSkills'],
    (result) => {
      jobScannerSwitch = result.jobScannerSwitch || false;
      if(jobScannerSwitch)
        findAllSkills();
    }
  )
};

const processScore = (userCounter, allCounter)=>{
  let userScores = Object.values(userCounter);
  let allScores = Object.values(allCounter);
  let userScore = 0;
  let allScore = 0;
  const log2 = Math.log(2);
  userScores.forEach(score=>{
    userScore += 1 + Math.log(score)/log2;
  });
  allScores.forEach(score=>{
    allScore += 1 + Math.log(score)/log2;
  });
  return Math.floor(userScore/allScore * 100 + .5) || 0;
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{
    switch(request.command){
      case "findAllSkills":
        findAllSkills();
        break;
      default:
        console.log('invalid request command');
        break;
    }
  }
);

const sendScore = score=>{
  chrome.runtime.sendMessage({score: score});
}
