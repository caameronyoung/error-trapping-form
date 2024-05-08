//Cameron Young Form Error Trapping js document
//date: 21/10/23
//some examples from class were used, but I mentioned when this was the case. 

const form = document.getElementById('form'); //declaring it as a constant so i can use it for blur and focus colouring 
const button = document.getElementsByName('button');
let nameInput = document.getElementById('name');
let ageInput = document.getElementById('age');
let emailInput = document.getElementById('email');
let phInput = document.getElementById('ph');
let whyInput = document.getElementById('why');

form.addEventListener('focus', (event)=>{event.target.style.background="#fce9fc"}, true,); //darker shade when selected for ease of view
form.addEventListener('blur', (event)=>{event.target.style.background="#fff7ff"}, true,); //lighter shade when clicked off instead of having default white

function setError(element, message) //using this function from class to add and remove an error message when the user inputs incorrectly.
{ 
    element.classList.remove('complete'); //later functions will add complete if there are no form errors in the error trapping event listeners
    element.classList.add('invalid');  
    let caption = element.parentElement.querySelector('.caption'); 
    caption.innerText = message; //changes the html block's caption to the passed error message
    caption.classList.remove('success'); //removes the id success from the html block's class
    caption.classList.add('error');  //adds the error class to the html block's class. this will use the styesheet to colour the box red 
} 
 
function setComplete(element) //also from class. works same as setError() just in reverse. adds corresponding visuals and messages using css to the correct input fields 
{ 
    element.classList.remove('invalid') //removes the invalid error message in the caption block
    element.classList.add('complete'); 
    let caption = element.parentElement.querySelector('.caption'); 
    caption.classList.remove('error'); 
    caption.classList.add('success');  //this will change the block's css to make the outline of the border green for a visual cue along with adjusting the caption accordingly 
} 

// error trapping for the name input (no numbers or special characters (excluding hyphen))
nameInput.addEventListener('blur', (event)=>
{
    let value = event.target.value; //takes the form input as the value var.
    var letters = /^[A-Za-z \-]+$/; //using regex for simple error trapping. the +$ allows for any combination and repetitions of the characters preceding it. i.e: any case letters, spaces, and hyphens 
    if (value.match(letters)) //using .match() as a boolean to check if the input follows the expression allowed by the letters rule. 
    {
        setComplete(event.target);
    }
    else
    {
        setError(event.target, 'your name cannot have any numbers or special characters in it.'); //appends this message over the original caption along with adding corresponding css 
    }
})

//error trapping for the age input 
//the age must be >= 18
ageInput.addEventListener('blur', (event)=> 
{
    let value = event.target.value; //takes the value of the input

    if (isNaN(value) == true || value < 18) //the user can only input that is a number and over 18
    {
        setError(event.target, 'please enter a valid age 18 or over'); //appends this error message over the original caption.
    }
    else
    {
        setComplete(event.target);
    }
})

//error trapping for email input
//a valid email is:
//letter followed by letters or underscores, followed by letters or numbers
//then there must be an @ symbol followed by a letter then more letters or a number
// then followed by a period and a letter then either letters or numbers.
//ie: te_2st@example.com

//to make the regex for this I used the example given in class as it is more complicated than the previous set i used in the name input

emailInput.addEventListener('blur', (event)=>
{
    let value = event.target.value; //takes the field input as the value
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; //this is from class as I'm not entirely sure how you use regex to follow patterns (like using an @ symbol in the middle)

    if (value.match(regex) == null || value.match(regex) == false) //if the user leaves the field blank (null) or enters in invalid address (match is false)
    {
        setError(event.target, 'please enter a valid email address');
    }
    else
    {
        setComplete(event.target);
    }
})

//error trapping for phone number.
phInput.addEventListener('blur', (event)=>
{
    let value = event.target.value;
    let regexTen = /^[\+][0-9]{10}$/ //starts with a + and then only digits repeated 10 times
    let regexTwelve = /^[\+][0-9]{11}$/ // starts with a + and then digits repeated 11 times.
    // i struggled to concatenate this in to one line so I will simply test twice all outcomes with else if statements
    // i think this is an inefficient method but not sure how else to do it with my own knowledge. 
    if (value.match(regexTen))
    {
        setComplete(event.target);
    }
    else if (value.match(regexTwelve))
    {
        setComplete(event.target);
    }
    else if (value.match(regexTen) == null)
    {
        setError(event.target, 'please enter a valid 10 or 12 digit phone number with area code');
    }
    else if (value.match(regexTwelve) == null)
    {
        setError(event.target, 'please enter a valid 10 or 12 digit phone number with area code');
    }
    else if (value.match(regexTen) == false)
    {
        setError(event.target, 'please enter a valid 10 or 12 digit phone number with area code');
    }
    else if (value.match(regexTwelve) == false)
    {
        setError(event.target, 'please enter a valid 10 or 12 digit phone number with area code');
        
    }
})

//error trapping for the large text form field
//this one's pretty simple - it simply cannot be left blank (null)
whyInput.addEventListener('blur', (event)=>
{
    let value = event.target.value;
    if ((value == null) || (value == ""))
    {
        setError(event.target, 'Please do not leave this field blank.');
    }
    else
    {
        setComplete(event.target);
    }
})


function submitForm()
{
    let caption = document.getElementById('endCaption').innerHTML = 'Thank you, your responses were submitted!'; //adds a note under the submit button that responses were submitted u sing the same style as other captions in the form
}

function hoverDetails() //the extra JS as required. when the user hovers over a specific part of the menu, the contact details will appear in its place.
{
    let text = document.getElementById('hoverContact');
    text.innerHTML='Address: 19 Tanner Street, Carey Park, New South Wales 2429; Ph: (02) 4939 5050'; //newcastle tafe
}

function offHover() //for when the mouse is moved away
{
    let text = document.getElementById('hoverContact');
    text.innerHTML='Hover for contact details'; //changes the details back to what was initially there to begin with once mouse is moved away. 
}