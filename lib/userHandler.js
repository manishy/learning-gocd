class UserHandler {
	constructor () {
		this.users = {};
	}
	addUser(user){
		this.users[user.name]=user;
	}
	removeUser(user){
		delete this.users[user.name];
	}
}

module.exports = UserHandler;