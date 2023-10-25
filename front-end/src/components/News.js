import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const News = (props) => {
  const [articles, setArticles] = useState([]);

  const updateNews = async () => {
    props.setProgress(10);
    let data = await fetch(`${process.env.REACT_APP_API_URL}news/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    });
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles([...parseData.data.results]);
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container" style={{ paddingTop: "65px" }}>
        <div className="row">
          <div className="col-md-6 col-sm-4">
            <h2>Top - News</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {articles.map((element, index) => {
            return (
              <div className="col-md-4 my-2" key={index}>
                <NewsItem
                  title={
                    element.title ? element.title.slice(0, 50) : "Unknown ..."
                  }
                  description={
                    element.abstract ? element.abstract.slice(0, 90) : ""
                  }
                  imgUrl={element.multimedia[0].url}
                  newsUrl={element.url}
                  author={element.byline}
                  date={element.published_date}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
