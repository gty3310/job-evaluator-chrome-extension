var elements = document.getElementsByTagName('*');

var num = 0;

var skillsList = ["javascript", "HTML", "extension", "Script"];

//get the number of appearance of a keyword
var wholeText =  document.body.innerText;
var skillInReg = "";
var skillsCount = 0;
for (let listIndex = 0; listIndex < skillsList.length; listIndex ++){
    skillInReg = new RegExp(skillsList[listIndex],'g');
    skillsCount += (wholeText.match(skillInReg) || []).length;
}


