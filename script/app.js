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
    $('.search-form').submit( function(event){
		var tag = $(this).find("input[name='search']").val();
		displayGoogleChart(tag);
		resultStyle();
		calculateScore(tag);
		//getGoogleScore(tag);
		//getVineCount(tag);
    });
    
    /*--- Change style to result style--*/
    var resultStyle = function(){
	$('.wrapper').css('background-image', 'none');
	$('.search-form').css('display', 'none');
	$('.left').css('display','block');
	$('.right').css('display','table');
     
    }
    
    /*--- Display the google trend of the tag for the last year ---*/
    var displayGoogleChart = function(tag){
	$('iframe').attr('src', "http://www.google.com/trends/fetchComponent?hl=en-US&q=" + tag + "&cid=TIMESERIES_GRAPH_0&export=5&w=400&date=today 12-m");
    }
    
    /*--- Calculate total Score ---*/ 
    var calculateScore = function(tag) {
	
	getInstagramCount(tag, function(count){
	    var total = Math.min(count/20000000 * 50, 50);
	    getYouTubeCount(tag, function(count){
		total += Math.min(count/1000000 * 50, 50);
		$('.score').text(total.toFixed(2));
	    });
	    
	});
    };
    

    
    /*--- Get count of tags in instagramming matching TAG variable ---*/ 
    var getInstagramCount = function(tag, fn) {
	var count;
	var result = $.ajax({
	    url: "https://api.instagram.com/v1/tags/"+ tag + "?client_id=fafb382ffd9740fab24790e51c7f88a0",
	    dataType: "jsonp",
	    type: "GET",
	    })
	    .done(function(result){
		$(".instagram-count").text(result.data.media_count);
		fn(result.data.media_count);
	    })
	    .fail(function(error){
		alert(error);
	});
    };
	
    /*--- Get count of tags in instagramming matching TAG variable ---*/ 
    var getVineCount = function(tag) {
	var result = $.ajax({
	    url: "https://api.vineapp.com/timelines/tags/" + tag,
	    dataType: "jsonp",
	    type: "GET",
	    })
	    .done(function(result){
		alert(JSON.stringify(result));
	    })
	    .fail(function(result){
		alert(JSON.stringify(result));
	});
    };
    
    /*--- Get count of tags in instagramming matching TAG variable ---*/ 
    var getTweetCount = function(tag) {
	var result = $.ajax({
	    url: "https://api.vineapp.com/timelines/tags" + tag,
	    dataType: "jsonp",
	    type: "GET",
	    })
	    .done(function(result){
		alert(JSON.stringify(result));
	    })
	    .fail(function(result){
		alert(JSON.stringify(result));
	});
    };
    
    /*--- Get count of tags in YouTube matching TAG variable ---*/ 
    var getYouTubeCount = function(tag, fn) {
	var count;
	var result = $.ajax({
	    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + tag + "&type=video&videoCaption=closedCaption&key=AIzaSyAh8XlZobL9bFmgAMrlmThjCgXCpEVLDKE",
	    dataType: "jsonp",
	    type: "GET",
	    })
	    .done(function(result){
		$(".youtube-count").text(result.pageInfo.totalResults);
		fn(result.pageInfo.totalResults);
	    })
	    .fail(function(error){
		alert(error);
	});
    };
    
    /*--- Get score from google trends relative to highest rating in last year matching TAG variable ---*/ 
    var getGoogleScore = function(tag) {
	var result = $.ajax({
	    url: "http://www.google.com/trends/fetchComponent?hl=en-US&q=html5&cid=TIMESERIES_GRAPH_0&export=3&date=today%2012-m",
	    dataType: "json",
	    type: "GET",
	    })
	    .done(function(result){
		alert("Google success");
	    })
	    .fail(function(error){
		alert(JSON.stringify(error));
	});
    };
});