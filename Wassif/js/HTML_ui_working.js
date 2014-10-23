var retrieved_styles
var styles_array


$(window).load(function() {



    
});//END LOAD FUNCTION




$(document).ready(function() {

    
    $('td').on('click',function(){
        $('td').removeClass('outline_td');
        $(this).addClass('outline_td');
    });
    
    
    $(".tool").click(function () {
        
        
        var tools_header = $("H2", this);
        tools_header = tools_header.text();
        tools_header = tools_header.toLowerCase();

        //open relevant div based on text inside tool panel
        var expanded_section = ('.expanded_pane.' + tools_header);
        $('.expanded_pane').hide('slide', {direction: 'left'}, 1);
        $(expanded_section).show('slide', {direction: 'left'}, 350);

        //convert first letter of string to uppercase and output in h2 tag 
        tools_header = tools_header.charAt(0).toUpperCase() + tools_header.slice(1);;
        $(".expanded_pane > .title").text(tools_header);
        
        
    });//END TOOL CLICK FUNCTION
    
    
    
    ////////Show used elements of clicekd td  in side panel/////////////////

    $("td").click(function () {

        //enable all inputs and radio buttons
        $('input[type="text"]').prop('disabled', false);
        $(".text_align_buttons").css("display", "block");
        
        
        //add class. the edit styles input targets this class
        $('td').removeClass("targeted_styles_for_edit");
        $(this).addClass("targeted_styles_for_edit");
        
        //clear any areas populated with dynamic content
        $('#font_color, #font_size, #font_family, #line_height, #padding').val('');

        //retrieve inline styles from clicked td and covert to HTML
        retrieved_styles = $(this).attr('style'); 
//        $(".expanded_pane > .retrieved_styles").html(retrieved_styles);
    

        //split by colon
//        var styles_array = ["color: #888787", " font-family: Arial, Geneva, sans-serif", " font-size: 13px", " line-height: 18px", ""]
        styles_array = retrieved_styles
        styles_array = styles_array.split(';');
        
        //remove empty arrays
        var newArray = [];
        for (var i = 0; i < styles_array.length; i++) {
            if (styles_array[i] !== "" && styles_array[i] !== " ") {
                newArray.push(styles_array[i]);
            }
        }
        styles_array = newArray;
        
        //remove white space from start and end of array elements
        styles_array = $(styles_array).map(String.prototype.trim);
        
        var array1 = [], array2 = [], array3 = [];

        for(var i=0; i<styles_array.length; i++){
            array1[i] = styles_array[i].split(":")[0];
            array2[i] = styles_array[i].split(":")[1];
        }
        
        //match color in array and output to sidepanel
        for(var i=0; i< array1 .length; i++) {
            if(array1[i] === "color") {
                var font_color = array2[i]
                font_color = font_color.toString();
                $('.font_styles > #font_color').val(font_color)
            }
        }
        
        //match font-size in array and output to sidepanel
        for(var i=0; i< array1 .length; i++) {
            if(array1[i] === "font-size") {
                var font_size = array2[i]
                font_size = font_size.toString();
                $("select#font_size option:contains(" + array2[i] + ")").attr('selected', true);
            }
        }
        
        //match font-family in array and output to sidepanel
        for(var i=0; i< array1 .length; i++) {
            if(array1[i] === "font-family") {
                var font_family = array2[i]
                font_family = font_family.toString();
                $("select#font_family option:contains(" + array2[i] + ")").attr('selected', true);
            }
        }
        
        //match line-height in array and output to sidepanel
        for(var i=0; i< array1 .length; i++) {
            if(array1[i] === "line-height") {
                var line_height = array2[i]
                line_height = line_height.toString();
                $('.font_styles > #line_height').val(line_height)
            }
        }
        
        //match padding in array and output to sidepanel
        for(var i=0; i< array1 .length; i++) {
            if(array1[i] === "padding") {
                var padding = array2[i]
                padding = padding.toString();
                $('.font_styles > #padding').val(padding)
            }
        }


        
    });//END TD FUNCTION

    
    
    /////////////when input styles are edited, update the HTML////////////////
    
    $("#font_family").change(function () {
        var font_family = $('#font_family :selected').text();
        $(".targeted_styles_for_edit").css("font-family", font_family);
    });
    
    $("#font_size").change(function () {
        var font_size = $('#font_size :selected').text();
        $(".targeted_styles_for_edit").css("font-size", font_size);
    });
    
    $('#line_height').on('input', function() {
        var line_height = $('#line_height').val();
        $(".targeted_styles_for_edit").css("line-height", line_height);
        //add mso line height rule to any element with line height changed
        var style = $('.targeted_styles_for_edit').attr('style');
        $(".targeted_styles_for_edit").attr('style', style + ' mso-line-height-rule:exactly;');
    });
    
    $('#padding').on('input', function() {
        var padding = $('#padding').val();
        $(".targeted_styles_for_edit").css("padding", padding);
    });
    
    $('#text_align').on('input', function() {
        var padding = $('#padding').val();
        $(".targeted_styles_for_edit").css("padding", padding);
    });
    
    $("input[name=text_alignment]:radio").change(function () {
        var text_align = $(this).filter(':checked').val();
        $(".targeted_styles_for_edit").css("text-align", text_align);
    });
    
    
    
    
    
    
    
    
});//DOCUMENT READY END


