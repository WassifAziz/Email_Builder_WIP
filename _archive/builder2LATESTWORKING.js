var allThumbs;
var getThumbNo;
var allTrs;
var currentNumber;
var currentTr;

$(window).load(function() {

    var allThumbs = $('#Thumbs img');
    
    var n = 0;
    
    /*Code based on http://jsbin.com/ucopun/11/edit*/
    
    //Remove row on class trigger
    $("#myTable").on('click', '.remove', function(event) {

        //$(this).parent().parent().remove();
        $(this).parent().remove();

    });  
    
    
    allThumbs.each(function(i) {
        i = i + 1;
        $(this).addClass('Thumbnail_' + i);
    });

    allThumbs.click(function(){

        //split class to get the current number
        var getThumbNo = this.className.split(/[_\ ]/g);

        //get current number and log it!
        var currentNumber = getThumbNo[1];

        //Remove content HTML
        var removeDiv = '<div class="remove">X</div>';

        //console.log(currentNumber);
 
        //var currentTr = $('.tableRow_' + currentNumber).html();
        var currentTr = $('.tableRow_' + currentNumber)[0].outerHTML;
        
        $(currentTr).appendTo($('#myTable > tbody')).append('<div class="remove">X</div>');
        
        
    });
    
    
    $('#addSpace').on('click', function(){
        
        var spacerTr = $('#spacerTr > tbody').html();
        
        $(spacerTr).appendTo($('#myTable > tbody')).append('<div class="remove">X</div>');
        
    });
    
    
    //Render created table
    $("#Result").click(function() {

        var table = $("#myTable").html();
        
        console.log(table);
        
        

        $(".Result").html(table);

        $('.Result .remove').remove();


    });  
    
});


//var getThumbNo;

$(document).ready(function() {
    
    //var getThumbNo = allThumbs.className.split(/[_\ ]/g);
    
    console.log("ready!");
    
    $('#loadHere').load('rbs_FINAL.html');

    $('#Thumbs img').on('click', function(){
        $('#Thumbs img').removeClass('active');
        $(this).addClass('active');
    });
    
    
    //var allThumbs = $('#Thumbs img');
    
    //buymber all images in the tools section - then link them to their respective TR inside the email template
    
    //var allTrs = $('.rbsTable > tbody').children('tr');
    
    //Get current TR and transform it into a variable
    
    
});