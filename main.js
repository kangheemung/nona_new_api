
const API_KEY = `474e84f656e2471a85bcbe8ad971e094`;
let newsList = [];
const menus =document.querySelectorAll(".menus button");
console.log(menus);
  menus.forEach(menu => menu.addEventListener("click",(e) => getNewsByCategory(e)));
//1.버튼들에게 클릭 이벤트 줘야 한다.ok

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
//카테고리 별로 검색하는 기능을 만들어 봅시다.

//1.버튼들에게 클릭 이벤트 줘야 한다.ok
//2.카테고리별 뉴스 가져오기
//3.그뉴스를 보여주기

const getNewsByCategory = (e) => {
    const category = e.target.textContent.toLowerCase();
      console.log("category", category);
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Data", data);
        })
        .catch(error => console.error('Error fetching or parsing data:', error.message));
};

const render = () => {
    const newsHTML = newsList.map(news => {
        const imageSrc = news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
        const summary = news.description && news.description.length > 200 ? news.description.substring(0, 200) + '...' : news.description || '내용없음';
        const sourceName = news.source.name || 'no source';
        const publishedTime = moment(news.publishedAt, "YYYYMMDD").fromNow();

        return `<div class ="row news">
                    <div class ="col-lg-4">
                        <img class="news_size"
                        src=${imageSrc} "/>
                    </div>
                    <div class ="col-lg-8">
                        <h2>${news.title}</h2>
                        <p>
                         ${summary}
                        </p>
                        <div>
                            ${sourceName} ${publishedTime}
                        </div>
                    </div>
                </div>`;
        }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
  };
//프린트해봅시다.


