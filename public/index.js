$("#submit-button").on("mouseover",function(){
    $("#submit-button").css("backgroundColor","gray");
});

$("#submit-button").on("mouseout",function(){
    $("#submit-button").css("backgroundColor","pink");
});
var images = ["./images/carousel-1.jpg", "./images/carousel-2.jpg", "./images/carousel-3.png"];
var currentIndex = 0;
$(".butt").on("click", function() {
    currentIndex = (currentIndex + 1) % images.length; // Increment currentIndex for rotation
    $(".nimg").fadeOut(function() {
        $(this).attr("src", images[currentIndex]).fadeIn();
        if (currentIndex === 0) {
            $(this).addClass("sma"); // Add "sma" class only when displaying the first image
        } else {
            $(this).removeClass("sma"); // Remove "sma" class for all other images
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const imageLabel = document.querySelector("#image-label");
    const inputFile = document.querySelector("#image-file");
    const fileStatus = document.querySelector("#file-status");
    const submit = document.querySelector("#submit-button");
    const loadingMessage = document.querySelector("#loading-message");
    const predictionContainer = document.querySelector("#prediction-container");
    const predictionValue = document.querySelector("#prediction-value");
    const cancerResult = document.querySelector("#cancer-result");
    const accuracyResult = document.querySelector("#accuracy-result");

    // Handle the label click to clear the file input value
    imageLabel.addEventListener("click", function () {
        inputFile.value = "";  // Clear the file input value
        fileStatus.textContent = "No File Selected"; // Reset file status
    });

    // Handle the file input change event
    inputFile.addEventListener("change", function () {
        if (inputFile.files.length > 0) {
            fileStatus.textContent = "File Selected: " + inputFile.files[0].name; // Display selected file name
        } else {
            fileStatus.textContent = "No File Selected"; // Display 'No File Selected' if no file is chosen
        }
    });

    submit.addEventListener("click", async function () {
        if (inputFile.files.length > 0) {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]); 

            try {
                predictionContainer.classList.add("hidden");
                loadingMessage.classList.remove("hidden"); // Show loading message
                
                const response = await fetch("http://0.0.0.0:8080/images/", { // Use your FastAPI endpoint
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload the file");
                }

                const data = await response.json(); // Parse the response as JSON

                // Display the prediction results
                predictionValue.textContent = data.prediction_value; // Format to 4 decimal places
                cancerResult.textContent = data.cancer;
                accuracyResult.textContent = data.accuracy; // Convert to percentage and format to 2 decimal places

                predictionContainer.classList.remove("hidden"); // Show prediction results

            } catch (error) {
                console.error("Error:", error.message);
            } finally {
                loadingMessage.classList.add("hidden"); // Hide the loading message
            }
        } else {
            alert("Please select a file to upload.");
            loadingMessage.classList.add("hidden");
        }
    });
});
