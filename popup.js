// Date information
var allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// window.todaysDate = new Date();
// window.todaysDate.day = todaysDate.getDate();
// window.todaysDate.month = todaysDate.getMonth();
// window.todaysDate.year = todaysDate.getFullYear();
// window.todaysDate.date = allMonths[todaysDate.month] + todaysDate.day;

// today.innerText = allMonths[todaysDate.month] + ' ' + todaysDate.day + ', ' + todaysDate.year;

let datePicker = document.querySelector('.datePicker');
let submitButton = document.querySelector('button');
let loader = document.querySelector('.loader');
submitButton.addEventListener('click', () => {
    fetchNewDate(datePicker.value);
})

datePicker.value = moment().format("YYYY-MM-DD")


// console.log(moment(undefined))


function fetchNewDate(date) {
    let today = document.querySelector('.today');
    date = date || undefined
    window.todaysDate = moment(date);
    window.todaysDate.day = todaysDate.date();

    console.log(datePicker.value)

    window.todaysDate.month = todaysDate.month();
    window.todaysDate.year = todaysDate.year();
    window.todaysDate.date = allMonths[todaysDate.month] + todaysDate.day;
    today.innerText = allMonths[todaysDate.month] + ' ' + todaysDate.day + ', ' + todaysDate.year;

    today.innerText = allMonths[todaysDate.month] + ' ' + todaysDate.day + ', ' + todaysDate.year;
    fadeIn(loader);
    website();
}


// Fetch Site
function website() {
    let modalContent = document.querySelector('.modal-content');
    
    let prologue = {
        text: ''
    }

    fetch(`http://98.131.104.126/prolog/${todaysDate.date}.htm`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(((res) => {
        return res.text();
    }))
    .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        if(html.includes('Sorry, this page does not exists.')) {
            html = 'Nothing found. Check your date and try again.';
        }
        prologue.text = doc.body
        let modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = '';
        setTimeout(() => {
            fadeOut(loader);
            modalContent.innerHTML = html;
        }, 500);
        
    })

}
fetchNewDate();
    website();



function fadeOut(el){
    el.style.opacity = 1;
  
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
  
  // fade in
  
  function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";
  
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

