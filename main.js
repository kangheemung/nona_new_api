
const API_KEY = `#`;
let newsList = [];

const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
       console.log(data);
        newsList = data.articles;
        
        render();
    } catch (error) {
        console.error('Error fetching or parsing data:', error.message);
    }
};
getLatestNews();
      //  console.log(data);
      // render(data.newsList);


//프린트해봅시다.

const render = () => {
    const newsHTML = newsList.map(news=>{
        const imageSrc = news.urlToImage ? news.urlToImage : '<img class="news_size" src="no-pictures.png"/>';

        const summary = news.description && news.description.length > 200 ? news.description.substring(0, 200) + '...' : news.description || '내용없음';
        const sourceName = news.source.name || 'no source';
        const publishedTime = moment(news.publishedAt, "YYYYMMDD").fromNow();
        return `<div class ="row news">
            <div class ="col-lg-4">
                <img class="news_size"
                src=${imageSrc}/>
            </div>
          <div class ="col-lg-8">
              <h2>${news.title}</h2>
              <p>
                 ${summary}
              </p>
              <div>
                 ${sourceName}-${publishedTime}
              </div>
          </div>`;
        }).join("");

    document.getElementById("news-board").innerHTML =newsHTML;
  };
//프린트해봅시다.


