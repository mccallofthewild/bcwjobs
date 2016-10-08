function JobService(){

var userService = new UserService(); 

var self = this; 
var loginState = false;

    function Job(coName,jobTitle, requirements, links, bio, pay,img, password, jobId){
        this.coName = coName; 
        this.jobTitle= jobTitle; 
        this.requirements = requirements; 
        this.link= link ; 
        this.bio = bio; 
        this.pay = pay; 
        this.encryptedKey = sjcl.encrypt(password, randomKey);
        this.img=img;
        this.exp= Date.now() + 2592900000;
        this.date= Date.now() 
        this.interested ={};
        this.employable={};
        this.jobId = function(jobId){
                if(jobId===undefined){
                return Math.floor(Math.random()*9999999999999999) *Math.floor(Math.random()*9999999999999999)*Math.floor(Math.random()*9999999999999999)
            }else{
                return jobId;
                }
            }   


         var randomKey = Math.floor(Math.random()*9999999999999999) *Math.floor(Math.random()*9999999999999999)*Math.floor(Math.random()*9999999999999999)     
}

var AllJobs = {}

this.addJob = function(coName,jobTitle, requirements, links, bio, pay,img, password){
    var job = new Job(coName,jobTitle, requirements, links, bio, pay,img, password)
    AllJobs[job.jobId]= job
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
        loginState = true     
    }else{
        loginState = false;
        prompt('Enter Password for Job:')
        
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
this.removeInterestedUser = function(jobId, userId){
   delete AllJobs[jobId].interested[userService.userId]
}



//ADD A USER THE EMPLOYER WANTS INTO THEIR EMPLOYABLE ARRAY//
this.makeEmployable = function(id, arr){
    AllJobs[jobId].employable[userService.userId]
}






}

