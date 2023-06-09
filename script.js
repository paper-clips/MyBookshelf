// GLOBALS ----------------------------------------------------------------------------- //
let modeType = "Edit";      // Current mode: Edit or Read
let bookNum;                // Iterate each new book which is added to the bookshelf
let currOpenedBook;         // Keep track of which book is currently clicked on/opened
let bookList = {};          // Store each book and its info
// ------------------------------------------------------------------------------------- //

// Add three filled books to bookshelf
function startingBooksOnShelf()
{
    // Book 0
    bookList["book0"] = ({
        bookNumber: 0,
        title: "A Series of Unfortunate Events",
        author: "Lemony Snicket",
        isFinished: true,
        dateFinished: "2012-05-10",
        color: "Red",
        yearPublished: 1999,
        numPages: 225,
        genre: "Gothic Fiction",
        numStars: 5,
        notes: "\"The world is quiet here\""
    });
    // Book 1
    bookList["book1"] = ({
        bookNumber: 1,
        title: "Slaughterhouse-Five",
        author: "Kurt Vonnegut",
        isFinished: true,
        dateFinished: "2017-09-15",
        color: "Blue",
        yearPublished: 1969,
        numPages: 190,
        genre: "Dark comedy, SciFi",
        numStars: 5,
        notes: "\"So it goes\""
    });
    // Book 2
    bookList["book2"] = ({
        bookNumber: 2,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isFinished: false,
        dateFinished: "",
        color: "Green",
        yearPublished: 1813,
        numPages: 279,
        genre: "Historical Fiction",
        numStars: 0,
        notes: "To read..."
    });

    // Change popovers of first three books to their respective titles
    titlePopover("book0");
    titlePopover("book1");
    titlePopover("book2");

    bookNum = 3;
}

// Set whichever book was clicked on as the current book
function setCurrBook(idName) { currOpenedBook = idName; }

// Make popover the title of the book
function titlePopover(idName) { document.getElementById(idName).title = bookList[idName].title; }

// Show element based on id name
function showElement(idName) { document.getElementById(idName).style.visibility = 'visible'; }

// Hide element based on id name
function hideElement(idName) { document.getElementById(idName).style.visibility = 'hidden'; }

// Clear form inputs
function clearForm(idName) { document.getElementById(idName).reset(); }

// Unselect checkbox
function uncheckCheckBox(idName) { document.getElementById(idName).checked = false; }

// Change bookshelf title
function changeTitle() { document.getElementById("bookshelfTitle").textContent = document.getElementById("bookshelfTitleInput").value; }

// Change bookshelf title color
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
    document.getElementById("calendarMonth").textContent = month[d.getMonth()];
}

// Show extra input if clicked on checkbox showing if finished reading book, else hide extra input
function finishedReading()
{
    if(document.getElementById('finishedReadCheck').checked)                // Show
        document.getElementById('finishedDate').style.display = 'block';
    else
        document.getElementById('finishedDate').style.display = 'none';     // Hide
}

// Add new book to bookshelf based on selected color
function addBook()
{
    let de = document.getElementById("bookColorDrop");
    let bookColor = de.options[de.selectedIndex].text;
    let newBookNumber = "book" + bookNum;       // String (ex: "book0")

    // Add book spine to shelf
    if (bookColor == "Red")
        document.getElementById("shelf").innerHTML += ("\n<button class=\"p-0 mb-3 border border-0 bg-transparent\">\n<img src=\"Assets/redBookSpine.png\" id=\"" + newBookNumber + "\" data-toggle=\"popover\" data-bs-toggle=\"modal\" data-bs-target=\"#frontBook-modal\" onclick=\"setCurrBook('" + newBookNumber + "');openBook(); fillBookFront('" + newBookNumber + "')\" class=\"book\" alt=\"Red book spine\"></button>");
    else if (bookColor == "Blue")
        document.getElementById("shelf").innerHTML += ("\n<button class=\"p-0 mb-3 border border-0 bg-transparent\">\n<img src=\"Assets/blueBookSpine.png\" id=\"" + newBookNumber + "\" data-toggle=\"popover\" data-bs-toggle=\"modal\" data-bs-target=\"#frontBook-modal\" onclick=\"setCurrBook('" + newBookNumber + "');openBook(); fillBookFront('" + newBookNumber + "')\" class=\"book\" alt=\"Blue book spine\"></button>");
    else if (bookColor == "Green")
        document.getElementById("shelf").innerHTML += ("\n<button class=\"p-0 mb-3 border border-0 bg-transparent\">\n<img src=\"Assets/greenBookSpine.png\" id=\"" + newBookNumber + "\" data-toggle=\"popover\" data-bs-toggle=\"modal\" data-bs-target=\"#frontBook-modal\" onclick=\"setCurrBook('" + newBookNumber + "');openBook(); fillBookFront('" + newBookNumber + "')\" class=\"book\" alt=\"Green book spine\"></button>");

    // Get info from postit
    let bookTitle = document.getElementById("titleInput").value;
    let bookAuthor = document.getElementById("authorInput").value;
    let isFinishedReadingBook = document.getElementById("finishedReadCheck").checked;
    let dateFinishedBook = document.getElementById("finishedDateInput").value;
    
    // Add new book
    bookList[newBookNumber] = ({
        bookNumber: bookNum,
        title: bookTitle,
        author: bookAuthor,
        isFinished: isFinishedReadingBook,
        dateFinished: dateFinishedBook,
        color: bookColor,
        yearPublished: undefined,
        numPages: undefined,
        genre: "",
        numStars: 0,
        notes: ""
    });

    // Close yellow postit and clear form
    clearForm('yellowPostitForm');
    document.getElementById('finishedDate').style.display = 'none';       // Hide date finished block

    // Change popover to display title of the book
    titlePopover(newBookNumber);

    // Iterate number of books on shelf
    bookNum++;
}

// Replace closed book with open book
function openBook() 
{ 
    if (bookList[currOpenedBook].color == "Red")
    {
        // Change the color of the current front of the book to the selected color
        document.getElementById('frontBook-image').src = "Assets/redBookFront.png";
        // Change to selected color opened book, so when user clicks to open book they get the right colored opened book
        document.getElementById('openBook-image').src = "Assets/redBookOpen.png";
    
        // Alt text
        document.getElementById('frontBook-image').alt = "Front of red book cover";
        document.getElementById('openBook-image').alt = "Opened red book";
    }
    else if (bookList[currOpenedBook].color == "Green")
    {
        document.getElementById('frontBook-image').src = "Assets/greenBookFront.png";
        document.getElementById('openBook-image').src = "Assets/greenBookOpen.png";

        // Alt text
        document.getElementById('frontBook-image').alt = "Front of green book cover";
        document.getElementById('openBook-image').alt = "Opened green book";
    }
    else if (bookList[currOpenedBook].color == "Blue")
    {
        document.getElementById('frontBook-image').src = "Assets/blueBookFront.png";
        document.getElementById('openBook-image').src = "Assets/blueBookOpen.png";

        // Alt text
        document.getElementById('frontBook-image').alt = "Front of blue book cover";
        document.getElementById('openBook-image').alt = "Opened blue book";
    }

}

// Update in JSON data structure to number of stars selected by user
function updateStars(num) 
{ 
    bookList[currOpenedBook].numStars = num; 
    changeStars();
}

// Change to number of stars chosen by user, set others empty
function changeStars()
{
    switch(bookList[currOpenedBook].numStars)
    {
        case 0:
            document.getElementById('star1').src = 'Assets/starEmpty.png';
            document.getElementById('star2').src = 'Assets/starEmpty.png';
            document.getElementById('star3').src = 'Assets/starEmpty.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';

            // Alt text
            document.getElementById('star1').alt = 'Transparent star';
            document.getElementById('star2').alt = 'Transparent star';
            document.getElementById('star3').alt = 'Transparent star';
            document.getElementById('star4').alt = 'Transparent star';
            document.getElementById('star5').alt = 'Transparent star';
            break;
        case 1:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starEmpty.png';
            document.getElementById('star3').src = 'Assets/starEmpty.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';

            // Alt text
            document.getElementById('star1').alt = 'Yellow star';
            document.getElementById('star2').alt = 'Transparent star';
            document.getElementById('star3').alt = 'Transparent star';
            document.getElementById('star4').alt = 'Transparent star';
            document.getElementById('star5').alt = 'Transparent star';
            break;
        case 2:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starEmpty.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';

            // Alt text
            document.getElementById('star1').alt = 'Yellow star';
            document.getElementById('star2').alt = 'Yellow star';
            document.getElementById('star3').alt = 'Transparent star';
            document.getElementById('star4').alt = 'Transparent star';
            document.getElementById('star5').alt = 'Transparent star';
            break;
        case 3:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starFilled.png';
            document.getElementById('star4').src = 'Assets/starEmpty.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';

            // Alt text
            document.getElementById('star1').alt = 'Yellow star';
            document.getElementById('star2').alt = 'Yellow star';
            document.getElementById('star3').alt = 'Yellow star';
            document.getElementById('star4').alt = 'Transparent star';
            document.getElementById('star5').alt = 'Transparent star';
            break;
        case 4:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starFilled.png';
            document.getElementById('star4').src = 'Assets/starFilled.png';
            document.getElementById('star5').src = 'Assets/starEmpty.png';

            // Alt text
            document.getElementById('star1').alt = 'Yellow star';
            document.getElementById('star2').alt = 'Yellow star';
            document.getElementById('star3').alt = 'Yellow star';
            document.getElementById('star4').alt = 'Yellow star';
            document.getElementById('star5').alt = 'Transparent star';
            break;
        case 5:
            document.getElementById('star1').src = 'Assets/starFilled.png';
            document.getElementById('star2').src = 'Assets/starFilled.png';
            document.getElementById('star3').src = 'Assets/starFilled.png';
            document.getElementById('star4').src = 'Assets/starFilled.png';
            document.getElementById('star5').src = 'Assets/starFilled.png';

            // Alt text
            document.getElementById('star1').alt = 'Yellow star';
            document.getElementById('star2').alt = 'Yellow star';
            document.getElementById('star3').alt = 'Yellow star';
            document.getElementById('star4').alt = 'Yellow star';
            document.getElementById('star5').alt = 'Yellow star';
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

        // Disable read bookmark
        document.getElementById('blueBookmark').disabled = true;

        modeType = "Read";
    }
}

// Remove book from bookshelf
function deleteBook() 
{ 
    // Delete book from JSON data structure
    delete bookList[currOpenedBook]; 

    // Remove book from bookshelf
    document.getElementById(currOpenedBook).remove();
}

// Fill in title and author of front of book
function fillBookFront(idName)
{
    document.getElementById("frontBook-title").textContent = bookList[idName].title;
    document.getElementById("frontBook-author").textContent = bookList[idName].author;

    // Current opened book
    currOpenedBook = idName;
}

// Fill in inputs in open book
function fillBookOpen()
{
    document.getElementById("openBook-title").value = bookList[currOpenedBook].title;
    document.getElementById("openBook-author").value = bookList[currOpenedBook].author;
    document.getElementById("openBook-yearPublished").value = bookList[currOpenedBook].yearPublished;
    document.getElementById("openBook-numPages").value = bookList[currOpenedBook].numPages;
    document.getElementById("openBook-genre").value = bookList[currOpenedBook].genre;
    document.getElementById("openBook-finishedReading").checked = bookList[currOpenedBook].isFinished;
    document.getElementById("openBook-finishedDate").value = bookList[currOpenedBook].dateFinished;
    
    // Book color
    if ([bookList[currOpenedBook].color] == "Red")
        document.getElementById("openBook-bookColor").selectedIndex = 0;
    else if ([bookList[currOpenedBook].color] == "Green")
        document.getElementById("openBook-bookColor").selectedIndex = 1;
    else if ([bookList[currOpenedBook].color] == "Blue")
        document.getElementById("openBook-bookColor").selectedIndex = 2;  

    // Stars
    changeStars();

    // Notes
    document.getElementById("openBook-notesInput").value = bookList[currOpenedBook].notes;
}

// Update the inputs on the open book when the user changes them in Edit mode
function updateOpenBook()
{
    // Update JSON data structure
    bookList[currOpenedBook].title = document.getElementById("openBook-title").value;
    bookList[currOpenedBook].author = document.getElementById("openBook-author").value;
    bookList[currOpenedBook].yearPublished = document.getElementById("openBook-yearPublished").value;
    bookList[currOpenedBook].numPages = document.getElementById("openBook-numPages").value;
    bookList[currOpenedBook].genre = document.getElementById("openBook-genre").value;
    bookList[currOpenedBook].isFinished = document.getElementById("openBook-finishedReading").checked;
    bookList[currOpenedBook].dateFinished = document.getElementById("openBook-finishedDate").value;

    // Notes
    bookList[currOpenedBook].notes = document.getElementById("openBook-notesInput").value;

    // Change popover to display title of the book
    titlePopover(currOpenedBook);
}

// Change the color of the book (spine, front, and opened) based on dropdown selection
function changeBookColor()
{
    if (document.getElementById("openBook-bookColor").selectedIndex == 0)
    {
        bookList[currOpenedBook].color = "Red";                                     // Update JSON
        document.getElementById(currOpenedBook).src = "Assets/redBookSpine.png";            // Change book spine color
        document.getElementById("frontBook-image").src = "Assets/redBookFront.png";         // Change book front color
        document.getElementById("openBook-image").src = "Assets/redBookOpen.png";           // Change book open color
    
        // Alt text
        document.getElementById(currOpenedBook).alt = "Red book spine";
        document.getElementById("frontBook-image").alt = "Front of red book cover";
        document.getElementById("openBook-image").alt = "Opened red book"; 
    }
    else if (document.getElementById("openBook-bookColor").selectedIndex == 1)
    {
        bookList[currOpenedBook].color = "Green";                                   // Update JSON
        document.getElementById(currOpenedBook).src = "Assets/greenBookSpine.png";          // Change book spine color
        document.getElementById("frontBook-image").src = "Assets/greenBookFront.png";       // Change book front color
        document.getElementById("openBook-image").src = "Assets/greenBookOpen.png";         // Change book open color
    
        // Alt text
        document.getElementById(currOpenedBook).alt = "Green book spine";
        document.getElementById("frontBook-image").alt = "Front of green book cover";
        document.getElementById("openBook-image").alt = "Opened green book"; 
    }
    else if (document.getElementById("openBook-bookColor").selectedIndex == 2)
    {
        bookList[currOpenedBook].color = "Blue";                                    // Update JSON
        document.getElementById(currOpenedBook).src = "Assets/blueBookSpine.png";           // Change book spine color
        document.getElementById("frontBook-image").src = "Assets/blueBookFront.png";        // Change book front color
        document.getElementById("openBook-image").src = "Assets/blueBookOpen.png";          // Change book open color
    
        // Alt text
        document.getElementById(currOpenedBook).alt = "Blue book spine";
        document.getElementById("frontBook-image").alt = "Front of blue book cover";
        document.getElementById("openBook-image").alt = "Opened blue book"; 
    }
}
