document.getElementById("submit-button").addEventListener("mouseover",handleMouseOver);
function handleMouseOver()
{
    document.getElementById("submit-button").style.backgroundColor="gray";
}
document.getElementById("submit-button").addEventListener("mouseout",handleMouseOut);
function handleMouseOut()
{
    document.getElementById("submit-button").style.backgroundColor="pink";
}

