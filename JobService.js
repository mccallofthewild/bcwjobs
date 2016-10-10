function JobService(){

var userService = new UserService(); 

var self = this;

var _jobSessions = JSON.parse(sessionStorage.getItem('_EmployerSessionJSON')) || {}

var allJobs = JSON.parse(localStorage.getItem('_JobsJSON')) || {}


    function Job(coName,jobTitle, requirements, links, bio, pay, img, password, jobId){
        var randomId = `${Math.floor(Math.random()*9999999999999999)}${Math.floor(Math.random()*9999999999999999)}${Math.floor(Math.random()*9999999999999999)}`;
        var randomKey = `${Math.floor(Math.random()*9999999999999999)}${Math.floor(Math.random()*9999999999999999)}${Math.floor(Math.random()*9999999999999999)}`;    
        this.coName = coName; 
        this.jobTitle= jobTitle; 
        this.requirements = requirements; 
        this.link= links ; 
        this.bio = bio; 
        this.pay = pay; 
        this.encryptedKey = sjcl.encrypt(password, randomKey);
        this.img=img;
        this.exp= Date.now() + 2592900000;
        this.date= Date.now();
        this.interested ={};
        this.employable={};
        this.jobId = (jobId===undefined)? randomId : jobId;

}


this.addJob = function(coName,jobTitle, requirements, links, bio, pay,img, password){
    var job = new Job(coName,jobTitle, requirements, links, bio, pay,img, password)
    allJobs[job.jobId]= job;
    updateLocalStorage();

}

this.updateJob = function(job, coName,jobTitle, requirements, links, bio, pay,img){
    job.coName = coName; 
    job.jobTitle= jobTitle; 
    job.requirements = requirements; 
    job.link= links ; 
    job.bio = bio; 
    job.pay = pay; 
    job.img=img;
    updateLocalStorage()
}

this.destroyJob = function(id){
    delete allJobs[id];
    updateLocalStorage();
}



this.getJobs =function(){
    console.log(allJobs)
    return allJobs;
}

this.requiredFields =function(){
     if(!link || !bio || !img){
       return '';
       }  
    }

this.verifyEmployer = function(password, encryptedKey, id){
   try{
         sjcl.decrypt(password, encryptedKey)
         _jobSessions[id] = true;
         updateSessionStorage();
         alert("NICE! YOU GOT IT RIGHT!");
    }catch(error){
        console.log('error');
        alert('INCORRECT PASSWORD: TRY AGAIN');
        return new Error("NOT RIGHT PASSWORD");
    }        
       }
function updateSessionStorage(){
    sessionStorage.setItem('_EmployerSessionJSON', JSON.stringify(_jobSessions));
}

// FOR TEST DATA WHILE WE DON'T HAVE A DB
function updateLocalStorage(){
    localStorage.setItem('_JobsJSON', JSON.stringify(allJobs));
}

this.isLoggedIn = function(id){
    return !!_jobSessions[id]
}



var getSessionData = function(){
            var sessionData = sessionStorage.getItem('_EmployerSessionJSON')
            sessionData = JSON.parse(sessionData)
            return sessionData; 
            }


//REMOVES A USER THE EMPLOYER DOESN'T WANT//
this.removeInterestedUser = function(jobId, userId){
   delete allJobs[jobId].interested[userService.userId]
}



//ADD A USER THE EMPLOYER WANTS INTO THEIR EMPLOYABLE ARRAY//
this.makeEmployable = function(id, arr){
 allJobs[jobId].employable[userService.userId]
}






}

