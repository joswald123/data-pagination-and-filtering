/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Number of students per pageP
const perPage = 9;

// Search Component
const header = document.querySelector('header');
const searchComponent = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>

`
header.insertAdjacentHTML("beforeend", searchComponent);

// Not found Results
const h3 = document.createElement('h3');
h3.textContent = "No results found";
h3.className = "no-results";
h3.style.display = 'none';
header.insertAdjacentElement("afterend", h3);

function displayElement (list) {

   if(list.length === 0) {
      h3.style.display = '';

   } else {
      h3.style.display = 'none';
   }
}

/*
 * Initialize showPage() function that will display a page of nine students.
   creates and insert/append the elements needed to display the page.
* @param (list) array of student data, 
 * @param (page) page number that we want to display.
 * 
*/

function showPage(list, page) {

  let startIndex = page * perPage - perPage;
  let endIndex = page * perPage;
  const studentList = document.querySelector(".student-list");

  studentList.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      let studentItem = `  
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`;

      studentList.insertAdjacentHTML("beforeend", studentItem);
    }
  }
}

/*
 * Initialize addPagination() that creates and insert/append the elements needed for the pagination buttons
 * @param (list) array of student data,
 * 
*/

function addPagination(list) {

  const numOfPages = Math.ceil(list.length / perPage);
  const linkList = document.querySelector(".link-list");
  // set the innerHTML property of the variable you just created to an empty string
  linkList.innerHTML = "";
  for (let i = 1; i <= numOfPages; i++) {
    const button = `
         <li><button type="button">${[i]}</button></li>
      `;
    linkList.insertAdjacentHTML("beforeend", button);
    const activeButton = document.querySelector("button");
    activeButton.className = "active";
  }

  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let activeClass = document.querySelector(".active");
      activeClass.className = "";
      e.target.className = "active";
      showPage(list, e.target.textContent);
    }
  });
}

showPage(data, 1);
addPagination(data);


function searchFunction(searchInput, list) {
   
   let newStudentList = [];
   
   for(let i=0; i < list.length; i++) {
      if(list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase())){
         newStudentList.push(list[i]);
      }         
   }

   displayElement(newStudentList);
   


   showPage(newStudentList, 1)
   addPagination(newStudentList);

}

// event Listener for inputSearch
search.addEventListener('keyup', () => {

      if(search.value.length != 0) {
         searchFunction(search, data);
      }

 });