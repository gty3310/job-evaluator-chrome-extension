let button = document.getElementById('search');

button.onclick = function(element){
  console.log('button pressed');

  chrome.tabs.query(
    {active: true, currentWindow: true},
    function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {command: "findAllSkills",keywords:['a']},
        function(response) {
          //do something with the response
        }
      );
    }
  );
};
