
document.getElementById("blogInfo").addEventListener("click", function(){
	getBlogInfo();
});

document.getElementById("posts").addEventListener("click", function(){
	getPosts();
});


function getBlogInfo () {
	var url = document.getElementById('site-url').value;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;	
	var params = [username, password];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getUsersBlogs", params);

	makeRequest(url, xmlrpc_data);
}


function getPosts () {
	var url = document.getElementById('site-url').value;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var blogId = document.getElementById("blog-id").value;
	var params = [blogId, username, password];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getPosts", params);
	
	makeRequest(url, xmlrpc_data);
}


function makeRequest(url, data) {
	var xhr = new XMLHttpRequest({mozSystem:true});
	xhr.open('POST', url);
	
	xhr.onreadystatechange = function() {
		console.log("Readystate: ", xhr.readyState)
	}
	
	xhr.onload = function() {
		handleSuccess(xhr);
	};
	
	xhr.onerror = function() {
		handleError(xhr);
	};
	
	xhr.send(data);
	return xhr;
}


function handleSuccess(xhr) {
	document.getElementById("results").innerHTML = xhr.responseText;

	var parser = new XMLRPCParser(xhr.response);
	var json = parser.toObject();
	var fault = parser.fault;
	console.log(fault);

	if (json instanceof Array) {
		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			for(var key in obj) {
				console.log(key, obj[key]);
			}
		}
	} else {
		 console.log(json);
	}
	
}


function handleError(xhr) {
	document.getElementById("results").innerHTML = "Error: " + xhr.statusText;
}