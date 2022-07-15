$(document).ready(()=>{
    const box = $('#box');    
    var check=false,checkEmail=false,checkUser=false;
    $('.clicks').on('click',()=>{
        // console.log(box.hasClass('show'));
        if(check){
            $('#box').removeClass('show');
            check=false;
        }else{
            $('#box').addClass('show');
            check=true;
        }
    });

    $('.user').on('keyup',()=>{
        let n = $('.user').val().trim().length;
        // console.log(n);
        if(n === 0){
            // console.log("in n==0");
            $('#userError').css('visibility','visible');
            checkUser=false;
        }else{
            $('#userError').css('visibility','hidden');
            checkUser=true;
        }
    });

    $('.submission').on('click',()=>{
        if(!checkEmail || !checkUser)return;
        $('#box').removeClass('show');
        check=false;
    });
    
    $('input[type="email"]').on('keyup',(e)=>{
        const source = $('#error');
        let metaData = $('input[type="email"]').val();
        const data = metaData;
        let obj = {
            data : data,
            check: checkEmail
        };
        let isEmail = testValidEmail(obj);
        console.log(isEmail);
        if(isEmail){
            if(checkEmail)return;
            source.removeClass('alert-danger');
            source.html('✔');
            checkEmail = true;
        }else{
            if(!checkEmail)return;
            source.addClass('alert-danger');
            source.html('email should of form 123@abc.xyz');
            checkEmail=false;
        }
    });

    $('.close').on('click',()=>{
        $('#box').removeClass('show');
        check=false;
    });
});

function compare(a,b){
    return a === b;
}
function testValidEmail(obj){
    let data = obj.data;
    let check = obj.check;
    const source=$('input[type="email"]');
    let n = data.length;
    let f=false;
    let pos=0;
    for(i in data){
        if(compare(data[i],'@')){
            f=true;
            pos=i;
            break;
        }
    }
    if(!f){
        if(check){
            source.addClass('alert-danger');
            source.html('email should be of form 123@abc.xyz');
        }
        return false;
    }
    let pos2=0;
    f=false;
    for(i in data){
        if(compare(data[i],'.')){
            f  = true;
            pos2 = i;
            if(pos2>=pos+1)break;
        }
    }
    if(!f || pos2 <= parseInt(pos)+parseInt(1) || compare(data[n-1],'.')){
        if(check){
            source.addClass('alert-danger');
            source.html('email should be of form 123@abc.xyz');
        }
        return false;
    }
    return true;
}