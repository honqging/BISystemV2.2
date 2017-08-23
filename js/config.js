var realName = '';

$.ajax({
    type: 'get',
    url: 'http://123.206.134.34:8080/Medicals_war/allRoles',
    dataType: 'json',
    jsonp: 'callback',
    success: function(data){
        setSelected(data);

        if(data.length>0){
            var selectOnChangeUrl = 'http://123.206.134.34:8080/Medicals_war/queryRole?roleName=' + data[0];
            $.ajax({
                type: 'get',
                url: selectOnChangeUrl,
                dataType: 'json',
                jsonp: 'callback',
                success: function(data){
                    setCheckBox(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
        alert(errorThrown);
    }
});

$('#queryUserBtn').click(function(){
    var userName = $('#queryUserName').val();
    var queryUserUrl = 'http://123.206.134.34:8080/Medicals_war/queryUser?userName=' + userName;
    $.ajax({
        type: 'get',
        url: queryUserUrl,
        dataType: 'json',
        jsonp: 'callback',
        success: function(data){
            if(data.result == 0){
                realName = userName;
                $('#userNameDis').text(data.realName);
                $('#selectRole').val(data.roleName);

            //    set checkbox
                setCheckBox(data.modules);

            }else{
                $('#userNameDis').text('');
                alert('该用户名不存在');
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
        }
    })
});


$('#selectRole').change(function(){
    var roleN = getSelected();
    var selectOnChangeUrl = 'http://123.206.134.34:8080/Medicals_war/queryRole?roleName=' + roleN;
    $.ajax({
        type: 'get',
        url: selectOnChangeUrl,
        dataType: 'json',
        jsonp: 'callback',
        success: function(data){
            setCheckBox(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    })
});

$('#updateUserRole').click(function(){
    var userName = $('#userNameDis').text();
    var roleName = $('#selectRole').val();
    console.log(userName);

    if(userName == ''){
        alert('请先查询用户');
    }else{
        $.ajax({
            type: 'get',
            url: 'http://123.206.134.34:8080/Medicals_war/updateUserRole?userName='+realName+'&roleName='+roleName,
            dataType: 'json',
            jsonp: 'callback',
            success: function(data){
                if(data.result == 0){
                    alert('修改成功');
                }else{
                    alert('修改失败');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert(errorThrown);
            }
        })
    }
});

$('#updateRole').click(function(){
    var auth = getCheckBox();
    var roleName = $('#selectRole').val();
    var pData = {
        roleName: roleName,
        authorities: auth
    };
    //console.log(auth);
    $.ajax({
        type: 'post',
        url: 'http://123.206.134.34:8080/Medicals_war/updateRole',
        data: pData,
        dataType: 'json',
        jsonp: 'callback',
        success: function(data){
            alert('修改成功');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
        }
    })

});

$('#addRole').click(function(){
   if($('#addRoleName').val() == ''){
       //console.log('empty');
       alert('角色名称不可为空');
   }else{
       var pData = {
           roleName: $('#addRoleName').val(),
           description: $('#addRoleDesc').val(),
           authorities: getCheckBox()
       };

       $.ajax({
           type: 'post',
           url: 'http://123.206.134.34:8080/Medicals_war/addRole',
           data: pData,
           dataType: 'json',
           jsonp: 'callback',
           success: function(data){
               if(data.result == 0){
                   alert('角色添加成功');
               }else if(data.result == 1){
                   alert('角色名称已存在');
               }
           },
           error: function(XMLHttpRequest, testStatus, errorThrown){
               alert('删除角色失败');
           }
       })
   }
});

$('#deleteRole').click(function(){
    if($('#selectRole').val() == ''){
        alert('不存在该角色');
    }else{
        $.ajax({
            type: 'get',
            //url: ,
            dataType: 'json',
            jsonp: 'callback',
            success: function(data){

            },
            error: function(XMLHttpRequest, testStatus, errorThrown){
                alert('删除角色失败');
            }
        })
    }
});

function getSelected(){
    var selected = $('#selectRole').val();
    return selected;
}

function setSelected(data){
    $('#selectRole').html('');
    for(var i = 0; i<data.length; i++){
        //var option = document.createElement('option');
        //option.val(data[i]);
        $('#selectRole').append('<option>'+data[i]+'</option>');
        //console.log(data[i])
    }
}

function getCheckBox(){
    var chk_value =[];//定义一个数组
    //$('input[name="chk"]:checked').each(function(){
    //    var elem = {'moduleID': $(this).val(),
    //                'authority': 1};
    //    chk_value.push(elem);//将选中的值添加到数组chk_value中
    //});
    // get unchecked checkbox
    //$('input[name="chk"]').not('input:checked').each(function(){
    //    chk_value.push($(this).val());//将选中的值添加到数组chk_value中
    //});
    $('input[name="chk"]').each(function(){
        if(this.checked){
            chk_value.push(1);
        }else{
            chk_value.push(0);
        }
    });
    var groups = chk_value.join(",");
    return groups;
}

function setCheckBox(modules){
    $('input[name="chk"]').each(function(){
        if(this.checked) {
            this.checked = false;
        }
    });
    for(var i = 0; i<modules.length; i++){
        $('input[name="chk"]').each(function(){
            if($(this).val() == modules[i].ModuleName && 1 == modules[i].Authority) {
                this.checked = true;
            }
        });
    }

}