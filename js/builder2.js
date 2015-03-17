var allThumbs;
var getThumbNo;
var allTrs;
var currentNumber;
var currentTr;
var linkTXT;
var linkURL;

$(window).load(function() {

    var allThumbs = $('#Thumbs img');

    var n = 0;

    //Remove row on class trigger
    $("#myTable").on('click', '.remove', function(event) {

        //$(this).parent().parent().remove();
        $(this).parent().remove();

    });


    allThumbs.each(function(i) {
        i = i + 1;
        $(this).addClass('Thumbnail_' + i);
    });

    allThumbs.click(function() {

        //split class name to get the current number
        var getThumbNo = this.className.split(/[_\ ]/g);

        //get current number and log it!
        var currentNumber = getThumbNo[1];

        //Remove content HTML
        var removeDiv = '<div class="remove">X</div>';

        //console.log(currentNumber);

        //var currentTr = $('.tableRow_' + currentNumber).html();
        //var currentTr = $('.tableRow_' + currentNumber)[0].outerHTML;
        var currentTr = $('.rbsTable .tableRow_' + currentNumber)[0].outerHTML;

        //$(currentTr).clone().appendTo($('#myTable > tbody')).append('<div class="remove">X</div>');
        $(currentTr).clone().appendTo($('#myTable > tbody')).append('<i class="fa fa-trash-o remove" title="Remove section"></i>');

        //disable all links in build table
        $('#myTable a').click(function(e) {
            e.preventDefault();
            //do other stuff when a click happens
        });

    });


    //add spacer TR
    $('#addSpace').on('click', function() {

        var spacerTr = $('#spacerTr > tbody').html();
        //$(spacerTr).appendTo($('#myTable > tbody')).append('<div class="remove">X</div>');
        $(spacerTr).appendTo($('#myTable > tbody')).append('<i class="fa fa-trash-o remove" ></i>');

    });

    //Render created table
    $("#Result").click(function() {

        //Sort composed table in variable
        var table = $("#myTable").html();

        //console.log(table);

        //Output HTMl in container
        $(".Result").html(table);

        //Remove unwanted elements
        $('.Result .remove').remove();

        $('#Final, #Shadowbox').fadeIn(500);
        //$('#Shadowbox').fadeIn(500);
        
    });
    
    $('#Shadowbox span, #Shadowbox button').on('click', function(){
        $('#Final, #Shadowbox').fadeOut(500);
    });


    jQuery(function($) {

        $('#myTable').bind("DOMSubtreeModified", function() {

            
            //destroy editable area when clicking ok on image inline edit
            $(".froala-popup.froala-image-editor-popup > div.f-image-alt > button").on('click', function() { 

                $('.froala-box').editable("destroy");    
            });
            
            
            // REST OF THE CODE HERE
            //complexEdit: Complex editor needed (wysywig)
            //simpleEdit: Simple editor needed (jeditable)

            //Apply WSYSYWIG Editor to Tr's with text on click
            $('.complexEdit').on('click', function() {
                if (!$(this).text().trim().length) {
                    console.log('no text');
                    //image editor
                    $(this).editable({
                        inlineMode: true,
                        countCharacters: false,
                        placeholder: '',  
                        paragraphy: false,
  
                        // Set image buttons, including the name
                        // of the buttons defined in customImageButtons.
                        imageButtons: ['display', 'align', 'linkImage', 'info', 'removeImage', 'replaceImage', 'close', 'imgStyle'],

                        imageResize: false,
                        
                        // Define custom image buttons.
                        customImageButtons: {
       
                            // Close button with image button.
                            close: {
                                title: 'Close',
                                icon: {
                                    // Recommended size: 40 x 35.
                                    type: 'font',

                                    // src for the image.
                                    value: 'fa fa-times'
                                },
                                callback: function () {
                                    // Close.
                                    $('.froala-box').editable("destroy");

                                    $('td').removeClass('editable');
                                    $("#myTable > tbody").sortable("enable");

                                    // Save HTML in undo stack.
                                    this.saveUndoStep();
                                },
                                refresh: function () { }
                            },
                            
                            imgStyle: {
                                title: 'Image Class',
                                icon: {
                                    type: 'font',
                                    value: 'fa fa-pencil'
                                },
                                callback: function () {
                                    // Do something here ...
                                    var imgClass = $('span.f-img-editor img').attr('class');
                                    
                                    //var imgClassPrompt  = prompt('Write img classes', 'class')
                                    
                                    //imgClassPrompt
                                    
                                    alert(imgClass);
                                },
                                refresh: function () { }
                            }

                        },            
                        
                        
                    })
                    
                    
                    
                    
                } else {
                    //console.log('has text');
                    $(this).addClass('editable');
                    $("#myTable > tbody").sortable("disable");

                    $('.editable').editable({
                        inlineMode: false,
                        beautifyCode: true,
                        paragraphy: false,


                        
                        
                        
                        
                        // Set custom buttons with separator between them. Also include the name
                        // of the buttons  defined in customButtons.
                        buttons: ['bold', 'undo', 'redo' , 'bold', 'sep', 'alert', 'clear', 'createLink', 'html', 'insertImage','close'],
                        
                        // Define custom buttons.
                        customButtons: {
                            // Alert button with Font Awesome icon.
                            alert: {
                                title: 'Alert',
                                icon: {
                                    type: 'font',

                                    // Font Awesome icon class fa fa-*.
                                    value: 'fa fa-info'
                                },
                                callback: function () {
                                    alert ('Hello!')
                                },
                                refresh: function () { }
                            },

                            // Clear HTML button with text icon.
                            clear: {
                                title: 'Clear HTML',
                                icon: {
                                    type: 'txt',
                                    value: 'x'
                                },
                                callback: function () {
                                    this.setHTML('');
                                    this.focus();
                                },
                                refresh: function () { }
                            },

                            // Close button with image button.
                            close: {
                                title: 'close',
                                icon: {
                                    // Recommended size: 40 x 35.
                                    type: 'font',

                                    // src for the image.
                                    value: 'fa fa-times'
                                },
                                callback: function () {
                                    // Close.
                                    $('.editable').editable("destroy");

                                    $('td').removeClass('editable');
                                    $("#myTable > tbody").sortable("enable");

                                    // Save HTML in undo stack.
                                    this.saveUndoStep();
                                },
                                refresh: function () { }
                            }

                        }
                    });

                    $("#closeEditor, .remove").click(function() {

                        $('.editable').editable("destroy");

                        $('td').removeClass('editable');
                        $("#myTable > tbody").sortable("enable");

                    });
                }

            });

            $('.simpleEdit').on('click', function() {

                if (!$(this).text().trim().length) {
                    //console.log('link simpleEdit no text');
                } else {
                    //console.log('link simpleEdit has text');
                    jQuery('#linkEditor input[type="text"]').on('change', function() {
                        // do your stuff
                        var linkTXT = $('.linkTXT').val();
                        var linkURL = $('.linkURL').val();

                        $('#linkEditor .linkUpdate').on('click', function(e) {

                            if (linkTXT != '' && linkURL != '') {
                                console.log(linkTXT);
                                //e.stopPropagation();
                                $('.activeLink').text(linkTXT);
                                $('.activeLink').attr('href', linkURL);
                                
                                //Target MSO comment
                                $(".linkDiv").contents().filter(
                                    function(){
                                        return this.nodeType == 8;
                                    }).each(function(i, e){
                                    $(this)[0].data = replaceHrefWithNew($(this)[0].data,linkURL);           
                                    //console.log(e.nodeValue);                
                                });

                                function replaceHrefWithNew(myMso,newHrefValue)
                                {
                                    var indexOfStartHref=myMso.indexOf("href")+6;
                                    var indexOfEndHref=myMso.indexOf("\"",indexOfStartHref);

                                    var part1=myMso.substring(0,indexOfStartHref);
                                    var part2=myMso.substring(indexOfStartHref,indexOfEndHref);
                                    var part3=myMso.substring(indexOfEndHref);

                                    var newMso= part1 + newHrefValue + part3;
                                    //console.log(newMso);

                                    return newMso;
                                }  
                                
                            } else {
                                //alert('please insert links AND copy at the same time');
                                //$('.linkTXT').val('please insert valid text').css('color','red');
                            }

                        });


                    });


                    $(this).addClass('activeLink');
                    $(this).parent('div').addClass('linkDiv');
                    
                    $("#myTable > tbody").sortable("disable");
                    $('#linkEditor').show();

                    $('#closeEditor, input[value="Done"]').click(function() {
                        $('.activeLink').removeClass('activeLink');
                        $("#myTable > tbody").sortable("enable");
                    });
                }
            });
            
        });

    });
    
    

    
    
    

    //Add classes from dropdown
    $('.ms-drop input').on('change', function() {
        $('.editable').toggleClass($(this).val());
        //$('.editable').html($('.editable').attr('class'));
    });

}); //END LOAD FUNCTION




$(document).ready(function() {

    //var getThumbNo = allThumbs.className.split(/[_\ ]/g);

    console.log("ready!");

    $('#loadHere').load('rbs_FINAL.html');

    $('#Thumbs img').on('click', function() {
        $('#Thumbs img').removeClass('active');
        $(this).addClass('active');
    });


}); //DOCUMENT READY END