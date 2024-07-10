
const API_KEY = `474e84f656e2471a85bcbe8ad971e094`;
let newsList = [];
const menus =document.querySelectorAll(".menus button");

console.log(menus);

menus.forEach(menu => menu.addEventListener("click",(e) => getNewsByCategory(e)));

keywordInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getNewsByKeyword();
    }
});

input_go.addEventListener('click', getNewsByKeyword);
//1.버튼들에게 클릭 이벤트 줘야 한다.ok
//input에 입력 하고 go 버튼을 눌른다.
//
const searchButton = document.getElementById("input_go");
searchButton.addEventListener("click", () => {
})
let news=[];
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
const getNews = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            newsList = data.articles;
            if (newsList.length === 0) {
                errorRender("No matches for your search");
            } else {
                render();
            }
        } else {
            throw new Error(data.message || `Error ${response.status}`);
        }
    } catch (error) {
        errorRender(error.message);
    }
};

const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
        url.searchParams.set('q', '');
        await getNews();
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
    try {
            const category = e.target.textContent.toLowerCase();
            url.searchParams.set('category', category);
            url.searchParams.set('q', '');
            getNews();
      } catch (error) {
        errorRender(error.message)
    }
};
const getNewsByKeyword = () => {
    keyword = keywordInput.value.trim(); // Update the global 'keyword' variable
    if (keyword.trim() === '') {
        // Add a placeholder message to the input element
        keywordInput.placeholder = '키워드를 입력해주세요';
        return; // Stop further execution of the function
    }
    url.searchParams.set('q', keyword); // Set the 'q' parameter in the URL
    url.searchParams.delete('category');
    getNews();
    keywordInput.value = ''; // Reset the input field value
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
  const errorRender = (errorMessage) => {
    let errorText = '';
    if(errorMessage.includes('400')) {
        errorText = 'Bad Request 400 - The request cannot be fulfilled.';
    } else if(errorMessage.includes('401')) {
        errorText = 'Unauthorized - Authentication is required.';
    } else if(errorMessage.includes('402')) {
        errorText = 'Payment Required - Payment is required.';
    }else if(errorMessage.includes('429')) {
        errorText = 'Too many request'
    } else if(errorMessage.includes('500')) {
            errorText = 'server error.';
    }
    else {
            errorText = 'No matches for your search.';
        }
    const errorHTML = `<div class="alert alert-danger" role="alert">${errorText}</div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
};
getLatestNews();
//프린트해봅시다.


