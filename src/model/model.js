import { instance } from "../model/AI";

//hard coded admin. use the email admin@cs.org to login
export class Admin {
  constructor() {
    this.email = "admin@cs.com";
  }
}

export class Designer {
  constructor(email) {
    this.email = email;
    this.projects = [];
  }
}

export async function getDesigner(userEmail) {
  var data = {};
  data["email"] = userEmail;

  // to work with API gateway, I need to wrap inside a 'body'
  var body = {};
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);
  console.log("sent: " + js);
  instance.post("/login", js).then((response) => {
    console.log(response.data.result);

    if (response.data.status === 200) {
      return response.data.result ?? null;
    } else {
      return null;
    }
  });
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
  constructor(name, description, date, projecttype, goal, designer) {
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
    this.designers = [];
    this.supporters = [];
    this.projects = [];
    //this.date = {};
  }

  addDesigner(email) {
    console.log(email);
    this.designers.push(new Designer(email));
    console.log(this.designers);
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
