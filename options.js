document.getElementById("save").addEventListener("click", () => {
    const interval = document.getElementById("interval").value;
    chrome.storage.sync.set({ interval }, () => {
      chrome.alarms.create("feedCheck", { periodInMinutes: parseInt(interval) });
    });
  });
  
  function loadSettings() {
    chrome.storage.sync.get("interval", (data) => {
      document.getElementById("interval").value = data.interval || 10;
    });
  }
  
  loadSettings();
  