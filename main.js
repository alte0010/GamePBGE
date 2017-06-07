var Game = (function () {
    function Game(output, input) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }
    Game.prototype.createRooms = function () {
        var hall1 = new Room(" in the 1st hall after the main entrance of the prison");
        var hall2 = new Room(" in the 2nd part of the hall of the prison");
        var hall3 = new Room(" in the 3rd part of the hall of the prison");
        var hall4 = new Room(" in the 4th part of the hall of the prison");
        var hall5 = new Room(" in the 5th part of the hall of the prison");
        var hall6 = new Room(" in the 6th part of the hall of the prison");
        var hall7 = new Room(" in the 7th part of the hall of the prison, leading to the courtyard");
        var office1 = new Room(" in the office of the main 2nd part of the hall");
        var office2 = new Room(" in the office of the main 4rd part of the hall");
        var administration1 = new Room(" at the administration office");
        var closet1 = new Room(" in the closet at administration");
        var closet2 = new Room(" trapped in the closet at office in the 2nd part of the hall! Hit F5 to restart the game");
        var guards1 = new Room(" in the guarded changing room before being guarded to your cell.");
        var cubicle1 = new Room(" in the cubicle of the guearded changing room");
        var cubicle2 = new Room(" in the cubicles of the gym");
        var toilet1 = new Room(" in the main restroom of the 6th hall");
        var canteen1 = new Room(" in the canteen of the prison");
        var canteen2 = new Room(" in the back of the prison canteen");
        var kitchen1 = new Room(" in the kitchen of the prison canteen");
        var bathroom1 = new Room(" in the main bathroom at then north side of the gym");
        var gym1 = new Room(" in the gym");
        var locker1 = new Room(" looking at a locker in the cubicles of the gym");
        var wall1 = new Room(" at the outside wall of the prison, under the watchtower");
        var powerbox1 = new Room(" at the powerbox on the east side of the watchtower");
        var watchtower1 = new Room(" at the locked door of the watchtower");
        var cellblock1 = new Room(" in the cellblock A");
        var cell1 = new Room(" in your own cell");
        var courtyard1 = new Room(" outside in the courtyard");
        var freedom = new Room(" free and escaped from the prison!");
        hall1.setExits(hall2, null, null, administration1);
        administration1.setExits(office1, hall1, null, closet1);
        closet1.setExits(null, administration1, null, null);
        hall2.setExits(guards1, hall3, hall1, office1);
        office1.setExits(office2, hall2, null, closet2);
        closet2.setExits(null, null, null, null);
        hall3.setExits(null, hall4, office2, hall2);
        office2.setExits(null, null, null, null);
        hall4.setExits(null, watchtower1, null, hall3);
        watchtower1.setExits(null, hall4, null, null);
        guards1.setExits(hall5, null, hall3, cubicle1);
        cubicle1.setExits(null, guards1, null, null);
        hall5.setExits(cellblock1, bathroom1, guards1, hall6);
        hall6.setExits(null, hall5, toilet1, canteen1);
        canteen1.setExits(kitchen1, hall6, canteen2, null);
        canteen2.setExits(canteen1, null, null, null);
        kitchen1.setExits(null, null, canteen1, null);
        bathroom1.setExits(null, cubicle2, null, hall5);
        gym1.setExits(bathroom1, null, cubicle2, null);
        cubicle2.setExits(null, locker1, gym1, bathroom1);
        locker1.setExits(null, wall1, null, cubicle2);
        wall1.setExits(null, powerbox1, null, locker1);
        powerbox1.setExits(wall1, freedom, null, null);
        cellblock1.setExits(null, hall7, hall5, cell1);
        cell1.setExits(null, cellblock1, null, null);
        hall7.setExits(null, courtyard1, null, cellblock1);
        courtyard1.setExits(null, null, null, hall7);
        this.currentRoom = hall1;
    };
    Game.prototype.printWelcome = function () {
        this.out.printcommand();
        this.out.printcommand("Welcome to Prison Break Ginger Edition!");
        this.out.printcommand("Prison Break Ginger Edition, the story of a lost and locked up ginger.");
        this.out.printcommand("Type 'help' if you need help.");
        this.out.printcommand();
        this.out.printcommand("You are " + this.currentRoom.description);
        this.out.printcommand("And you have been locked for treason.");
        this.out.printcommand("Walk further and find a way out!.");
        this.out.print("Exits: ");
        if (this.currentRoom.northExit != null) {
            this.out.print("north  ");
        }
        if (this.currentRoom.eastExit != null) {
            this.out.print("east  ");
        }
        if (this.currentRoom.southExit != null) {
            this.out.print("south  ");
        }
        if (this.currentRoom.westExit != null) {
            this.out.print("west  ");
        }
        this.out.printcommand();
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.printcommand("Thank you for playing.  Good bye.");
        this.out.printcommand("Hit F5 to restart the game");
    };
    Game.prototype.printError = function (params) {
        this.out.printcommand("I don't know what you mean...");
        this.out.printcommand();
        this.out.printcommand("Your command words are:");
        this.out.printcommand("   go quit help grab");
        return false;
    };
    Game.prototype.grab = function (params) {
        console.log("grabItem uitgevoerd", params);
        this.grabItem.itemloaded = true;
        this.out.printcommand("What would you like to grab?");
        this.out.printcommand("Your options are:");
        this.out.printcommand();
        if (this.currentRoom.location != null) {
            this.out.printcommand("A letter, ");
        }
        this.out.printcommand("grab");
        return false;
    };
    Game.prototype.printHelp = function (params) {
        if (params.length > 0) {
            this.out.printcommand("Help what?");
            return false;
        }
        this.out.printcommand("You are lost. You are alone. You wander");
        this.out.printcommand("around in the prison.");
        this.out.printcommand();
        this.out.printcommand("Your command words are:");
        this.out.printcommand("   go quit help");
        return false;
    };
    Game.prototype.goRoom = function (params) {
        if (params.length == 0) {
            this.out.printcommand("Go where?");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.currentRoom.westExit;
                break;
        }
        if (nextRoom == null) {
            this.out.printcommand("There is no door!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.printcommand("You are" + this.currentRoom.description);
            this.out.print("Exits:");
            if (this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if (this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if (this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if (this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.printcommand();
        }
        return false;
    };
    Game.prototype.quit = function (params) {
        if (params.length > 0) {
            this.out.printcommand("Quit what?");
            return false;
        }
        else {
            return true;
        }
    };
    return Game;
}());
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.game = game;
        this.input = input;
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.printcommand(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        switch (words[0]) {
            case "":
                break;
            case "help":
                wantToQuit = this.game.printHelp(params);
                break;
            case "go":
                wantToQuit = this.game.goRoom(params);
                break;
            case "quit":
                wantToQuit = this.game.quit(params);
                break;
            default:
                wantToQuit = this.game.printError(params);
        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    Printer.prototype.printcommand = function (text) {
        if (text === void 0) { text = ""; }
        this.print("<p class='test'>" + text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    Printer.prototype.printrhumb = function (text) {
        if (text === void 0) { text = ""; }
        this.print("<p class='Rhumb'>" + text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    return Printer;
}());
var Room = (function () {
    function Room(description) {
        this.description = description;
    }
    Room.prototype.setExits = function (north, east, south, west) {
        if (north != null) {
            this.northExit = north;
        }
        if (east != null) {
            this.eastExit = east;
        }
        if (south != null) {
            this.southExit = south;
        }
        if (west != null) {
            this.westExit = west;
        }
    };
    return Room;
}());
