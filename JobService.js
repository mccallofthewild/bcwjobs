function JobService(){

var userService = new UserService(); 

var self = this; 

    function Job(coName,jobTitle, requirements, links, bio, pay,img, password){
        this.coName = coName; 
        this.jobTitle= jobTitle; 
        this.requirements = requirements; 
        this.link= link ; 
        this.bio = bio; 
        this.pay = pay; 
        this.encryptedKey = sjcl.encrypt(password, randomKey);
        this.img=img;
        this.exp= Date.now() + 2592900000;
        this.jobId=jobId++;
        this.interested ={};
        this.employable={};
        this.id = Math.floor(Math.random()*9999999999999999) *Math.floor(Math.random()*9999999999999999)*Math.floor(Math.random()*9999999999999999)

         var randomKey = Math.floor(Math.random()*9999999999999999) *Math.floor(Math.random()*9999999999999999)*Math.floor(Math.random()*9999999999999999)     
}

var AllJobs = {}

this.addJob = function(coName,jobTitle, requirements, links, bio, pay,img, password){
    var job = new Job(coName,jobTitle, requirements, links, bio, pay,img, password)
    AllJobs[job.id]= job
}



this.requiredFields =function(){
     if(!link || !bio || !img){
       return '';
       }  
    }

this.verifyEmployer = function(password, encryptedKey){
   try{
         sjcl.decrypt(password, encryptedKey)
            save()
            }catch(error){    
            console.log('error')
        alert('INCORRECT PASSWORD: TRY AGAIN')
            }        
       }


this.checkLogin = function(){
    if(getSessionData()){
        return true;        
    }else{
        return false; 
    }
}


this.save = function(id){
          sessionStorage.setItem('_EmployerSessionJSON', JSON.stringify(id));
           }

this.getSessionData = function(){
            var sessionData = sessionStorage.getItem('_EmployerSessionJSON')
            sessionData = JSONparse.parse(sessionData)
            return sessionData; 
            }


//REMOVES A USER THE EMPLOYER DOESN'T WANT//
this.removeInterestedUser = function(id,arr){
    for(var i =0; i <arr.length; i++){
        if(arr[i]==id){
            arr.splice(i,1)
            return arr;
        }
    }
}

this.removeInterestedUser = function(jobId, userId){
   delete AllJobs[jobId].interested[userId]
}







//ADD A USER THE EMPLOYER WANTS INTO THEIR EMPLOYABLE ARRAY//
this.makeEmployable = function(id, arr){
    for(var i = 0; ii<arr.length; i++){
        if(id==arr[i].id){
            employable.push(arr[i])
        }

    }
}



}

