document.getElementById("addFeed").addEventListener("click", () => {
    const name = document.getElementById("feedName").value;
    const url = document.getElementById("feedUrl").value;
    if (name && url) {
      chrome.storage.sync.get("feeds", (data) => {
        const feeds = data.feeds || [];
        feeds.push({ name, url, image: "default_image_url" });
        chrome.storage.sync.set({ feeds }, () => {
          document.getElementById("feedName").value = "";
          document.getElementById("feedUrl").value = "";
          loadFeeds();
        });
      });
    }
  });
  
  function loadFeeds() {
    chrome.storage.sync.get("feeds", (data) => {
      const feedList = document.getElementById("feedList");
      feedList.innerHTML = "";
      (data.feeds || []).forEach(feed => {
        const li = document.createElement("li");
        li.textContent = feed.name;
        feedList.appendChild(li);
      });
    });
  }
  
  loadFeeds();
  