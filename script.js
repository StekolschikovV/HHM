"use strict";function getFromDB(){$.ajax({url:"data.php?command=get",success:function(a){data=JSON.parse(a),showData()}})}function showData(){$("#commets").empty(),0==data.length?$("#sectionCommets").hide():$("#sectionCommets").show();for(var a=0;a<data.length;a++)$("#commets").prepend('\n            <div class="col-md-4">\n                <article class="card">\n                    <header>'+data[a].name+'</header>\n                    <div class="email">'+data[a].email+"</div>\n                    <footer>"+data[a].comment+"</footer>\n                </article>\n            </div>\n        ")}function setToDB(a,t,e){$.ajax({url:"data.php?command=set&name="+a+"&email="+t+"&comment="+e,success:function(a){getFromDB()}})}var data=[];$("#form").submit(function(a){return setToDB($("#formName").val(),$("#formEmail").val(),$("#formComment").val()),setTimeout(function(){$("#commets > div:first-child ").addClass("animated flipInX")},100),!1}),$(document).ready(function(){getFromDB()});