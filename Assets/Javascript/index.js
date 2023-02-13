window.onload = function () {
    const header = document.querySelector("#header");
    const usernames = document.querySelectorAll(".username");
    const username = document.querySelector("#username");
    usernames.forEach(span => {
        span.textContent = username.textContent;
    });
    const message = document.querySelector("#message");
    const buttonRow1 = document.querySelector("#buttonRow1");
    const button1 = document.querySelector("#button1");
    const button3 = document.querySelector("#button3");
    const buttonRow2 = document.querySelector("#buttonRow2");

    button3.addEventListener("click", function () {
        var newName = prompt("Okay! then what should I call you?", username.textContent);
        //usernames.textContent = newName;

        if (newName === null) {
            // Handle the cancel event
            newName = username.textContent;
        } else {
            // Handle the input event
            let newNameTrimmed = newName.trim();
        }

        if (!newName) {
            newName = "Anon";
        }
        usernames.forEach(span => {
            span.textContent = newName;
        });
    });

    //header.addEventListener("click", function () {
    //    const newName = prompt("Enter new header text:", header.textContent);
    //    header.textContent = newName;
    //});

    var now = new Date();
    const nightModeBtn = document.getElementById("nightModeBtn")

    if (now.getHours() > 20 || now.getHours() < 6) {
        document.body.classList.toggle("night-mode");
        nightModeBtn.textContent = "Lights please!"
    }

    nightModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("night-mode");
        if (nightModeBtn.textContent.includes("Light")) {
            nightModeBtn.textContent = "I want darkness";
        } else {
            nightModeBtn.textContent = "Lights please!"
        }

    });

    button1.addEventListener("click", function () {
        header.style.display = "none";
        buttonRow1.style.display = "none";
        buttonRow2.style.display = "block";

        message.textContent = username.textContent + ", wanna connect with me?";
    });

    button4.addEventListener("click", function () {
        const messageText = "You're wonderful, " + username.textContent + ".";
        ShowSocialProfiles(messageText);
    });

    button5.addEventListener("click", function () {
        const messageText = "Good Choice, " + username.textContent + ".";
        ShowSocialProfiles(messageText);
    });

    button6.addEventListener("click", function () {
        ResetAll();
    });

    button7.addEventListener("click", function () {
        socialmedia.style.display = "none";
        socialinvite.style.display = "none";
        button7.style.display = "none";
        socialmediaAnonymous.style.display = "block";
        message.textContent = "Sure, Just go to below site and send it.";
    });
}

function ShowSocialProfiles(messageText) {

    buttonRow2.style.display = "none";
    buttonRow3.style.display = "block";
    button7.style.display = "inline-block";

    message.textContent = messageText;
    socialinvite.style.display = "block";
    socialmedia.style.display = "block";
}

function ResetAll() {
    header.style.display = "block";
    buttonRow1.style.display = "block";
    buttonRow2.style.display = "none";
    buttonRow3.style.display = "none";

    message.textContent = "What's up?";
    socialinvite.style.display = "none";
    socialmedia.style.display = "none";
    socialmediaAnonymous.style.display = "none";
}

function GetUserNameScreen() {
    header.style.display = "none";
    buttonRow1.style.display = "none";
    buttonRow2.style.display = "none";
    buttonRow3.style.display = "none";

    message.textContent = "What's up?";
    socialinvite.style.display = "none";
    socialmedia.style.display = "none";
    socialmediaAnonymous.style.display = "none";
}