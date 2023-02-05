$(document).ready(function(){
    $("#contact-form").validate({
        rules:{
            fname:{
                required:true,
                minlength:3,
                maxlength:20
            },
            lname:{
                required:true,
                minlength:1,
                maxlength:20
            },
            emailaddress:{
                required:true,
                email:true
            },
            phone:{
                
                minlength:10,
                maxlength:13,
                required:true,
                
                
            },
            message:{
                required:true
            }
        },
        messages:{
            phone:{
                required:"Enter phone number"
            }
        }
        
    })
})

