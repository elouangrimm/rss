chrome.alarms.onAlarm.addListener(async (alarm) => {
    const feeds = await getFeeds();
    for (const feed of feeds) {
      const newPosts = await checkFeed(feed.url);
      if (newPosts.length > 0) {
        newPosts.forEach(post => {
          chrome.notifications.create({
            type: "basic",
            iconUrl: feed.image,
            title: post.title,
            message: post.description,
            priority: 2
          });
        });
      }
    }
  });
  
  async function getFeeds() {
    return new Promise((resolve) => {
      chrome.storage.sync.get("feeds", (data) => {
        resolve(data.feeds || []);
      });
    });
  }
  
  async function checkFeed(url) {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/xml");
    const items = doc.querySelectorAll("item");
    const posts = Array.from(items).map(item => ({
      title: item.querySelector("title").textContent,
      description: item.querySelector("description").textContent,
      image: item.querySelector("image") ? item.querySelector("image").textContent : ''
    }));
    return posts;
  }
  