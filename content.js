// get base document to revert to when search is undone
const originalHTML = document.body.innerHTML;

// finds
const findAllSkills = () => {
  const notChar = (c)=>{
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) < 0;
  }

  let jobScannerSwitch, allSkills, userSkills;
  chrome.storage.sync.get(
    ['jobScannerSwitch','allSkills','userSkills'],
    (result) => {
      jobScannerSwitch = result.jobScannerSwitch || false;
      allSkills = result.allSkills || [];
      userSkills = result.userSkills || [];

      if(!jobScannerSwitch){
        document.body.innerHTML = originalHTML;
        return;
      }


      allSkills = allSkills.sort((a,b)=>b.length - a.length);
      userSkills = userSkills.sort((a,b)=>b.length - a.length);
      let userCounter = {};
      let allCounter = {};

      let setter = originalHTML;

      let inCode = false;
      let sidx = 0;

      while(sidx < setter.length){
        if(setter[sidx]==="<")
          inCode = true;
        else if(setter[sidx]===">")
          inCode = false;

        // scans for keywords by checking strong + 1 char before and after
        let found = false;
        if(!inCode){
          for(let i = 0;i < userSkills.length;i++){

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
              const highlight1=`<cake style="background-color:#00ffcc;">`;
              setter = setter.slice(0,sidx)
                  + highlight1
                  + setter.slice(sidx);
              sidx += highlight1.length + userSkills[i].length;

              const highlight2=`</cake>`;
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
                const highlight1="<cake style='background-color:#ffaa80;'>";
                setter = setter.slice(0,sidx)
                    + highlight1
                    + setter.slice(sidx);
                sidx += highlight1.length + allSkills[i].length;

                const highlight2="</cake>";
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
    }
  );
};

findAllSkills();

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{
    let something;

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
