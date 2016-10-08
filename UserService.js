
function UserService(){

//////////////////////////////////////
///USER DATA FROM FOO-TANG-CLAN////////
/////////////////////////////////////
    var allUsers = {};

    function Users(name, bio, phone, email, linkedin, porfolio, github, image, employable){
        this.name=name;
        this.bio=bio;
        this.phone=phone;
        this.email=email;
        this.linkedin=linkedin;
        this.portfolio=portfolio;
        this.github=github;
        this.image=image; 
        this.employable=employable;
        this.interests=[];
        this.abilities=[];
        this.id = function(){
            var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
            var d0 = Math.random()*0xffffffff|0;
            var d1 = Math.random()*0xffffffff|0;
            var d2 = Math.random()*0xffffffff|0;
            var d3 = Math.random()*0xffffffff|0;
            return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+ lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+ lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+ lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
        }
    }
    //call addUser to add user to Users, returns their new unique user id
    this.addUser = function(name, bio, phone, email, linkedin, portfolio, github, image, employable) {
        //check for required variables
        if (!name || !phone || !email || !linkedin || !portfolio || !github) {
            return {error: 'required fields not completed'};
        } else {
            var user = Users(name, bio, phone, email, linkedin, portfolio, github, image, employable);
            allUsers.push(user);
            console.log(allUsers);
            return newUser.userId;
        }
    }


        this.updateInfo = function(field, value){
            this[field] = value;
        }

        this.updateEmployable = function(value) {
            this.employable = value;
        }

        this.requiredFields = function(){
            if(!name || !phone || !linkedin || !portfolio || !github || !image){
                return '';
                }
        }

        this.addInterest = function(newInterest) {
            this.interests.push(newInterest);
        }
        
        //this function assumes interests are printed in order from array and index number in array is
        //easiest way to specify which to remove (a delete button next to displayed interest, for example)
        this.removeInterest = function(i) {
            var removedInterest = this.interests.splice(i,1);
            return removedInterest;
        }

        //this is alternate if we want to remove an interest by the text string contained in item
        this.removeInterestByName = function(deleteInterest) {
            for (i = 0; i < this.interests.length; i++) {
                if (this.interests[i] == deleteInterest) {
                    this.interests.splice(i,1);
                    return;
                }
            }    
        }

        this.addAbility = function(newAbility) {
            this.abilities.push(newAbility);
        }
        //this function assumes abilities are printed in order from array and index number in array is
        //easiest way to specify which to remove (delete button in same row as ability, etc.)
        this.removeAbility = function(i) {
            var removedAbility = this.abilities.splice(i,1);
            return removedAbility;
        }
        // this is alternate to remove ability by string contents
        this.removeAbilityByName = function(deleteAbility) {
            for (i = 0; i < this.abilities.length; i++) {
                if (this.abilities[i] == deleteAbility) {
                    this.abilities.splice(i,1);
                    return;
                }
            }    
        }
    }
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////


    this.removeUser = function(id, obj){
        for (var item in obj){
            if(item[userId]==id){
                delete item;
            }
        }   
    }

    this.login = function(username, password){


    }
