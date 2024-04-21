

const display = document.getElementById("display")
//function to display input on the screen
function appendToDisplay(input) {
//   add the input element to existing element on the display  
    display.value += input;}


//function to clear the display
function clearDisplay(){
    display.value = "";

}
//function to efaluate and calculate with buil in function eval
function calculate() {
    try{ 
    display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}
