console.log("Hello World")

var Twit = require('twit')
var fs = require('fs')
var config = require("./config.js")

var T = new Twit(config)

// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 10 }, function(err, data, response) {
// 	for(var i = 0; i < data["statuses"].length; i++){
// 		console.log(data["statuses"][i]["text"])		
// 	}
// })

// T.post('statuses/update', { status: 'hello world! I am not a bot!' }, function(err, data, response) {
//   console.log(data)
// })

// var i = 0;
// tweets = ["Hello", "I am posting in an interval", "This is my 4th tweet", "Now it is my 5th"]
// setInterval(function(){
// 	if (i < tweets.length){
// 		T.post('statuses/update', { status: tweets[i] }, 
// 			function(err, data, response) {
// 				if (err){
// 					console.log("it didnt tweet")
// 				} else{
// 					console.log("It worked")
// 				}
// 			}
// 		)
// 		i += 1;
// 	}
// }, 2000)

//https://stackoverflow.com/questions/3538021/why-do-we-use-base64
//my twitter bot posted a penguin picture!
var base64_content = fs.readFileSync("penguin.jpg", { encoding: 'base64' });
T.post('media/upload', {media_data: base64_content}, 
	function(err, data, response){
		if (err){
			console.log("it didnt upload")
		} else{
			console.log("It worked")
			T.post('statuses/update', { media_ids: new Array(data.media_id_string) },
			function(err, data, response) {
				if (err){
					console.log('It did update:');
					console.log(err);
				}
				else{
					console.log('Posted the image');
				}
			})
		}
	}
)