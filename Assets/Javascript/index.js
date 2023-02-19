$(document).ready(function () {
    const header = document.querySelector("#header");
    const usernames = document.querySelectorAll(".username");
    const username = document.querySelector("#username");
    usernames.forEach(span => {
        span.textContent = username.textContent;
    });
    const message = document.querySelector("#message");;
    const button3 = document.querySelector("#button3");
    const buttonRow2 = document.querySelector("#buttonRow2");

    const Screens = {
        Home: $("#HomeScreen"),
        About: $("#AboutScreen"),
        Education: $("#EducationScreen"),
        Social: $("#SocialScreen")
    };

    const Buttons = {
        ToAbout: $("#buttonAbout"),
        ToHome_About: $("#buttonHome_About"),
        ToEducation: $("#buttonEducation"),
        ToSocial: $("#buttonSocial"),
        ToAbout_Education: $("#buttonAbout_Education"),
        ToAbout_Social: $("#buttonAbout_Social")
    };

    Buttons.ToHome_About.click(function () {
        ToHome();
    });

    Buttons.ToAbout.click(function () {
        ToAbout();
    });

    Buttons.ToEducation.click(function () {
        ToEducation();
    });

    Buttons.ToAbout_Education.click(function () {
        ToAbout();
    });

    Buttons.ToSocial.click(function () {
        ToSocial();
    });

    Buttons.ToAbout_Social.click(function () {
        ToAbout();
    });

    //buttonAbout.addEventListener("click", function () {
    //    Screens.Home.hide();
    //    Screens.About.show();
    //    message.textContent = username.textContent + ", wanna connect with me?";
    //});

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

    //button2.addEventListener("click", function () {
    //    header.style.display = "none";
    //    HomeButtons.style.display = "none";
    //    const messageText = "Thankyou for your kind visit.";
    //    ShowJobProfiles(messageText);
    //});

    button4.addEventListener("click", function () {
        const messageText = "You're really nice, " + username.textContent + ".";
        ShowSocialProfiles(messageText);
    });

    //buttonForYou.addEventListener("click", function () {
    //    header.style.display = "none";
    //    HomeButtons.style.display = "none";
    //    const messageText = "Thankyou for your kind visit.";
    //    ShowSocialProfiles(messageText);
    //});

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

    function ToHome() {
        Screens.Home.show();
        Screens.About.hide();
    }

    function ToAbout() {
        Screens.Home.hide();
        Screens.About.show();
        Screens.Education.hide();
        Screens.Social.hide();
    }

    function ToEducation() {
        Screens.Home.hide();
        Screens.About.hide();
        Screens.Education.show();
    }

    function ToSocial() {
        Screens.Home.hide();
        Screens.About.hide();
        Screens.Education.hide();
        Screens.Social.show();
    }

    function ShowSocialProfiles(messageText) {

        buttonRow2.style.display = "none";
        buttonRow3.style.display = "block";
        button7.style.display = "inline-block";

        message.textContent = messageText;
        socialinvite.style.display = "block";
        socialmedia.style.display = "block";
    }

    function loadPage(href) {
        //var iframe = document.createElement("iframe");
        //var url = "path/to/your/html/JobProfiles.html";
        //iframe.src = url;
        //iframe.width = "100%";
        //iframe.height = "500px";
        //var container = document.getElementById("frameCon");
        //container.appendChild(iframe);

        //var xmlhttp = new XMLHttpRequest();
        //xmlhttp.open("GET", href, false);
        //xmlhttp.send();
        //return xmlhttp.responseText;
    }

    function ShowJobProfiles(messageText) {
        buttonRow2.style.display = "none";
        buttonRow3.style.display = "block";
        button7.style.display = "inline-block";

        message.textContent = messageText;
        socialinvite.style.display = "block";
        jobprofiles.style.display = "block";
        jobprofiles.innerHTML = loadPage('Pages/JobProfiles.html');
    }

    function ResetAll() {
        $('#header').show();
        $('#HomeButtons').show();
        $('#buttonRow2').hide();
        $('#buttonRow3').hide();

        message.textContent = "What's up?";
        socialinvite.style.display = "none";
        socialmedia.style.display = "none";
        jobprofiles.style.display = "none";
        socialmediaAnonymous.style.display = "none";
        $('#userNameDiv').hide();
    }

    function GetUserNameScreen() {
        $('#header').hide();
        $('#HomeButtons').hide();
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