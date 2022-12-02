
var model;
var count;
export function Controller(Model){
    
    if(Model != null){
        model = Model
        return count;
        //console.log(model);
    }
    else{
        //console.log(model);
        count++;
        return model;
    }
    
}