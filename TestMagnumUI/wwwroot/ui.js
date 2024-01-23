// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${username}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        profileDiv.innerHTML = ''
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    } else if (endpoint === graphConfig.graphPictureEndpoint) {


       // window.webkitURL.createObjectURL(data.blob());
        var binaryData = [];
        binaryData.push(data.blob());
        var x = window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" }))
        document.getElementById("imgShow").src = x;
        console.log(x);

       // var res = data.blob();
        //var phto = window.URL.createObjectURL(res);
        //var binaryData = [];
        //binaryData.push(res);
        //var phto  = window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" }))
        //document.getElementById("imgShow").src = phto;

        //var readableStream = data.body;
        //var stream = readableStream.getReader();

         
       // document.getElementById("imgShow").src = stream;


        //var canvas = document.querySelector('canvas');
        //var video = document.querySelector('video');
        //var image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


        //window.location.href = image;
        // Optional frames per second argument.
       // var stream = canvas.captureStream(25);
        // Set the source of the <video> element to be the stream from the <canvas>.
      //  video.srcObject = data.body;


        //let reader = new FileReader();
        //var phto =  reader.readAsDataURL(res); // converts the blob to base64 and calls onload
        //document.getElementById("imgShow").src = phto;


    } else if (endpoint === graphConfig.graphMailEndpoint) {
        if (!data.value) {
            alert("You do not have a mailbox!")
        } else if (data.value.length < 1) {
            alert("Your mailbox is empty!")
        } else {
            const tabContent = document.getElementById("nav-tabContent");
            const tabList = document.getElementById("list-tab");
            tabList.innerHTML = ''; // clear tabList at each readMail call

            data.value.map((d, i) => {
                // Keeping it simple
                if (i < 10) {
                    const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject;
                    tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
                    tabContent.appendChild(contentItem);
                }
            });
        }
    }
}
