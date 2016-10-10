JobController();
function JobController(){
    var jobService = new JobService();
    var jobs = jobService.AllJobs;

    $(document).ready(function(){tableView()})

    //creates html form for job creation
    function jobFormView(job) {
        function propOrBlank(prop){return job? job[prop] : ""}
        template = `<div class="form-page-container">
            <div class="job-form-container">
            <div class="panel panel-primary">
            <div class="panel-heading"><h4>Post a Job:<h4></div>
            <div class="panel-body">
            <div class="job-form-container">
            <form class="form-group " jobid="${propOrBlank("jobId")}" id="job-form">
            Company Name:
            <input type="text" value="${propOrBlank("coName")}" required="true" class="form-control" name="coName" placeholder="Company Name">
            Job Title:
            <input type="text" value='${propOrBlank("jobTitle")}' required="true" class="form-control" name="jobTitle" placeholder="Job Title">
            Pay:
            <input type="text" value='${propOrBlank("pay")}' class="form-control" name="pay" placeholder="Salary">
            Skills Required: 
            <input type="text" value='${propOrBlank("skills")}' class="form-control" name="skill-required" placeholder="Skill Required">
            <button type="button" id='add-skill-btn' class='btn btn-primary'> + Skill </button>
            <ul class="list-group" id="add-skill-list">${
                   !job? "" : job.requirements.map(function(requirement){
                       return `<li class="list-group-item">${requirement}</li>`;
                    }).join()
            }
            </ul>
            Listing URL:
            <input type="text" value='${propOrBlank("link")}' class="form-control" name="link" placeholder="Link to Job Posting">
            Description:
            <textarea name="bio" value='${propOrBlank("bio")}' class="form-control" placeholder="Short description of company & position"></textarea>
            Image URL:
            <input type="text" value='${propOrBlank("img")}' class="form-control" name="img" placeholder="URL to image">
            Create a password to access this listing later:
            ${job? '' : '<input type="password" required="true" class="form-control" name="password">'}
            <!-- <input type="reset" class="btn btn-primary"> -->
            <input type="submit" id="create-form-submit" class="btn btn-primary">
            </form></div>
            </div>
            </div>
            </div>
            </div>
`
        $('.main-container').html(template);
    }




    function drawToTable(jobs){
        template = '';
        for (var job in jobs) {
            console.log(jobs[job].date)
            template += `<tr>
                            <td>${jobs[job].coName}</td>
                            <td>${jobs[job].jobTitle || ""}</td>
                            <td>${new Date(jobs[job].date).toDateString()}</td>
                            <td class="clickable text-right"><button class="btn btn-primary btn-edit" jobid="${jobs[job].jobId}">Edit</button> <button class="btn btn-primary btn-delete" jobid="${jobs[job].jobId}">Delete</button></td>
                        </tr>`
        }
        return template;
    }
    function tableView(){
        $.get('-tableview.html', (html) => {
            $('.main-container').html(html);
                var template = drawToTable(jobService.getJobs());
                $('table').append(template);
        });
    }

        //adds skill to list
    $('#add-skill-btn').on('click', addSkillToList());

    function addSkillToList(){
        var curList = $('#add-skill-list').innerHTML;
        var newSkill = '<li class="list-group-item">' + $('#skill-required').value + '</li>';
        $('#add-skill-list').innerHTML = curList + newSkill;
    }







// EVENT LISTENERS 






    //create new job
    $('body').on('click', '.btn-create', function(event) {
        jobFormView();
    });
    
    //submits job creation/edit form
    $('body').on('submit', '#job-form', function(event){
        event.preventDefault()
        console.log("LISTENING")
        //if skill left in input add to list
        if ($('#skill-required').value) {
            addSkillToList();
        }
        //loop through list to make array of required skills
        var reqList = $('#add-skill-list').childNodes || []
        var reqArr = [];
        for (i = 0; i < reqList.length; i++) {
            reqArr[i] = reqList[i].innerHTML;
        }
        var jobId = $(this).attr('jobid')
        if(jobId != ""){
            jobService.updateJob(
            jobService.getJobs()[jobId],
            $('#job-form input[name=coName]').val(),
            $('#job-form input[name=jobTitle]').val(),
            reqArr,
            $('#job-form input[name=link]').val(),
            $('#job-form input[name=bio]').val(),

            $('#job-form input[name=pay]').val(),
            $('#job-form input[name=img]').val()
            );
        }else{
            jobService.addJob(
            $('#job-form input[name=coName]').val(),
            $('#job-form input[name=jobTitle]').val(),
            reqArr,
            $('#job-form input[name=link]').val(),
            $('#job-form input[name=bio]').val(),

            $('#job-form input[name=pay]').val(),
            $('#job-form input[name=img]').val(),
            $('#job-form input[name=password]').val()
            );
        }
            console.log(jobService.getJobs())
            tableView()

    });

    //edit existing job
    $('body').on("click", ".btn-edit", function (event) {
        var jobId = $(this).attr('jobid');
        var thisjob = jobService.getJobs()[jobId]
        //insert way to access page here / check credentials
        //first check for job existence by id
        jobService.verifyEmployer(prompt("Enter password to edit."), thisjob.encryptedKey, jobId)
        console.log("You clicked edit")
        //then check for logged in state
        if(jobService.isLoggedIn(jobId)){
            jobFormView(thisjob)
        }
            console.log($(this).attr('jobid'))
        //if not logged in, prompt for password specific to job
        //**********make sure this is fed the id of the specific job to be edited**********
    });

    $('body').on("click", ".btn-delete", function (event) {
        var jobId = $(this).attr('jobid');
        var thisjob = jobService.getJobs()[jobId]
        //insert way to access page here / check credentials
        //first check for job existence by id
        jobService.verifyEmployer(prompt("Enter password to delete this job."), thisjob.encryptedKey, jobId)
        console.log("You clicked delete")
        //then check for logged in state
        if(jobService.isLoggedIn(jobId)){
            if(confirm("Are you sure you want to delete this job?")){
                jobService.destroyJob(jobId)
                tableView()
            }
        }
        //if not logged in, prompt for password specific to job
        //**********make sure this is fed the id of the specific job to be edited**********
    });
    

    $('body').on("click", ".btn-table", function (event) {
        tableView()
    });

    $('body').on("click", ".btn-swipe", function (event) {
        $.get('-cardview.html', (html) => {
            $('.main-container').html(html)
        });
    });


    $('body').on('click', '.nav li', function(event){
        $('.nav li').removeClass('active');
        $(this).addClass('active')
    })

    $('body').on('click', '.fa-check', function(event){
        $(this).parents('.card').css({'transform' : 'translateX(300%)rotate(72deg)'})
    });

    $('body').on('click', '.fa-times', function(event){
        $(this).parents('.card').css({'transform' : 'translateX(-300%)rotate(-72deg)'})
    });

}











    // function drawExistingForEdit(jobId) {
    //     var thisJob = jobs[jobId];
    //     var reqHTML = '';
    //     for (i = 0; i < thisJob.requirements.length; i++) {
    //         reqHTML += '<li class="list-group-item">' + thisJob.requirements[i] + '<li>';
    //     }
    //     template = `<div class="edit-job-container"><form id="edit-job">
    //         Company Name:
    //         <input type="text" name="coName" value="${thisJob.coName}">
    //         Job Title:
    //         <input type="text" name="jobTitle" value="${thisJob.jobTitle}">
    //         Pay:
    //         <input type="text" name="pay" value="${thisJob.pay}">
    //         Skills Required: 
    //         <input type="text" name="skill-required" placeholder="Skill Required">
    //         <button type="button" id='add-skill-btn' class='btn btn-primary'> + Skill </button>
    //         <ul class="list-group" id="add-skill-list">
    //         ${reqHTML}
    //         </ul>
    //         Listing URL:
    //         <input type="text" name="link" value="${thisJob.link}">
    //         Description:
    //         <textarea name="bio">${thisJob.bio}</textarea>
    //         Image URL:
    //         <input type="text" name="img" value="${thisJob.img}">
    //         <input type="submit" id="edit-form-submit">
    //         </form></div>`
    //     return template;        
    // }
