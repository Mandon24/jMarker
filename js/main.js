//event listener for submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  //check for validation
  if(!validateForm(siteName, siteURL)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL

  }

  //local storage test
  /*localStorage.setItem('test', 'Hello World'); //sets an item in local storage
  console.log(localStorage.getItem('test')); //gets an item from localStorage
  localStorage.removeItem('test'); //removes an item from localStorage
  console.log(localStorage.getItem('test')); //gets an item from localStorage
*/
  //test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //turns json objects into string
  }else{
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //turns string into json objects
    //add bookmark to array
    bookmarks.push(bookmark);
    //res-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //turns json objects into string
  }

  //clear form
  document.getElementById('myForm').reset();

  //re-fetch bookmarks
  fetchBookmarks();

  e.preventDefault(); //prevents default behavior of an event, prevents form from submitting


}

//deleteBookmark
function deleteBookmark(url){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //turns string into json objects

  //loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i, 1);
    }
  }

  //res-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //turns json objects into string

  //re-fetch bookmarks
  fetchBookmarks();
}


//fetch bookmarks
function fetchBookmarks(){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //turns string into json objects

  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = ''; //innerHTML places html at a location throught javascript
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>' +name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>' +
                                  '</div>';
  }
}

//validate form
function validateForm(siteName, siteURL){

    //check if input fields are empty
    if(!siteName || !siteURL){
      alert('Please fill in the form');
      return false;
    }

    //general expression for url validation
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
      alert('Please use a valid URL');
      return false;

    }

    return true;
}
