$(document).ready(function(){
    /*--- Display login modal box ---*/
    $('.login').click(function(){
        $('.login-overlay').fadeIn(1000);
    });

    /*--- Hide ilogin modal box ---*/
    $('a.close').click(function(){
  	$('.login-overlay').fadeOut(1000);
    });
    
    /*--- Display registration modal box ---*/
    $('.register').click(function(){
        $('.reg-overlay').fadeIn(1000);
    });

    /*--- Hide registration modal box ---*/
    $('a.close').click(function(){
  	$('.reg-overlay').fadeOut(1000);
    });
    
    /*---Get tag from search form on enter---*/
    $('.search').keypress(function (e) {
	var key = e.which;
	if(key == 13){
		var tag = $(this).val();
		getInstagramCount(tag);
	}
    });
     
    /*--- Get count of tags in instagramming matching TAG variable ---*/ 
    var getInstagramCount = function(tag) {
	alert("yup");
	var result = $.ajax({
	    url: "https://api.instagram.com/v1/tags/"+ tag + "?client_id=fafb382ffd9740fab24790e51c7f88a0",
	    dataType: "jsonp",
	    type: "GET",
	    })
	    .done(function(result){
		alert("yup");
		alert(result.data.media_count);
	    })
	    .fail(function(error){
		alert("nope");
		alert(error);
	    });
	};
});