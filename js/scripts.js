window.onload = init;

// The contact manager as a global variable
let cm;

function init() {
    // create an instance of the contact manager
    cm = new ContactManager();

    cm.addTestData();
    cm.printContactsToConsole();

    // Display contacts in a table
    // Pass the id of the HTML element that will contain the table
    cm.displayContactsAsATable("contacts");


}

function formSubmitted() {
    // Get the values from input fields
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let newContact = new Contact(name.value, email.value);
    cm.add(newContact);

    // Empty the input fields
    name.value = "";
    email.value = "";

    // refresh the html table
    cm.displayContactsAsATable("contacts");

    // do not let your browser submit the form using HTTP
    return false;
}

function emptyList() {
    cm.empty();
    cm.displayContactsAsATable("contacts");
}

function loadList() {
    cm.load();
    cm.displayContactsAsATable("contacts");
}

function searchList() {
    cm.search();
    cm.displayContactsAsATable("contacts");
}


class Contact {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        // when we build the contact manager, it
        // has an empty list of contacts
        this.listOfContacts = [];
    }

    addTestData() {
        var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
        var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
        var c3 = new Contact("Angus Young", "angus@acdc.com");
        var c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");

        this.add(c1);
        this.add(c2);
        this.add(c3);
        this.add(c4);
        //console.log(cm);
        // Let's sort the list of contacts by Name
        // this.sort();
    }

    // Will erase all contacts
    empty() {
        this.listOfContacts = [];
    }

    add(contact) {
        this.listOfContacts.push(contact);
    }

    search() {
        let s = document.querySelector("#search");
        var listSearch = [];
        var i = 0;
        this.listOfContacts.forEach(function (c) {
            if (c.name === s.value) {
                //console.log("hihoo");
                listSearch[i] = c;
                i++;

            }

        });
        console.log(search.value);
        search.value = "";
        if (listSearch.length != 0) {
            this.listOfContacts = listSearch;

        } else {
            alert("element doesn't exist! ")
        }

    }

    remove(contact) {
        for (let i = 0; i < this.listOfContacts.length; i++) {
            var c = this.listOfContacts[i];

            if (c.email === contact.email) {
                // remove the contact at index i
                this.listOfContacts.splice(i, i);
                // stop/exit the loop
                break;
            }
        }
    }

    sort() {
        // As our array contains objects, we need to pass as argument
        // a method that can compare two contacts.
        // we use for that a class method, similar to the distance(p1, p2)
        // method we saw in the ES6 Point class in module 4
        // We always call such methods using the name of the class followed
        // by the dot operator
        this.listOfContacts.sort(ContactManager.compareByName);
    }



    // class method for comparing two contacts by name
    static compareByName(c1, c2) {
        // JavaScript has builtin capabilities for comparing strings
        // in alphabetical order
        if (c1.name < c2.name)
            return -1;

        if (c1.name > c2.name)
            return 1;

        return 0;
    }

    printContactsToConsole() {
        this.listOfContacts.forEach(function (c) {
            console.log(c.name);
        });
    }

    load() {
        if (localStorage.contacts !== undefined) {
            // the array of contacts is savec in JSON, let's convert
            // it back to a reak JavaScript object.
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }

    save() {
        // We can only save strings in local Storage. So, let's convert
        // ou array of contacts to JSON
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }



    displayContactsAsATable(idOfContainer) {
        // empty the container that contains the results
        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML = "";


        if (this.listOfContacts.length === 0) {
            container.innerHTML = "<p>No contacts to display!</p>";
            // stop the execution of this method
            return;
        }

        // creates and populate the table with users
        var table = document.createElement("table");
        var header = table.insertRow();
        var r1 = header.insertCell();
        r1.innerHTML = "Name";
        var listTemp = [];
        var m = 0;
       
        r1.addEventListener("click", function () {

            for (let i = 0; i < cm.listOfContacts.length - 1; i++) {


                for (let j = i + 1; j < cm.listOfContacts.length; j++) {

                    //console.log(cm.listOfContacts[i]<cm.listOfContacts[j]);

                    if (cm.listOfContacts[i].name > cm.listOfContacts[j].name) {
                        listTemp[0] = cm.listOfContacts[j];
                        cm.listOfContacts[j] = cm.listOfContacts[i];
                        cm.listOfContacts[i] = listTemp[0];

                    }
                }
                //console.log(cm.listOfContacts[i].name<cm.listOfContacts[i+1].name);
            };
            //localStorage.contacts = sessionStorage.contacts
            //console.log('clickeed');
            console.log(cm.listOfContacts);
        }, false);
        
        console.log(cm.listOfContacts);
        var r2 = header.insertCell();
        r2.innerHTML = "email";
        var r3 = header.insertCell();
        r3.innerHTML = "delete";
        // iterate on the array of users
        this.listOfContacts.forEach(function (currentContact) {
            // creates a row
            var row = table.insertRow();
            var img = document.createElement('img');
            img.src = "img/TrashBin.png";
            row.innerHTML = "<td>" + currentContact.name + "</td>"
                + "<td>" + currentContact.email + "</td>"
            var x = row.insertCell();
            x.innerHTML = "<img src='../img/TrashBin.png' />";
            x.addEventListener("click", function () {

                row.remove();


            }, false);

        });

        // this.sort();

        // adds the table to the div
        container.appendChild(table);

    }
}

