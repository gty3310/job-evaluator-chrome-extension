console.log('running context.js')

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse)=>{

    switch(request.command){
      case "findAllSkills":
        const notChar = (c)=>{
          return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) < 0;
        }

        const allSkills = request.allSkills.sort((a,b)=>b.length - a.length);
        const userSkills = request.userSkills.sort((a,b)=>b.length - a.length);
        let userCounter = {};
        let allCounter = {};

        let reader = document.body.innerHTML;
        let setter = document.body.innerHTML;

        let inCode = false;
        let ridx = 0;
        let sidx = 0;

        while(ridx < reader.length){
          if(reader[ridx]==="<")
            inCode = true;
          else if(reader[ridx]===">")
            inCode = false;

          // scans for keywords by checking strong + 1 char before and after
          let found = false;
          if(!inCode){
            for(let i = 0;i < userSkills.length;i++){

              // checks if the keyword is in the beginning of the string
              let substring = reader.substring(ridx, ridx + userSkills[i].length);
              if(substring.toLowerCase() === userSkills[i].toLowerCase() &&
                  notChar(reader[ridx - 1]) &&
                  notChar(reader[ridx + userSkills[i].length])){
                // increase counter or set counter to 1 for skill
                if(!userCounter[userSkills[i]])
                  userCounter[userSkills[i]] = 1;
                else
                  userCounter[userSkills[i]] += 1;

                if(!allCounter[userSkills[i]])
                  allCounter[userSkills[i]] = 1;
                else
                  allCounter[userSkills[i]] += 1;

                ridx += userSkills[i].length - 1;

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
                let substring = reader.substring(ridx, ridx + allSkills[i].length);
                if(substring.toLowerCase() === allSkills[i].toLowerCase() &&
                    notChar(reader[ridx - 1]) &&
                    notChar(reader[ridx + allSkills[i].length])) {
                  // increase counter or set counter to 1 for keyword
                  if(!allCounter[allSkills[i]])
                    allCounter[allSkills[i]] = 1;
                  else
                    allCounter[allSkills[i]] += 1;

                  ridx += allSkills[i].length - 1;

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
          ridx++;
          sidx++;
        }
        document.body.innerHTML = setter;
        break;
      default:
        console.log('invalid request command');
        break;
    }
  }
);
