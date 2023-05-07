// Globals
let modeType = "Edit";   // Current mode: Edit or Read
let bookNum = 3;

// Show element based on id name
function showElement_Id(idName) { document.getElementById(idName).style.visibility = 'visible'; }

// Hide element based on id name
function hideElement_Id(idName) { document.getElementById(idName).style.visibility = 'hidden'; }

// Clear form inputs
function clearForm(idName) { document.getElementById(idName).reset(); }

// Unselect checkbox
function uncheckCheckBox(idName) { document.getElementById(idName).checked = false; }

// Change title
function changeTitle() { document.getElementById("bookshelfTitle").textContent = document.getElementById("bookshelfTitleInput").value; }

// Show extra input if clicked on checkbox showing if finished reading book, else hide extra input
function finishedReading()
{
    if(document.getElementById('finishedReadCheck').checked)                // Show
        document.getElementById('finishedDate').style.display = 'block';
    else
        document.getElementById('finishedDate').style.display = 'none';     // Hide
}

// Change title color
function changeTitleColor(colorChoice)
{
    if (colorChoice == "red")                                               // Red
        document.getElementById("bookshelfTitle").style.color = "#dc3545";
    else if (colorChoice == "green")                                        // Green
        document.getElementById("bookshelfTitle").style.color = "#198754";
    else if (colorChoice == "blue")                                         // Blue
        document.getElementById("bookshelfTitle").style.color = "#0d6efd";
    else                                                                    // Black
        document.getElementById("bookshelfTitle").style.color = "#212529";
}

// Change calendar month based on current month
function setMonth()
{
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    document.textContent = "New";
    document.getElementById("calendarMonth").textContent = month[d.getMonth()];
}

// Add new book to bookshelf based on selected color
function addBook()
{
    let de = document.getElementById("bookColorDrop");
    let bookColor = de.options[de.selectedIndex].text;
    let newBookNumber = "book" + bookNum;       // String (ex: "book0")

    // Add book spine to shelf
    if (bookColor == "Red")
        document.getElementById("shelf").innerHTML += ("\n<img src=\"Assets/redBookSpine.png\" id=\"" + newBookNumber + "\"onclick=\"openBook('frontBook', 'Red')\" class=\"book\" alt=\"Red book\">");
    else if (bookColor == "Blue")
        document.getElementById("shelf").innerHTML += ("\n<img src=\"Assets/blueBookSpine.png\" id=\"" + newBookNumber + "\"onclick=\"openBook('frontBook', 'Blue')\" class=\"book\" alt=\"Blue book\">");
    else if (bookColor == "Green")
        document.getElementById("shelf").innerHTML += ("\n<img src=\"Assets/greenBookSpine.png\" id=\"" + newBookNumber + "\"onclick=\"openBook('frontBook', 'Green')\" class=\"book\" alt=\"Green book\">");
}

// Replace closed book with open book
function openBook(idName, bookColor) 
{ 
    // Change the color of the current front of the book to the selected color
    document.getElementById(idName).style.visibility = 'visible'; 
    if (bookColor == "Red")
        document.getElementById('frontBook-image').src = "Assets/redBookFront.png";
    else if (bookColor == "Green")
        document.getElementById('frontBook-image').src = "Assets/greenBookFront.png";
    else if (bookColor == "Blue")
        document.getElementById('frontBook-image').src = "Assets/blueBookFront.png";

    // Change to selected color opened book, so when user clicks to open book they get the right colored opened book
    if (bookColor == "Red")
        document.getElementById('openBook-image').src = "Assets/redBookOpen.png";
    else if (bookColor == "Green")
        document.getElementById('openBook-image').src = "Assets/greenBookOpen.png";
    else if (bookColor == "Blue")
        document.getElementById('openBook-image').src = "Assets/blueBookOpen.png";
}

// Replace book with closed book
function closeBook(idName) { document.getElementById(idName).style.visibility = 'hidden'; }

// Change to number of stars chosen by user, set others empty
function changeStar(num)
{
    switch(num)
    {
        case 1:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starEmpty.png';
            document.getElementById('star3').src = 'Assets/starEmpty.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';
            break;
        case 2:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starEmpty.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';
            break;
        case 3:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starFilled.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';
            break;
        case 4:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starFilled.png';
            document.getElementById('star4').src = 'Assets/starFilled.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';
            break;
        case 5:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starFilled.png';
            document.getElementById('star4').src = 'Assets/starFilled.png';
            document.getElementById('star5').src = 'Assets/starFilled.png';
    }
}

// Enable inputs in book
function editMode()
{
    if (modeType != "Edit")
    {
        // Title
        document.getElementById('openBook-title').disabled = false;
        document.getElementById('openBook-title').style.backgroundColor = 'white';
        
        // Author
        document.getElementById('openBook-author').disabled = false;
        document.getElementById('openBook-author').style.backgroundColor = 'white';
        
        // Year published
        document.getElementById('openBook-yearPublished').disabled = false;
        document.getElementById('openBook-yearPublished').style.backgroundColor = 'white';
        
        // Number of pages
        document.getElementById('openBook-numPages').disabled = false;
        document.getElementById('openBook-numPages').style.backgroundColor = 'white';
        
        // Genre
        document.getElementById('openBook-genre').disabled = false;
        document.getElementById('openBook-genre').style.backgroundColor = 'white';
        
        // Book color
        document.getElementById('openBook-bookColor').disabled = false;
        document.getElementById('openBook-bookColor').style.backgroundColor = 'white';
        
        // Is finished reading
        document.getElementById('openBook-finishedReading').disabled = false;
        document.getElementById('openBook-finishedReading').style.backgroundColor = 'white';
        
        // Finished reading date
        document.getElementById('openBook-finishedDate').disabled = false;
        document.getElementById('openBook-finishedDate').style.backgroundColor = 'white';
        
        // Notes
        document.getElementById('openBook-notesInput').disabled = false;
        
        // Hide edit bookmark heading
        document.getElementById('yellowBookmark-heading').textContent = "";
        
        // Show read bookmark heading
        document.getElementById('blueBookmark-heading').textContent = "Read";
        
        // Enable stars
        const stars = document.getElementsByClassName('star');
        for (let i = 0; i < stars.length; i++)
            stars[i].disabled = false;

        // Disable edit bookmark
        document.getElementById('yellowBookmark').disabled = true;

        // Enable read buoo
        document.getElementById('blueBookmark').disabled = false;

        modeType = "Edit";
    }
}

// Disable inputs in book
function readMode()
{
    if (modeType != "Read")
    {
        // Title
        document.getElementById('openBook-title').disabled = true;
        document.getElementById('openBook-title').style.backgroundColor = 'transparent';
        
        // Author
        document.getElementById('openBook-author').disabled = true;
        document.getElementById('openBook-author').style.backgroundColor = 'transparent';
        
        // Year published
        document.getElementById('openBook-yearPublished').disabled = true;
        document.getElementById('openBook-yearPublished').style.backgroundColor = 'transparent';
        
        // Number of pages
        document.getElementById('openBook-numPages').disabled = true;
        document.getElementById('openBook-numPages').style.backgroundColor = 'transparent';
        
        // Genre
        document.getElementById('openBook-genre').disabled = true;
        document.getElementById('openBook-genre').style.backgroundColor = 'transparent';
        
        // Book color
        document.getElementById('openBook-bookColor').disabled = true;
        document.getElementById('openBook-bookColor').style.backgroundColor = 'transparent';
        
        // Is finished reading
        document.getElementById('openBook-finishedReading').disabled = true;
        document.getElementById('openBook-finishedReading').style.backgroundColor = 'transparent';
        
        // Finished reading date
        document.getElementById('openBook-finishedDate').disabled = true;
        document.getElementById('openBook-finishedDate').style.backgroundColor = 'transparent';
        
        // Notes
        document.getElementById('openBook-notesInput').disabled = true;
        
        // Hide read bookmark heading
        document.getElementById('blueBookmark-heading').textContent = "";
        
        // Show read bookmark heading
        document.getElementById('yellowBookmark-heading').textContent = "Edit";
        
        // Disable stars
        const stars = document.getElementsByClassName('star');
        for (let i = 0; i < stars.length; i++)
            stars[i].disabled = true;

        // Enable edit bookmark
        document.getElementById('yellowBookmark').disabled = false;

        // Disable read buoo
        document.getElementById('blueBookmark').disabled = true;

        modeType = "Read";
    }
}

// Remove book from bookshelf
function deleteBook(idName)
{
    // Hide red postit
    document.getElementById('postitRed').style.visibility = 'visible';
}