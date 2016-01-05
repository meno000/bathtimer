$(document).ready(function(){function e(){var e=[];if($.ajax({url:"https://api.particle.io/v1/devices/"+a+"?access_token="+s,async:!1,type:"GET",dataType:"json",success:function(s){e=s.connected}}),0==e)$(".status").html("<span class='genericon genericon-dot asleep'></span> Asleep").css("cursor","default");else{var t=[];$.ajax({url:"https://api.particle.io/v1/devices/"+a+"/status?access_token="+s,async:!1,type:"GET",dataType:"json",success:function(e){t=e.result}}),"false"==t?($(".status").html("<span class='genericon genericon-dot ready'></span> Ready<span class='shutdown'> (click to sleep)</span></span>").css("cursor","pointer"),$.ajax({url:"https://api.particle.io/v1/devices/"+a+"/battery?access_token="+s,async:!1,type:"GET",dataType:"json",success:function(e){$(".battery").html("Battery: "+Number(Math.round(10*e.result)/10).toFixed(1)+"%")}}),$(".status").click(function(e){$("#timer").hide(100),$(".main section .loading-icon").html('<img src="img/request.gif" /> Sending Data...'),$.ajax({url:"https://api.particle.io/v1/devices/"+a+"/shutdown/",type:"POST",async:!1,data:{args:"true",access_token:s},dataType:"json"}),setTimeout(function(){$(".main section .loading-icon").delay(5e3).html(""),$(".status").delay(5e3).html("<span class='genericon genericon-dot asleep'></span> Asleep").css("cursor","default"),$(".result").removeClass("fail"),$(".result").fadeIn(500).addClass("success").removeClass("fail"),$(".message").html("Timer set to sleep mode. Please wake the device before futher use"),$(".reset-timer").hide()},1e3),setTimeout(function(){$("#timer").fadeIn(500)},6e4),e.preventDefault()})):$(".status").html("<span class='genericon genericon-dot ready'></span> Ready</span>").css("cursor","default")}return e}var s=$("#accesstoken").val(),a=$("#deviceid").val();e(),$("form#timer").removeAttr("action").removeAttr("method"),$("form#access").removeAttr("action").removeAttr("method"),$(".result").hide(),$(".reset-timer").click(function(s){$(".result").hide(),$("#timer").fadeIn(500),e(),s.preventDefault()});var t;$("#access").submit(function(e){t&&t.abort();var s=$(this),a=s.find("input, select, button, textarea"),r=s.serialize();a.prop("disabled",!0),t=$.ajax({url:"setAccess.php",method:"POST",data:r}),t.done(function(){history.replaceState(null,null,"?d="+encodeURIComponent($("#deviceid").val())+"&a="+encodeURIComponent($("#accesstoken").val())),$("#setAccess").hide(),$(".result").removeClass("fail"),$(".result").fadeIn(500).addClass("success").removeClass("fail"),$(".message").html("Device ID and Access ID set.<br/> You may bookmark this URL for later use."),$("#timer").css({display:"block"})}),t.fail(function(){$(".result").removeClass("success"),$(".result").addClass("fail").fadeIn(500),$(".message").html("Oops, an error has occurred, please try again. ")}),t.always(function(){a.prop("disabled",!1)}),e.preventDefault()});var t;$("#timer").submit(function(r){if(!$.isNumeric($("#minutes").val())||0==$("#minutes").val())return $(".result").removeClass("success"),$(".result").addClass("fail").fadeIn(500),$(".message").html("Please enter a numeric value larger than 0"),$(".reset-timer").hide(),!1;if(0==e())return $(".result").removeClass("success"),$(".result").addClass("fail").fadeIn(500),$(".message").html("Please wake the device"),$(".reset-timer").hide(),!1;t&&t.abort();var i=$(this),n=i.find("input, select, button, textarea");i.serialize(),n.prop("disabled",!0),$(".main section .loading-icon").html('<img src="img/request.gif" /> Sending Data...'),$("#timer").hide(),e(),t=$.ajax({url:"https://api.particle.io/v1/devices/"+a+"/settimer",type:"POST",data:{args:$("#minutes").val(),access_token:s},dataType:"json"}),t.done(function(){$(".result").removeClass("fail"),$(".result").fadeIn(500).addClass("success").removeClass("fail"),$(".message").html("Timer successfully set."),$(".reset-timer").show().css("display","block")}),t.fail(function(){$(".result").removeClass("success"),$(".result").addClass("fail").fadeIn(500),$(".message").html("Oops, an error has occurred, please try again."),$(".reset-timer").show().css("display","block")}),t.always(function(){n.prop("disabled",!1)}),e(),$(".main section .loading-icon").html(""),r.preventDefault()}),setInterval(function(){e()},6e4)});