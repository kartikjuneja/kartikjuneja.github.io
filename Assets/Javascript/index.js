$(document).ready(function () {
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
        GetUserNameScreen();
        //var newName = prompt("Okay! then what should I call you?", username.textContent);
        //var newName = "Okay! then what should I call you?";
        //usernames.textContent = newName;

        //if (newName === null) {
        //    // Handle the cancel event
        //    newName = username.textContent;
        //} else {
        //    // Handle the input event
        //    let newNameTrimmed = newName.trim();
        //}

        //if (!newName) {
        //    newName = "Anon";
        //}
        //usernames.forEach(span => {
        //    span.textContent = newName;
        //});
    });

    //header.addEventListener("click", function () {
    //    const newName = prompt("Enter new header text:", header.textContent);
    //    header.textContent = newName;
    //});

    var now = new Date();
    const nightModeBtn = document.getElementById("nightModeBtn")

    if (now.getHours() > 20 || now.getHours() < 6) {
        document.body.classList.toggle("night-mode");
        $('#userNameInput').addClass("night-mode-input");
        $('#nightModeBtn').addClass("night-mode-button");
        nightModeBtn.textContent = "Lights please! 🌞"
    }

    nightModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("night-mode");
        
        if (nightModeBtn.textContent.includes("Light")) {
            nightModeBtn.textContent = "I love darkness 🌘";
            $('#userNameInput').removeClass("night-mode-input");
            $('#nightModeBtn').removeClass("night-mode-button");
        } else {
            nightModeBtn.textContent = "Lights please! 🌞"
            $('#userNameInput').addClass("night-mode-input");
            $('#nightModeBtn').addClass("night-mode-button");
        }

    });

    button1.addEventListener("click", function () {
        header.style.display = "none";
        buttonRow1.style.display = "none";
        buttonRow2.style.display = "block";

        message.textContent = username.textContent + ", wanna connect with me?";
    });

    button4.addEventListener("click", function () {
        const messageText = "You're really nice, " + username.textContent + ".";
        ShowSocialProfiles(messageText);
    });

    buttonForYou.addEventListener("click", function () {
        header.style.display = "none";
        buttonRow1.style.display = "none";
        const messageText = "Thankyou for your kind visit.";
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

    $('#userNameInput').keyup(function (event) {
        debugger;
        if (event.keyCode === 13) {
            // Trigger your function here
            ChangeUserName();
        }
    });

    function ShowSocialProfiles(messageText) {

        buttonRow2.style.display = "none";
        buttonRow3.style.display = "block";
        button7.style.display = "inline-block";

        message.textContent = messageText;
        socialinvite.style.display = "block";
        socialmedia.style.display = "block";
    }

    function ResetAll() {
        $('#header').show();
        $('#buttonRow1').show();
        $('#buttonRow2').hide();
        $('#buttonRow3').hide();

        message.textContent = "What's up?";
        socialinvite.style.display = "none";
        socialmedia.style.display = "none";
        socialmediaAnonymous.style.display = "none";
        $('#userNameDiv').hide();
    }

    function GetUserNameScreen() {
        $('#header').hide();
        $('#buttonRow1').hide();
        $('#buttonRow2').hide();
        $('#buttonRow3').hide();

        message.textContent = "Okay! then what should I call you?";
        $('#userNameDiv').show();

        socialinvite.style.display = "none";
        socialmedia.style.display = "none";
        socialmediaAnonymous.style.display = "none";
    }

    function ChangeUserName() {
        var newName = $('#userNameInput').val();
        $('#userNameInput').val("");
        if (newName === null || newName === undefined) {
            // Handle the cancel event
            newName = username.textContent;
        } else {
            // Handle the input event
            newName = newName.trim();
        }

        if (!newName) {
            newName = "Anon";
        }
        usernames.forEach(span => {
            span.textContent = newName;
        });

        ResetAll();
    }
});