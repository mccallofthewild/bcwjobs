
function UserService(){

//////////////////////////////////////
///USER DATA FROM FOO-TANG-CLAN////////
/////////////////////////////////////

var userId = 1
    function Users(name, bio, phone, email, linkedin, porfolio,github, image, employable){
            this.name=name;
            this.bio=bio;
            this.phone=phone;
            this.email=email;
            this.linkedin=linkedin
            this.portfolio=portfolio;
            this.github=github;
            this.image=image; 
            this.employable= boolean;
            this.userId=userId++; 
            this.interested=[];

            this.requiredFields =function(){
                if(!phone || !linkedin || !portfolio || !github || !image){
                    return '';
                    }
    }

    }
/////////////////////////////////
//////////////////////////////////
///////////////////////////////////




this.removeUser = function(id, obj){
    for(var item in obj){
        if(item[userId]==id){
            delete item
            }
        }   
    }

this.login = function(username, password){


}




    }
