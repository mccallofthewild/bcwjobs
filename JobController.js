function JobController(){
    var jobService = new JobService();
    var jobs = jobService.AllJobs;

    //create new job
    $('.doc-container').on('click', 'btn-create', function(event) {
        $('.doc-container').append(writeCreateJobForm());
    })

    function writeCreateJobForm() {
        template = `<div class="create-job-container"><form id="create-job">
            Company Name:
            <input type="text" name="coName" placeholder="Company Name">
            Job Title:
            <input type="text" name="jobTitle" placeholder="Job Title">
            Pay:
            <input type="text" name="pay" placeholder="Salary">
            Skills Required: 
            <input type="text" name="skill-required" placeholder="Skill Required">
            <button type="button" id='add-skill-btn' class='btn btn-primary'> + Skill </button>
            <ul class="list-group" id="add-skill-list">
            </ul>
            Listing URL:
            <input type="text" name="link" placeholder="Link to Job Posting">
            Description:
            <textarea name="bio" placeholder="Short description of company & position"></textarea>
            Image URL:
            <input type="text" name="img" placeholder="URL to image">
            Create a password to access this listing later:
            <input type="password" name="password">
            <input type="reset">
            <input type="submit" id="create-form-submit">
            </form></div>`
        return template;
    }
    $('#add-skill-btn').on('click', addSkillToList());

    function addSkillToList(){
        var curList = $('#add-skill-list').innerHTML;
        var newSkill = '<li class="list-group-item">' + $('#skill-required').value + '</li>';
        $('#add-skill-list').innerHTML = curList + newSkill;
    }

    $('#create-form-submit').on('click', function(){
        //if skill left in input add to list
        if ($('#skill-required').value) {
            addSkillToList();
        }
        var reqList = $('#add-skill-list').childNodes;
        var reqArr = [];
        for (i = 0; i < reqList.length; i++) {
            reqArr[i] = reqList[i].innerHTML;
        }
        jobService.addJob($('#create-job input[name=coName]'),$('#create-job input[name=jobTitle]'),
            reqArr,$('#create-job input[name=link]'),$('#create-job input[name=bio]'),
            $('#create-job input[name=pay]'),$('#create-job input[name=img]'),$('#create-job input[name=password]'));
    });

    $('.doc-container').on("click", "btn-edit", function (event) {
        $.get('-edit.html', (html) => {
            $('.doc-container').append(html)
        });
    });

    $('.doc-container').on("click", "btn-table", function (event) {
        $.get('-table.html', (html) => {
            $('.doc-container').append(html)
        });
    });

    $('.doc-container').on("click", "btn-swipe", function (event) {
        $.get('-swipe.html', (html) => {
            $('.doc-container').append(html)
        });
    });

    $('.doc-container').on("click", ".btn-create", function (event) {
        $.get('-create.html', (html) => {
            $('.doc-container').append(html)
        });
    });

}

JobController();