function username_make () {
    if (!(blockSettings.exists("Username"))) {
        username = game.askForString("Choose a username.")
        if (!(username.isEmpty())) {
            story.showPlayerChoices("Keep Username", "Rename Username")
            if (story.checkLastAnswer("Keep Username")) {
                username_make()
            } else {
                blockSettings.writeString("Username", username)
                username = blockSettings.readString("Username")
                password_make()
            }
        } else {
            username_make()
        }
    } else {
        login()
    }
}
function password_make () {
    password = game.askForString("Choose a password.")
    story.showPlayerChoices("Keep Password", "Rename Password")
    if (story.checkLastAnswer("Keep Password")) {
        blockSettings.writeString("Password", password)
        password = blockSettings.readString("Password")
        terminal()
    } else {
        password_make()
    }
}
function profile () {
    game.showLongText("Password is:" + password + " Username is:" + username + " Continue to terminal?", DialogLayout.Full)
    story.showPlayerChoices("Yes", "")
    if (!(story.isMenuOpen())) {
        terminal()
    }
}
function login () {
    terminal()
}
function terminal () {
    game.showLongText("Commands: wito, youtube, settings, profile, about, wimmca", DialogLayout.Bottom)
    terminal_type = game.askForString("Type a command")
    if (terminal_type == "settings") {
        blockMenu.showMenu([
        "Rename Username",
        "Rename Password",
        "Password",
        "Username",
        "Erase Data",
        "<- Back"
        ], MenuStyle.Grid, MenuLocation.FullScreen)
    } else if (terminal_type == "youtube") {
        game.showLongText("GO SUB TO CYBERPULSE BOIIIIIIII", DialogLayout.Bottom)
        terminal()
    } else if (terminal_type == "wimmca") {
        game.showLongText("Microsoft MakeCode Arcade is an offline or online browser game maker, where there's game jams, coding tutorials, and you can even release your own games to the MakeCode community (or GitHub)! And you can always try it out by typing in arcade.makecode.com in a New Tab.", DialogLayout.Bottom)
        terminal()
    } else if (terminal_type == "profile") {
        profile()
    } else if (terminal_type == "wito") {
        game.showLongText("TerminalOS is an os that only runs on 6 commands. And it has a login system so nobody else will mess around! anyways this took 1 day to build and yet this in the editor look like it took a week - The Creator", DialogLayout.Bottom)
        terminal()
    } else {
        game.showLongText("i don't even know what ur saying lol", DialogLayout.Bottom)
    }
}
blockMenu.onMenuOptionSelected(function (option, index) {
    if ("Erase Data" == option) {
        if (game.ask("Are you sure", "you want to erase your data?")) {
            blockSettings.clear()
            game.reset()
        } else {
            terminal()
        }
    } else if ("Username" == option) {
        game.showLongText("" + username + " is your username.", DialogLayout.Bottom)
        terminal()
    } else if ("Password" == option) {
        game.showLongText("" + password + " is your password.", DialogLayout.Bottom)
        terminal()
    } else if ("Rename Password" == option) {
        password_make()
    } else if ("Rename Username" == option) {
        username_make()
    } else {
        terminal()
    }
})
let terminal_type = ""
let password = ""
let username = ""
username_make()
