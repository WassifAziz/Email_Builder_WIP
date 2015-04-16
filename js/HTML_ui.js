var retrieved_styles;
var styles_array;
var custom_styles;
var project_name;
var file_url;
var fileExtension;
var file_url;
var imgLinks;
var splitLinks;
var new_class;
var value;
var val_no_yahoo;
var new_class_without_yahoo ;
var customStyleTag;
var custompreviewTag;
var mediaQuery640;
var closeBracket;
var responsiveTable;
var responsiveTablePreview;
var rgb;
var body_color;
var openBody;
var closeBody;

//All metatags and tags needed for an email to work properly in broswer (and to work correctlyif ever reopened with Dreamweaver!)
var metaTags = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml">        <head>        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />          <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />         <meta name="format-detection" content="telephone=no" />                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />                        <meta name="viewport" content="width=device-width">              <title>CHANGE THE TITLE</title>';


project_name = $('#project_name').val();

$(window).load(function() {

});//END LOAD FUNCTION



$(document).ready(function() {

    //convert rgb to hex colour
    function rgb2hex(rgb){
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
    }
    //get project name
    $('#project_name').on('input', function() {
        project_name = $(this).val();
        project_name = project_name.replace(/ /g,"_");
        project_name = project_name.text();

    });

    $('#slider').slider({
        value:12,
        min: 10,
        max: 70,
        step: 1,
        slide: function( event, ui ) {
            $('.targeted_styles_for_edit').css("font-size", ui.value + 'px');
        }
    });

    $('.targeted_styles_for_edit').val($('#slider').slider('value') + ' px');

    $('td').on('click',function(){
        $('td').removeClass('outline_td');
        $(this).addClass('outline_td');
    });

    $(".wastool").click(function () {

        var tools_header =  $(this).attr('name');
        tools_header = tools_header.toLowerCase();


        //open relevant div based on text inside tool panel
        var expanded_section = ('.expanded_pane.' + tools_header);

        $('.expanded_pane').hide();
        $(expanded_section).show();

        //convert first letter of string to uppercase and output in h2 tag 
        tools_header = tools_header.charAt(0).toUpperCase() + tools_header.slice(1);
        $(".expanded_pane > .title").text(tools_header);


    });

    $(".tool").on('click', function () {

        var thisClass = $(this).attr('class');

        var secondClass = thisClass.split(' ');

        var eachClass = secondClass[1];

        var expanded_section = ('.expanded_pane.' + secondClass[1]);

        var tools_header = $("H2", this);
        tools_header = tools_header.text();

        console.log(eachClass);

        $('.expanded_pane').hide();
        $(expanded_section).show();

        tools_header = tools_header.charAt(0).toUpperCase() + tools_header.slice(1);
        $(".expanded_pane > .title").text(tools_header);

    });//END TOOL CLICK FUNCTION



    ////////Show used elements of clicekd td  in side panel/////////////////
    $("td").click(function () {

        console.log('td clicked');

        //enable all inputs and radio buttons
        $('input[type="text"]').prop('disabled', false);
        $(".text_align_buttons").css("display", "block");
        $(".td_Valign_buttons").css("display", "block");


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

        //split array into two, one for styles and one for value
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
                $('.font_styles > #font_color').val(font_color);
                $('#font_color_selector div').css('backgroundColor', '#' + font_color);
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

        //add text to colour selector if no background defined
        if ($('.targeted_styles_for_edit').attr('bgcolor')) {
            var bgcolor = $(this).attr("bgcolor");
            $('#bg_color_selector div').html("&nbsp");
            $('#bg_color_selector div').css('backgroundColor', '#' + bgcolor);
        } else {
            $('#bg_color_selector div').text('no background defined');+
                $('#bg_color_selector div').css('backgroundColor', '#FFFFFF' );
        }

        //retrieve the inline CSS from clicked TD and add to textarea under custom styles
        custom_styles =  retrieved_styles;
        $(".custom_css").val($(custom_styles).val());


        //detect any text input change on custom css textarea and updated styles accordingly
        $(".custom_css").bind('input propertychange', function(){
            var custom_css = $(this).val();
            console.log(custom_css);
            var style = $('.targeted_styles_for_edit').attr('style');
            $(".targeted_styles_for_edit").attr('style', custom_css);
        });

    });//END TD FUNCTION



    //toggle displaying textarea for custom css section
    $(".custom_styles > .heading").click(function() { 
        // assumes element with id='button'
        $(".custom_css").toggle();
        $(this).find(".fa").toggleClass("fa-arrow-up fa-arrow-down");
    });


    ///COLOUR PICKER AREA
    $('#body_color_selector').ColorPicker({
        color: '#ffffff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            //            hex = ("#fefefe");
            //            console.log(hex);
            $('#body_color_selector div').html('&nbsp');
            $('#body_color_selector div').css('backgroundColor', '#' + hex);
            $('#Render, #Final').attr("bgcolor", '#' + hex);
            $('#Render, #Final').css('backgroundColor', '#' + hex);
        }
    });
    
    $('#bg_color_selector').ColorPicker({
        color: '#ffffff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            //            hex = ("#fefefe");
            //            console.log(hex);
            $('#bg_color_selector div').html('&nbsp');
            $('#bg_color_selector div').css('backgroundColor', '#' + hex);
            $('.targeted_styles_for_edit').attr("bgcolor", '#' + hex);
        }
    });

    $('#font_color_selector').ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#bg_color_selector div').html('&nbsp');
            $('#font_color_selector div').css('backgroundColor', '#' + hex);
            $('.targeted_styles_for_edit').css('color', '#' + hex);
        }
    });
        
    //http://wowmotty.blogspot.co.uk/2009/06/convert-jquery-rgb-output-to-hex-color.html
    
    $('#container_table_color_selector').ColorPicker({

        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#bg_color_selector div').html('&nbsp');
            $('#container_table_color_selector div').css('backgroundColor', '#' + hex);
            $('#myTable').attr('bgcolor', '#' + hex);
            $('#myTable').css('backgroundColor', '#' + hex);
            body_color =  hex;
 
        }
        
       
    });

    
    

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
        $(".targeted_styles_for_edit").attr("align", text_align);
    });

    $("input[name=td_vertical_alignment]:radio").change(function () {
        var vertical_align = $(this).filter(':checked').val();
        $(".targeted_styles_for_edit").attr("valign", vertical_align);
    });

    //remove bgcolour if pressed
    $("#bg_removebtn").on('click', function () {   
        $('.targeted_styles_for_edit').removeAttr("bgcolor");
    });
    
    
    
    //OBSERVER (Beta)
    var list = document.getElementById("myTable");

    var MutationObserver = window.MutationObserver ||
        window.WebKitMutationObserver || 
        window.MozMutationObserver;

    var observer = new MutationObserver(function(mutations) {  
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {

                $(".complexEdit").click(function () {

                    console.log('td clicked');

                    //enable all inputs and radio buttons
                    $('input[type="text"]').prop('disabled', false);
                    $(".text_align_buttons").css("display", "block");
                    $(".td_Valign_buttons").css("display", "block");

                    //add class. the edit styles input targets this class
                    $('td').removeClass("targeted_styles_for_edit");
                    $(this).addClass("targeted_styles_for_edit");

                    //clear any areas populated with dynamic content
                    $('#font_color, #font_size, #font_family, #line_height, #padding').val('');

                    //retrieve inline styles from clicked td and covert to HTML
                    retrieved_styles = $(this).attr('style'); 

                    //split by colon
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

                    //split array into two, one for styles and one for value
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
                            $('.font_styles > #font_color').val(font_color);
                            $('#font_color_selector div').css('backgroundColor', '#' + font_color);
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


                    //add text to colour selector if no background defined
                    if ($('.targeted_styles_for_edit').attr('bgcolor')) {
                        var bgcolor = $(this).attr("bgcolor");
                        $('#bg_color_selector div').html("&nbsp");
                        $('#bg_color_selector div').css('backgroundColor', '#' + bgcolor);
                    } else {
                        $('#bg_color_selector div').text('no background defined');+
                            $('#bg_color_selector div').css('backgroundColor', '#FFFFFF' );
                    }

                    //retrieve the inline CSS from clicked TD and add to textarea under custom styles
                    custom_styles =  retrieved_styles;
                    $(".custom_css").text(custom_styles);

                    //detect any text input change on custom css textarea and updated styles accordingly
                    $(".custom_css").bind('input propertychange', function(){
                        var custom_css = $(this).val();
                        console.log(custom_css);
                        var style = $('.targeted_styles_for_edit').attr('style');
                        $(".targeted_styles_for_edit").attr('style', custom_css);
                    });

                });//END TD FUNCTION


            }
        });
    });

    observer.observe(list, {
        attributes: true, 
        childList: true, 
        characterData: true,
        subtree: true
    });

    var element = ("tr");

    var addedClass

    //CSS for HEAD AND TDs
    $('#custom_styles').html("@media only screen and (max-width: 640px) {.table{width:320px!important;} }");
    //when selecting a class on the drop down, add this class to the header tag
    $('#select_class').on("change",function() {  

        /*Native CSS variables*/
        customStyleTag = '<style type="text/css" id="custom_styles">'
        custompreviewTag = '<style type="text/css" id="media_styles">'
        mediaQuery640 = '@media only screen and (max-width: 640px) {'
        closeBracket = '}'
        // used CSS classes
        responsiveTable = 'body[yahoo] .table{width:320px;}'
        responsiveTablePreview = '.table{width:320px!important;}'
        
        $('#custom_styles').html("");
        
        var selectedValues = $("#select_class option:checked").val();
        var val = [];
        var val_no_yahoo = [];
        var selected_styles_class = [], selected_styles_style = [];
        
        $("#select_class option:checked").each(function (i) {
            
            var body_yahoo = "body[yahoo] ";
            var value = $(this).val();
            
            val[i] = body_yahoo + value;
            new_class = val.join(' ');
            
            //for preview styles
            val_no_yahoo[i] = value;
            new_class_without_yahoo = val_no_yahoo.join(' ');
            
            console.log(new_class);
          
            $('#custom_styles').html(new_class); 
            
        });

        var styles_data = $( "#custom_styles" ).html();

        
//        arr =  $.unique(styles_data.split('.'));
//        styles_data = arr.join(".");

        //insert custom styles into media query in head
        $('#custom_styles').replaceWith(

            customStyleTag + mediaQuery640 + responsiveTable + styles_data + closeBracket

        ); 
        
        var preview_styles_data = styles_data
        preview_styles_data.replace('body[yahoo]','');
        
        //onclick mobile preview, add all checked classes into 'media_styles' css
        $('.fa-mobile').on('click', function() {   
        
            $('#media_styles').replaceWith(
                custompreviewTag + responsiveTablePreview + new_class_without_yahoo
            );
        
            //end all styles with important
//            (new_class_without_yahoo).toString().replace(';','!important;');
    
        });
        

    });

    //when clicking desktop or tablet, remove all classes inside 'media_styles'
    $('.fa-tablet, .fa-desktop').on('click', function() {  

        $('#media_styles').replaceWith(
            custompreviewTag
        );
    });
    

    ///DOWNLOAD ALL IMAGES FROM URL
    //http://lifelongprogrammer.blogspot.co.uk/2014/06/using-jszip-to-download-multiple-remote-images.html

    $('#downloadHTML').on('click', function() {   

        function downloadAllImages(imgLinks){
            var zip = new JSZip();
            var deferreds = [];

            //get src of where files have been uploaded
            var imgLinks = $('#Compose img').map(function() { return this.src; }).get();
            //remove duplicates
            imgLinks= $.unique(imgLinks);


            for(var i=0; i<imgLinks.length; i++)
            {
                deferreds.push( addToZip(zip, imgLinks[i], i) );
            }
            $.when.apply(window, deferreds).done(generateZip);


            //split array into file extentions only
            file_url = imgLinks;
            for(var i=0; i<file_url.length; i++)
            {

                file_url[i] = file_url[i].split('/').pop();
                console.log(file_url[i]);
            }



        }
        function generateZip(zip)
        {
            var content = zip.generate({type:"blob"});
            // see FileSaver.js
            saveAs(content, project_name + ".zip");
        }
        function addToZip(zip, imgLink, i ) {
            var deferred = $.Deferred();
            JSZipUtils.getBinaryContent(imgLink, function (err, data) {
                if(err) {
                    alert("Problem happened when download img: " + imgLink);
                    console.erro("Problem happened when download img: " + imgLink);
                    deferred.resolve(zip); // ignore this error: just logging
                    // deferred.reject(zip); // or we may fail the download
                } else {

                    zip.file( file_url[i], data, {binary:true}

                            );

                    //replace src of images in final area
                    var counter=-1  // starts at -1 as spacer counts as picture

                    $("#Final img").each(function() {  
                        counter++;

                        var noImgFolder = $(this).attr('src').split('/');
                        $(this).attr('src', noImgFolder[1]);
                    });   
                  

                    $("#Final").attr('style',''); 
                    //save contents of final area and custom css into zip
                    var email = $('#Final')[0].outerHTML;
                    var tableStyle = $('#custom_styles')[0].outerHTML;
                    var retrieved_body_color = $('#Render').attr('bgcolor');
                    
                    //open body tag
                    openBody = '<body style="width:100% !important; min-height:1000px; color:#000001; background:' + retrieved_body_color + '; font-family:Arial,Helvetica,sans-serif;" alink="#FFFFFF" link="#FFFFFF" bgcolor="' + retrieved_body_color + '" text="#333333" yahoo="fix">';
                    //Close body tag
                    closeBody = '</body></html>'; 

                    
                    var styledEmail = metaTags + tableStyle + openBody + email + closeBody;
                    zip.file("index.html", styledEmail);

                    deferred.resolve(zip);
                }
            });
            return deferred;
        }

        downloadAllImages();

    }); //end download function




});//DOCUMENT READY END


