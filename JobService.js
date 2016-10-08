function JobService(){
var self = this; 


var jobId =1; 
    function Job(coName,jobTitle, requirements, links, bio, pay,key,img){
        this.coName = coName; 
        this.jobTitle= jobTitle; 
        this.requirements = requirements; 
        this.link= link ; 
        this.bio = bio; 
        this.pay = pay; 
        this.key=key; 
        this.img=img;
        this.exp= Date.now() + 2592900000;
        this.jobId=jobId++;
        this.interested =[];
        this.employable=[];
        


        this.requiredFields =function(){
                if(!link || !bio || !img){
                    return '';
                    }
                 }
    }








}