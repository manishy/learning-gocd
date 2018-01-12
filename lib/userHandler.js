class UserHandler {
	constructor () {
		this.users = [];
	}
	addUser(user){
		this.users.push(user);
	}
}
;

module.exports = UserHandler;