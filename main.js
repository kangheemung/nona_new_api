const API_KEY = `474e84f656e2471a85bcbe8ad971e094`;

const getLatestNews = async () => {
const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
        
try { const response = await fetch(url);
        console.log("rrr",response)
        const data = await response.json();
        newsList = data.articles;
        console.log("ddd",newsList);
        render();
      //  console.log(data);
       // render(data.articles);
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

