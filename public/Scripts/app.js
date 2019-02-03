// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start() {
        console.log(`%c App Started...`, 
        "font-size: 20px; color: blue; font-weight: bold");
    }
    
    window.addEventListener("load", Start);

})();