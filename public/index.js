$("#submit-button").on("mouseover",function(){
    $("#submit-button").css("backgroundColor","gray");
});

$("#submit-button").on("mouseout",function(){
    $("#submit-button").css("backgroundColor","pink");
});

var images = ["./images/carousel-1.jpg","./images/carousel-2.jpg","./images/carousel-3.png" ]
var currentIndex = 0;
$(".butt").on("click", function() {
    currentIndex = (currentIndex + 1) % images.length+1;
    $(".nimg").fadeOut(function() {
        $(this).attr("src", images[currentIndex-1]).fadeIn();
    });
});

       



    
    