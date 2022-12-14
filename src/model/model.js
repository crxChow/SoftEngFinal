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
  constructor(email, did, name, password) {
    this.email = email;
    this.did = did;
    this.name = name;
    this.password = password;
    this.projects = [];
  }

  addProject(name, pid, description, date, projecttype, goal, did, currentAmt) {
    this.projects.push(
      new Project(
        name,
        pid,
        description,
        date,
        projecttype,
        goal,
        did,
        currentAmt
      )
    );
  }
}

export class Supporter {
  constructor(email, sid, name, password, budget, pledges, directSupport) {
    this.email = email;
    this.sid = sid;
    this.name = name;
    this.password = password;
    this.budget = budget;
    this.pledges = pledges;
    this.directSupport = directSupport;
  }

  addFunds(amount) {
    this.budget += amount;
  }

  removeFunds(amount) {
    this.budget -= amount;
  }

  //pledges ds and removing money. another time
}

export class Pledge {
  //rewardless constructor
  constructor(name, plid, amount, maxSupport) {
    this.name = name;
    this.plid = plid;
    this.amount = amount;
    this.maxSupport = maxSupport;
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

  addSupporter(sEmail) {
    this.supporter = sEmail;
  }
}

export class DirectSupport {
  constructor(amount, supporter) {
    this.amount = amount;
    this.supporter = supporter;
  }
}

export class Project {
  constructor(
    name,
    pid,
    description,
    date,
    projecttype,
    goal,
    designer,
    curAmount
  ) {
    this.name = name;
    this.pid = pid;
    this.description = description;
    this.date = date;
    this.projecttype = projecttype;
    this.goal = goal;
    this.curAmount = curAmount;
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
    this.projects = [];
    this.pledges = [];
    //this.date = {};
  }

  addDesigner(email, did, Newname, password) {
    console.log(email, did, Newname);
    //this.designers.push(new Designer(email, projects));
    this.designer = new Designer(email, did, Newname, password);
    console.log(this.designer);
  }
  addSupporter(email, sid, Newname, password) {
    console.log(email, sid, Newname);
    //this.designers.push(new Designer(email, projects));
    this.supporter = new Supporter(email, sid, Newname, password);
    console.log(this.supporter);
  }

  addFullSupporter(email, sid, NewName, password, budget, pledges, projects) {
    this.supporter = new Supporter(
      email,
      sid,
      NewName,
      password,
      budget,
      pledges,
      projects
    );
    console.log(this.supporter);
  }

  addProject(name, pid, description, date, projectType, goal, did, curAmount) {
    this.projects.push(
      new Project(
        name,
        pid,
        description,
        date,
        projectType,
        goal,
        did,
        curAmount
      )
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

  addPledge(name, plid, amount, maxSupport, sEmail) {
    let tempPledge = new Pledge(name, plid, amount, maxSupport);
    tempPledge.addSupporter(sEmail);
    this.pledges.push(tempPledge);
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
