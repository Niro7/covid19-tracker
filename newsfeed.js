const showNewsFeed = (data) => {
  console.log(data);

  var html = "";
  data.forEach((newsitem) => {
    html += `
    <div class="col-sm-4 mt-3 mb-3">
      
      <div class="card">
        <img
        class="mb-0 card-img-top"
        src="${newsitem.fields.thumbnail}"
        alt="Thumbnail"
      />
        <div class=" card-body">
          <h6 class="d-flex align-items-center justify-content-center mt-0 card-title">${newsitem.fields.headline}</h6>
          <p class="card-text">${newsitem.fields.trailText}</p>
          
          </div>
          <div class="d-flex justify-content-center mb-1" ><a href="${newsitem.webUrl}" target="_blank" class="btn btn-read">Read More</a>
        </div>
      </div>
    </div>
    
    `;
  });
  document.getElementById("news-container").innerHTML = html;
};

{
  /* <div class="card-deck news-items-conatiner">
              <div class=" card news-card-container">
                <img
                  class="card-img-top"
                  src="${newsitem.fields.thumbnail}"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title newsfeed-headline">${newsitem.fields.headline}</h5>
                  <p class="card-text newsfeed-body">
                    ${newsitem.fields.trailText}
                  </p>
                  <a href="${newsitem.webUrl}" target="_blank" class="btn btn-read">Read More</a>
                </div>
              </div>
              </div> */
}
