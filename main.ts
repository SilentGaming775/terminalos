function username_make () {
    if (!(blockSettings.exists("Username"))) {
        username = game.askForString("Choose a username.")
        if (!(username.isEmpty())) {
            story.showPlayerChoices("Keep Username", "Rename Username")
            if (story.checkLastAnswer("Keep Username")) {
                blockSettings.writeString("Username", username)
                username = blockSettings.readString("Username")
                password_make()
            } else {
                username_make()
            }
        } else {
            username_make()
        }
    } else {
        request_terminal()
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
function request_terminal () {
    terminal()
}
function profile () {
    game.showLongText("Password is:" + password + " Username is:" + username + " Continue to terminal?", DialogLayout.Full)
    story.showPlayerChoices("Yes", "")
    if (!(story.isMenuOpen())) {
        terminal()
    }
}
radio.onReceivedString(function (receivedString) {
    game.splash("Your friend is saying:", receivedString)
    terminal()
})
function terminal () {
    game.showLongText("If you didn't know, you'll be sent back to the terminal after you get a message.", DialogLayout.Bottom)
    game.showLongText("Commands: wito, youtube, settings, profile, about, wimmca", DialogLayout.Bottom)
    terminal_type = game.askForString("Type a command")
    if (terminal_type == "settings") {
        blockMenu.showMenu([
        "Rename Username",
        "Rename Password",
        "Password",
        "Username",
        "Erase Data",
        "Message",
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
        terminal()
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
        blockMenu.closeMenu()
        game.showLongText("" + username + " is your username.", DialogLayout.Bottom)
        terminal()
    } else if ("Password" == option) {
        blockMenu.closeMenu()
        game.showLongText("" + password + " is your password.", DialogLayout.Bottom)
        terminal()
    } else if ("Rename Password" == option) {
        password_make()
    } else if ("Rename Username" == option) {
        username_make()
    } else if ("<- Back" == option) {
        terminal()
    } else {
        radio.raiseEvent(
        121,
        20
        )
        group = game.askForNumber("Enter your radio brodcast number.", 4)
        radio.setGroup(group)
        send = game.askForString("Type what you are sending.", 19)
        radio.sendString(send)
    }
})
let send = ""
let group = 0
let terminal_type = ""
let password = ""
let username = ""
console.log("Hello! I am ConsleBot! I display variables numbers and even text! Like right now! You can change what's showing in the code editor!")
username_make()
