//import { instance } from "./AI";
//hard coded admin. use the email admin@cs.org to login
export class Admin {
  constructor() {
    this.email = "admin@cs.com";
  }
}
export class Designer {
  /*constructor(email, projects) {
    this.email = email;
    this.projects = projects;
  }*/
  constructor(email, did) {
    this.email = email;
    this.did = did;
    this.projects = [];
  }

  addProject(name, pid, description, date, projecttype, goal, did) {
    this.projects.push(
      new Project(name, pid, description, date, projecttype, goal, did)
    );
  }
}

export class Supporter {
  constructor(email) {
    this.email = email;
    this.budget = 2000;
    this.pledges = [];
    this.directSupport = [];
  }

  addFunds(amount) {
    this.budget += amount;
  }

  //pledges ds and removing money. another time
}

export class Pledge {
  //rewardless constructor
  constructor(name, amount, maxSupport) {
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

  addSupporter(supporter) {
    this.supporters.push(supporter);
  }
}

export class DirectSupport {
  constructor(amount, supporter) {
    this.amount = amount;
    this.supporter = supporter;
  }
}

export class Project {
  constructor(name, pid, description, date, projecttype, goal, designer) {
    this.name = name;
    this.pid = pid;
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

  addPledge(name, amount, maxSupport) {
    this.pledge.push(new Pledge(name, amount, maxSupport));
  }

  //pledge with a reward
  addPledgeReward(name, amount, reward, maxSupport) {
    this.pledge.push(new Pledge(name, amount, reward, maxSupport));
  }

  addDirectSupport(amount, supporter) {
    this.directSupport.push(new DirectSupport(amount, supporter));
    this.funds += amount;
  }

  //not it1
  launchProject() {
    this.isLaunched = true;
  }
}

export default class Model {
  constructor() {
    this.admins = new Admin();
    //this.supporters = [];
    //this.projects = [];
    //this.date = {};
  }

  addDesigner(email, did) {
    console.log(email, did);
    //this.designers.push(new Designer(email, projects));
    this.designer = new Designer(email, did);
    console.log(this.designer);
  }

  addProject(name, description, date, projecttype, goal, designer) {
    this.projects.push(
      new Project(name, description, date, projecttype, goal, designer)
    );
  }

  checkDesigner(email) {
    for (let i = 0; i < this.designers.length; i++) {
      if (this.designers[i].email === email) {
        return true;
      }
    }
    return false;
  }

  // this is for another tiem
  //addSupporter()
}

/*
export async function getDesigner(id){
  /*let instance.post('/registerDesigner').then((response)
    id.addDesigner(response.data.email),

  ) 
  let designers = await localForage.getitem("designer");
  let designer = designers.find((designer) => designer.id === id);
  if(!designer) throw new Error("No Designer Found", id);
  Object.assign(designer, updates);
  return designer;
}
*/
