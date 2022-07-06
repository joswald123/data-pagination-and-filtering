/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Number of students per pageP
const perPage = 9;

// Search Component Element
const header = document.querySelector('header');
const searchComponent = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>

`
header.insertAdjacentHTML("beforeend", searchComponent);

// Element h3 "Not found Results" - Search component
const h3 = document.createElement('h3'); 
h3.textContent = "No results found";
h3.className = "no-results";
h3.style.display = 'none';
header.insertAdjacentElement("afterend", h3);

/*
 * Initialize displayElement() function that will change style.display for h3 element.
* @param (list) array of student data, 
* 
*/
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
  // added Button HTML Element
  linkList.innerHTML = "";
  for (let i = 1; i <= numOfPages; i++) {
    const button = `
         <li><button type="button">${[i]}</button></li>
      `;
    linkList.insertAdjacentHTML("beforeend", button);
    let activeBtn = document.querySelector("li button");
    activeBtn.className = "active";
  }

  // Each time trigger a button the attribute "active" changes
  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let activeClass = document.querySelector(".active");
      activeClass.className = "";
      e.target.className = "active";
      showPage(list, e.target.textContent);
    }
  });
}

// Call functions to display all data and it is divide per pages of 9 items
showPage(data, 1);
addPagination(data);

/*
 * Initialize searchFunction() function that will display only the data according to the searchInput.
* When the "Search" is performed, the student data is filtered so that only students whose name includes the 
* search value are shown.
* @param (searchInput) search input value
* @param (list) array of student data, 
* 
*/
function searchFunction(searchInput, list) {
   // array of new objects from the data
   let newStudentList = [];
   
   // for loop that iterate over the list of students and select just the ones that meet the condition
   for(let i=0; i < list.length; i++) {
      const firstName = list[i].name.first.toLowerCase();
      const lastName = list[i].name.last.toLowerCase();
      
      if(firstName.includes(searchInput.value.toLowerCase()) || lastName.includes(searchInput.value.toLowerCase()) ){
         newStudentList.push(list[i]);
      }     
   }

   // call functions to display newList, pagination and/or a message if it does not meet the requirements
   displayElement(newStudentList);
   showPage(newStudentList, 1)
   addPagination(newStudentList);
   

}

// event Listener for inputSearch that returns
search.addEventListener('keyup', () => {
   console.log(search)
      // Condition that takes the input different to zero 
      if(search.value.length != 0) {
         
         searchFunction(search, data);
      } else {
         showPage(data, 1)
         addPagination(data);
      }

 });