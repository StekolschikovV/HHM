let data = []

function getFromDB() {
    $.ajax({
        url: 'data.php?command=get',
        success:  (d) => {
            data = JSON.parse(d)
            showData()
     
        }
    });
}

function showData(){
    $( "#commets" ).empty()
    if(data.length == 0)
        $('#sectionCommets').hide()
    else
        $('#sectionCommets').show()
    for(let i = 0; i < data.length; i++){
        $( "#commets" ).prepend( `
            <div class="col-md-4">
                <article class="card">
                    <header>${data[i].name}</header>
                    <div class="email">${data[i].email}</div>
                    <footer>${data[i].comment}</footer>
                </article>
            </div>
        ` )
    }
 

}

function setToDB(name, email, comment) {
    $.ajax({
        url: `data.php?command=set&name=${name}&email=${email}&comment=${comment}`,
        success: function (data) {
            getFromDB()

        }
    });
}

$("#form").submit(function (e) {
    setToDB($('#formName').val(), $('#formEmail').val(), $('#formComment').val())
    setTimeout(() => {
        $('#commets > div:first-child ').addClass('animated flipInX');
    }, 100)
    return false;
});

$( document ).ready(function() {
    getFromDB()
});