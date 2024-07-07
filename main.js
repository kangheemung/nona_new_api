const API_KEY = `474e84f656e2471a85bcbe8ad971e094`;

const getLatestNews = async () => {
const url = new URL(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
        const response = await fetch(url);
        console.log("rrr",response)
        const data = await response.json();
        news = data.articles;
        console.log("ddd",news);
      //  console.log(data);
       // render(data.articles);
 
};
//프린트해봅시다.

getLatestNews();

//const render=(newsList)=>{
  //  const newsHTML = ``;
  //    newsHTML = newsList.map(
  //        news =>
   //       ` <div class ="row news">
   //       <div class ="col-lg-4">
     //         <img class="news-img-size"
    //            src=${news.urlToImage}/>
   //       </div>
     //     <div class ="col-lg-8">
      //        <h2>${news.title}</h2>
    //          <p>
     //             코딩 알려주는 누나 듣고 취직 완료
//  
       //       </p>
      //        <div>
      //            20249월 취직 완료
//  //  
      //        </div>`
 //     )

//  };
//프린트해봅시다.



