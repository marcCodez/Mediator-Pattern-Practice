// The idea is to be able to have users that can send messages 
// to another single user or to brodcast to the entire chat room
//The chat room is the mediator and the users are the colleagues of the chat room

// Constructor function for user
const User = function(name) {
    this.name = name;
    this.chatroom = null;
}

User.prototype = {
    send: function(message, to) {
        // the this is pretaining to the user
        this.chatroom.send(message, this, to)
    },
    recieve: function(message, from) {
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
}


// Constructor function for chatroom
const Chatroom = function() {
    let users = {}; // list of users

    // need users to register with the chatroom
    // or the colleagues have to register with the mediator

    //since the  return value is an object that has the register() and send() methods , 
    //now that user has access to those methods
    return {
        register: function(user) {
            users[user.name] = user;
            // set user chatroom to the current chatroom
            // assigns user.chatroom(e.g. john.chatroom) equal to 'this' (this is equal to return value of chatroom constructor)
            user.chatroom = this
        },
        send: function(message, from, to) {
            // decide if the message will be sent to the user or entire chatroom
            if(to){
                // Single user message
                to.recieve(message, from);
            } else {
                // loop through the users and do the recieve
                // Mass Message
                for(key in users) {
                    // make sure that its not the user thats sending it
                    if(users[key] !== from) {
                        users[key].recieve(message, from);
                    }
                }

            }

        }
    }
}

// Use the mediator pattern we created

// create instances of user and chatroom
const john = new User('John');
const mark = new User('Mark');
const james = new User('James');

const chatroom = new Chatroom();

// register users
// now the user
chatroom.register(john);
chatroom.register(mark);
chatroom.register(james);

// The chatroom send() function will check to see if a user was passed in to send the message too , 
// and if not will loop through every user in the users{ } and send the message to everyone  that had registered.
// send message to a user
john.send('Hello mark', mark);
// send message to all users besides the sender
james.send('Hi peeeeeps!')