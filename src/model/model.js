import axios from "axios";

//hard coded admin. use the email admin@cs.org to login
export class Admin {
  constructor(){
    this.email = "admin@cs.com";
  }
}

export class Designer {
  constructor(email) {
    this.email = email;
    this.projects = [];
  }
}

export class Supporter {
  constructor(email){
    this.email = email;
    this.budget = 2000;
    this.pledges = [];
    this.directSupport = [];
  }

  addFunds(amount){
    this.budget += amount;
  }
  
  //pledges ds and removing money. another time
}

export class Pledge {
  //rewardless constructor
  constructor(name, amount, maxSupport){
    this.name = name;
    this.amount = amount;
    this.maxSupport = maxSupport;
    this.supporters = [];
  }
  //reward constructor
  /*
  constructor(name, amount, reward, maxSupport){
    this.name = name;
    this.amount = amount;
    this.maxSupport = maxSupport;
    this.reward = reward;
    this.supporters = supporters;
  }
  */

  addSupporter(supporter){
    this.supporters.push(supporter);
  }
}

export class DirectSupport {
  constructor(amount, supporter){
    this.amount = amount;
    this.supporter = supporter;
  }
}

export class Project {
  constructor(name, description, date, projecttype, goal, designer){
    this.name = name;
    this.description = description;
    this.date = date;
    this.projecttype = projecttype;
    this.goal = goal; 
    this.funds = 0; 
    this.designer = designer;
    this.pledge = [];
    this.directSupport = [];
    this.isLaunched = false;
    this.isActive = true;
  }

  addPledge(name, amount, maxSupport){
    this.pledge.push(new Pledge(name, amount, maxSupport));
  }

  //pledge with a reward
  addPledgeReward(name, amount, reward, maxSupport){
    this.pledge.push(new Pledge(name, amount, reward, maxSupport));
  }

  addDirectSupport(amount, supporter){
    this.directSupport.push(new DirectSupport(amount, supporter));
    this.funds += amount;
  }

  //not it1
  launchProject(){
    this.isLaunched = true;
  }
}

export default class Model {
  constructor() {
    this.admins = new Admin();
    this.designers = [];
    this.supporters = [];
    this.projects = [];
    //this.date = {};
  }

  addDesigner(email){
    this.designers.push(new Designer(email))
  }
  
  addProject(name, description, date, projecttype, goal, designer){
    this.projects.push(new Project(name, description, date, projecttype, goal, designer));
  }

  // this is for another tiem
  //addSupporter()
}
