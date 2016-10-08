function JobController(){
    var jobService = new JobService();
    var jobs = jobService.AllJobs;

    //create new job
    $('.btn-create').on('click', function(event) {
        writeCreateJobForm();
    })
    //creates html form for job creation
    function writeCreateJobForm() {
        template = `<div class="create-job-container"><form class="form-group" id="create-job">
            Company Name:
            <input type="text" class="form-control" name="coName" placeholder="Company Name">
            Job Title:
            <input type="text" class="form-control" name="jobTitle" placeholder="Job Title">
            Pay:
            <input type="text" class="form-control" name="pay" placeholder="Salary">
            Skills Required: 
            <input type="text" class="form-control" name="skill-required" placeholder="Skill Required">
            <button type="button" id='add-skill-btn' class='btn btn-primary'> + Skill </button>
            <ul class="list-group" id="add-skill-list">
            </ul>
            Listing URL:
            <input type="text" class="form-control" name="link" placeholder="Link to Job Posting">
            Description:
            <textarea name="bio" class="form-control" placeholder="Short description of company & position"></textarea>
            Image URL:
            <input type="text" class="form-control" name="img" placeholder="URL to image">
            Create a password to access this listing later:
            <input type="password" class="form-control" name="password">
            <input type="reset" class="btn btn-danger">
            <input type="submit" id="create-form-submit" class="btn btn-success">
            </form></div>`
            console.log(template);
        $('.doc-container').html(template);
    }

    //adds skill to list
    $('#add-skill-btn').on('click', addSkillToList());

    function addSkillToList(){
        var curList = $('#add-skill-list').innerHTML;
        var newSkill = '<li class="list-group-item">' + $('#skill-required').value + '</li>';
        $('#add-skill-list').innerHTML = curList + newSkill;
    }

    //submits job creation form
    $('#create-form-submit').on('click', function(){
        //if skill left in input add to list
        if ($('#skill-required').value) {
            addSkillToList();
        }
        //loop through list to make array of required skills
        var reqList = $('#add-skill-list').childNodes;
        var reqArr = [];
        for (i = 0; i < reqList.length; i++) {
            reqArr[i] = reqList[i].innerHTML;
        }
        jobService.addJob($('#create-job input[name=coName]'),$('#create-job input[name=jobTitle]'),
            reqArr,$('#create-job input[name=link]'),$('#create-job input[name=bio]'),
            $('#create-job input[name=pay]'),$('#create-job input[name=img]'),$('#create-job input[name=password]'));
    });

    //edit existing job
    $('.doc-container').on("click", "btn-edit", function (event) {
        //insert way to access page here / check credentials
        //first check for job existence by id
        //then check for logged in state
        //if not logged in, prompt for password specific to job
        //**********make sure this is fed the id of the specific job to be edited**********
        drawExistingForEdit(this.id);
    });

    function drawExistingForEdit(jobId) {
        var thisJob = jobs[jobId];
        var reqHTML = '';
        for (i = 0; i < thisJob.requirements.length; i++) {
            reqHTML += '<li class="list-group-item">' + thisJob.requirements[i] + '<li>';
        }
        template = `<div class="edit-job-container"><form id="edit-job">
            Company Name:
            <input type="text" name="coName" value="${thisJob.coName}">
            Job Title:
            <input type="text" name="jobTitle" value="${thisJob.jobTitle}">
            Pay:
            <input type="text" name="pay" value="${thisJob.pay}">
            Skills Required: 
            <input type="text" name="skill-required" placeholder="Skill Required">
            <button type="button" id='add-skill-btn' class='btn btn-primary'> + Skill </button>
            <ul class="list-group" id="add-skill-list">
            ${reqHTML}
            </ul>
            Listing URL:
            <input type="text" name="link" value="${thisJob.link}">
            Description:
            <textarea name="bio">${thisJob.bio}</textarea>
            Image URL:
            <input type="text" name="img" value="${thisJob.img}">
            <input type="submit" id="edit-form-submit">
            </form></div>`
        return template;        
    }

    function drawToTable() {
        template = '';
        for (var job in jobs) {
            template += `<tr>
                            <td>${jobs.coName}</td>
                            <td>${jobs.title}</td>
                            <td>${jobs.date}</td>
                            <td class="clickable"><button class="btn btn-primary">Edit</button> <button class="btn btn-primary">Delete</button></td>
                        </tr>`
        }
    }

    $('.doc-container').on("click", "btn-table", function (event) {
        $.get('-tableview.html', (html) => {
            $('.doc-container').append(html)
        });
    });

    $('.doc-container').on("click", "btn-swipe", function (event) {
        $.get('-cardview.html', (html) => {
            $('.doc-container').append(html)
        });
    });

}

JobController();