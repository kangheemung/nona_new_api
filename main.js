const fetch = require('node-fetch');
const API_KEY = `581de57429b4469fb96dc6b412a811b2`;
const newsList = [];

const getLatestNews = async () => {
const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

try {
    const response = await fetch(url, { method: 'GET', mode: 'cors', redirect: 'follow' });
    
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    newsList.push(...data.articles);
    console.log("Data:", data.articles);
} catch (error) {
    console.error('Error fetching data:', error);
}
};

//프린트해봅시다.

const render=()=>{
    const newsHTML = newsList.map(
         news=>
          ` <div class ="row news">
          <div class ="col-lg-4">
              <img class="news-img-size"
                src=${news.urlToImage}/>
          </div>
          <div class ="col-lg-8">
              <h2>${news.title}</h2>
              <p>
                 ${news.description}
              </p>
              <div>
                 ${news.source.name}*${news.publichedAt}
    
          </div>`
      ).join("");
    document.getElementById("news-board").innerHTML =newsHTML;
  };
//프린트해봅시다.

getLatestNews();

