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
            <div class="panel-heading">Post a Job:</div>
            <div class="panel-body">
            <div class="create-job-container"><form class="form-group " id="create-job">
            Company Name:
            <input type="text" value="${job.coName}" required="true" class="form-control" name="coName" placeholder="Company Name">
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
            <input type="password" required="true" class="form-control" name="password">
            <input type="reset" class="btn btn-danger">
            <input type="submit" id="create-form-submit" class="btn btn-success">
            </form></div>
            </div>
            </div>
            </div>
            </div>
`
            console.log(template);
        $('.main-container').html(template);
    }




    function drawToTable(jobs){
        template = '';
        for (var job in jobs) {
            console.log(jobs[job].date)
            template += `<tr>
                            <td>${jobs[job].coName}</td>
                            <td>${jobs[job].title || ""}</td>
                            <td>${new Date(jobs[job].date).toDateString()}</td>
                            <td class="clickable text-right"><button class="btn btn-primary btn-edit" jobid="${jobs[job].jobId}">Edit</button> <button class="btn btn-primary delete-job" jobid="${jobs.jobId}">Delete</button></td>
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
    
    //submits job creation form
    $('body').on('submit', '#create-job', function(event){
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

        jobService.addJob(
            $('#create-job input[name=coName]').val(),
            $('#create-job input[name=jobTitle]').val(),
            reqArr,
            $('#create-job input[name=link]').val(),
            $('#create-job input[name=bio]').val(),

            $('#create-job input[name=pay]').val(),
            $('#create-job input[name=img]').val(),
            $('#create-job input[name=password]').val()
            );
                console.log(jobService.getJobs())
            tableView()

    });

    //edit existing job
    $('body').on("click", ".btn-edit", function (event) {
        
        //insert way to access page here / check credentials
        //first check for job existence by id
console.log("You clicked edit")
        //then check for logged in state
            jobService.checkLogin()
            console.log($(this).attr('jobid'))
        //if not logged in, prompt for password specific to job
        //**********make sure this is fed the id of the specific job to be edited**********
        jobFormView(jobService.getJobs()[$(this).attr('jobid')]);
    });

    $('body').on("click", ".btn-table", function (event) {
        tableView()
    });

    $('.doc-container').on("click", "btn-swipe", function (event) {
        $.get('-cardview.html', (html) => {
            $('.doc-container').html(html)
        });
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
