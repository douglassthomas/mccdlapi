function getUserCourses() {
    var usercourses = $.ajax({
        url: '/user_courses',
        type: 'POST',
        data: {
            userid: 1
        }
    })

    usercourses.done(function (result) {
        console.log(result);
    })
}

function getDetail(){
    var detail = $.ajax({
        url: '/detail_courses',
        type: 'POST',
        data:{
            courseid: 1
        }
    })

    detail.done(function (result) {
        console.log(result);
    })
}

function assign() {
    var detail = $.ajax({
        url: '/assign_course',
        type: 'POST',
        data:{
            userid: 1,
            courseid: 2
        }
    })

    detail.done(function (result) {
        console.log(result);
    })
}
$(function () {
    console.log('a');
    getUserCourses(); 
    // getDetail();
    // assign(); 
})