$(document).ready(function() {

	$(".secondpage").hide(); //HIDING SECOND PAGE INITIALLY

	function nextLinkClicked(){ //for Autosliding feature - created a function for nextLinkClicked 
		//and put the next 8 lines in there. 
			var currentActiveImage = $(".image-shown"); //we determine the currentActiveLink to be the image that's currently shown, in our html, that is ".image-shown"
			var nextActiveImage = currentActiveImage.next(); //moves us to next element in the set of images

			//when we get to the last image, it doesn't know what to do, so it's blank
			//so we add this code and ask it to go to the first image of the set of images:
			if(nextActiveImage.length == 0) {
				nextActiveImage = $(".carousel-inner img").first();
			}

			//now that we have set the nextActiveImage as the next, we have to shift classes in them 
			//remove "image-shown" class from current active image; then add "image-hidden" class to it, then shift it to the back of the stack of images by using z-index
			//low z-index = puts image on bottom of stack
			currentActiveImage.removeClass("image-shown").addClass("image-hidden").css("z-index", -10); //if we give z-index of 10, it will be last image in the series of images//the image that was the visible one will now become the last 
			
			//high z-index = puts image on top of stack
			//by default images have either 0 or 1. 20 has higher z-index of all images and it will be at top of stack.
			nextActiveImage.addClass("image-shown").removeClass("image-hidden").css("z-index", 20);

			//for all the imgs in carousel-inner, not including currentActiveImage and nextActiveImage (excl. using array [] ), apply z-index of 1 
			$(".carousel-inner img").not([currentActiveImage, nextActiveImage]).css("z-index", 1); 
		}

	$(".nextLink").on("click", function(e) {


		nextLinkClicked(); 

		//prevent link from taking us to any page
		//b/c anytime we have this: <a class ="nextLink" href="#">Next</a> (from html file)
		//the browser will try to take us to href, which is "#"
		//preventDefault prevents the default action of the image which is to take you to the link (which is "#")
		//for can use any letter, can be "i", or "k", as long as it's not taken. 
		//i just use "e" for event in this case
		//we read it as event.preventDefault
		e.preventDefault(); 
	});


	//for Previous button 
	//when we click Previous, we want to go back one image/go up one image	
	$(".previousLink").on("click", function(e) {

		var currentActiveImage = $(".image-shown");
		var nextActiveImage = currentActiveImage.prev();

		//if we click previous so many times that we're now at the first image, 
		//then we will want it to show us the last image 
		if(nextActiveImage.length == 0) {
			nextActiveImage = $(".carousel-inner img").last();
		}

//same as Next code
		currentActiveImage.removeClass("image-shown").addClass("image-hidden").css("z-index", -10);
		nextActiveImage.addClass("image-shown").removeClass("image-hidden").css("z-index", 20);

		//pass array to not, so that any element not in array, apply CSS function to it (z-index of 1)
		$(".carousel-inner img").not([currentActiveImage, nextActiveImage]).css("z-index", 1); 

		e.preventDefault();
	})

	setInterval(nextLinkClicked, 3000); //autosliding per every 2 seconds


	//IF THE GET MATCHES BUTTON IS PRESSED, HIDE THE FIRST PAGE. 
	//FIRST PAGE IS EVERYTHING ELSE BUT THE TOP BAR ("good collab")
	$(".button").on("click", function() { 
		$('.firstpage').fadeOut(1200, "linear"); //instead of hide, I'm using .fadeOut. for options: "swing" is default. 
		$('.secondpage').fadeIn("slow");
	})

});

