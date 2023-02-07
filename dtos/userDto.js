module.exports = class UserDto {
    id;
    name;
    email;
    password;
    rang; 
  
    constructor(model) {
      this.id = model.id;
      this.name = model.name;
      this.email = model.email;
      this.password = model.password;
      this.rang = model.rang; 
    }
  };
  