var tag = "Päärni";
var user = "";
var token ="205572009.1677ed0.b85acc60b6b24cf3a0a5c6d3ccbb1cc0";
var photoCount = 51;
var mediaID = "1176745841895893247_205572009";

function getByHash(){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,

    url: "https://api.instagram.com/v1/tags/"+ tag +"/media/recent?access_token="+ token,
    
    success: function(response) {
      var length = response.data != undefined ? response.data.length : 0;
      var limit = photoCount != null && photoCount < length ? photoCount : length;
      if(limit > 0) {

        $('#photos').html('');

        for(var i = 0; i < limit; i++) {     

          /*Username for poster selected*/
          var user = response.data != undefined ? response.data[i].user.username: 0;

          /*Filter used selected*/
          var filter = response.data != undefined ? response.data[i].filter: 0;

          /*Number of likes selected*/
          var amtLikes = response.data != undefined ? response.data[i].likes.count: 0;

          /*Media ID*/
          var mediaID = response.data != undefined ? response.data[i].id: 0;

          //Div likes class attribute defined after val of i
          var likesDiv = ".likes" + i;

          //Create data tag to attach media ID to img

          var caption = $('<div>', {class: "caption" + i, text: user});
          var likes = $('<div>', {class: "likes" + i, text: ' ' + amtLikes + ' Likes. Filter used: ' + filter});
          var icon = $('<i>', {class: "fa fa-heart"});
          var container = $('<div>', {class: "photo"});
          var img = $('<img>', {src: response.data[i].images.standard_resolution.url});


          container[0].setAttribute("data-mediaid", mediaID);
          //container.data( "mediaid", mediaID);

          //Img, likes and container appended together for each photo returned from GET
          icon.prependTo(likes);
          caption.appendTo(container);
          img.appendTo(container);
          likes.appendTo(container);
          container.appendTo($("#photos"));

          // $("div[data-mediaid='"+mediaID+"']").click(function() {
          //   var id = $(this).data('mediaid');

          //   getLikers(id);

          // });


        }
      }
    }
  });
}


function submit(){
    var hash = document.getElementById('hashtag');
    tag = hash.value;
    getByHash();
}

var userCount = 10;
function submitUser(){
     var userName = document.getElementById('user');
     user = userName.value;
     getFollowers();
}

function getFollowers(){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,

    url: "https://api.instagram.com/v1/users/self/followed-by?access_token=" + token,
    
    success: function(response) {
      var length = response.data != undefined ? response.data.length : 0;
      //document.write(length);
      var limit = photoCount != null && photoCount < length ? photoCount : length;
      if(limit > 0) {

        $('#photos').html('');

        for(var i = 0; i < limit; i++) {     

          // /*Username for poster selected*/
          var user = response.data != undefined ? response.data[i].username: 0;

          var caption = $('<div>', {class: "captionID" + i, text: user});
          //var likes = $('<div>', {class: "likes" + i, text: ' ' + amtLikes + ' Likes. Filter used: ' + filter});
          //var icon = $('<i>', {class: "fa fa-heart"});
          var container = $('<div>', {class: "IDphoto"});
          var img = $('<img>', {src: response.data[i].profile_picture});


          container[0].setAttribute("data-mediaid", mediaID);

          caption.appendTo(container);
          img.appendTo(container);
          container.appendTo($("#photos"));
        }
      }
    }
  });
}