

(function(){
 "use strict";

$('.navbar-brand, .top-scroll a').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	|| location.hostname == this.hostname) {

	var target = $(this.hash);
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	  $('html,body').animate({
		scrollTop: target.offset().top
	  }, 2000);
	  return false;
	}
  }
});
var navbarHeight = $('.main-nav').height();
$('a.btnAbout, a.hire').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	|| location.hostname == this.hostname) {

	var target = $(this.hash);
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	  $('html,body').animate({
		scrollTop: target.offset().top - navbarHeight
	  }, 2000);
	  return false;
	}
  }
});    
//=======================flexslider==============================================

//=====================================================================
       

//=================================menu scroll==========================================
$('.navbar-nav').onePageNav({
       scrollOffset: navbarHeight,
	   scrollSpeed:1000,
        scrollThreshold: 0.25
	});
//========================================= portfolio filter =========================================	


 //============================ function =========================================

imgHover();
lightboxPhoto(); 
winHeight();
barScroll();
  //============================ nav container sticky =========================================

  $(".navbar").sticky({ topSpacing: 0 });
$('ul.nav li a').click(function(){
$('.navbar-inverse .navbar-collapse').removeClass('in')
});
//================= show content ==============================================================
   
})();


$(window).load(function(){
$('#flex-head').flexslider({
animation: "slide",    
slideshow: true
}); 
  navScroll();
$('#filterOptions a').click(function (e) {
    e.preventDefault();
 
    // set active class
    $('#filterOptions a').removeClass('cur');
    $(this).addClass('cur');
 
    // get group name from clicked item
    var groupName = $(this).attr('data-group');
 
    // reshuffle grid
    $grid.shuffle('shuffle', groupName );
	});
    /* initialize shuffle plugin */
    var $grid = $('#grid'),
	$sizer = $grid.find('.shuffle__sizer');
 
    $grid.shuffle({
        itemSelector: '.box', // the selector for the items in the grid
		sizer: $sizer
    });
});

$(window).resize(function(){
navScroll();
winHeight();

});
$(window).scroll(function() {
navScroll();
 }); 
//================================ function ========================================

function imgHover(){
 $('.thumb-img').hover(function(){
     $(this).find('.link-search, .link-chain').fadeIn();
	 $('.link-search').removeClass('fadeOutLeft').addClass('fadeInLeft');
	 $('.link-chain').removeClass('fadeOutRight').addClass('fadeInRight');
    $(this).children('.folio-caption').animate({
    bottom:'0px'
    });
     
 }, function(){
 $(this).find('.link-search, .link-chain').fadeOut();
  $('.link-search').removeClass('fadeInLeft').addClass('fadeOutLeft');
	 $('.link-chain').removeClass('fadeInRight').addClass('fadeOutRight');
    $(this).children('.folio-caption').animate({
    bottom:'-58px'
    });
     
 });   
}

function lightboxPhoto() {
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
    }); 
}
function navScroll(){
 
var top = $(window).scrollTop();

if (top > 3) {
$('.main-nav').fadeIn();

}else {

$('.main-nav').fadeOut();
}

}

function winHeight(){
 //==================================== height header============================
var wHeight = $(window).height();
$('.header').height(wHeight); 
}

    function barScroll(){
     setTimeout(function(){

    $('.progress-bar').each(function() {
        var me = $(this);
        var pe =  $(this).children('.precent-value');
        var perc = me.attr("aria-valuenow");

        var current_perc = 0;

        var progress = setInterval(function() {
            if (current_perc>=perc) {
                clearInterval(progress);
            } else {
                current_perc +=1;
                me.css('width', (current_perc)+'%');
            }

            pe.text((current_perc)+'%');

        },90);
    });
}, 300);

 
     $(document).ready(function() {
        "use strict";

        // UTILITY
        function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
        }
        // END UTILITY

        // COMMANDS
        function clear() {
                terminal.text("");
        }

        function help() {
                terminal.append("COMMANDS: clear, help, list, echo, fortune\n");
        }
  
        function list() {
                terminal.append("MY SKILLS: html5, css3, less, sass, javascript, svg \n- Frameworks: bootstrap, zurb foundation, uikit, \n- CMS: wordpress, kirby, \n- Others: npm, bower, gulp, codekit, git \n- Design: photoshop, illustrator, sketch \n");
        }
    
        function echo(args) {
                var str = args.join(" ");
                terminal.append(str + "\n");
        }

        function fortune() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
                xhr.send(null);

                if (xhr.status === 200) {
                        var fortunes = xhr.responseText.split("%");
                        var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
                        terminal.append(fortune + "\n");
                }
        }
        // END COMMANDS

        var title = $(".title");
        var terminal = $(".terminal");
        var prompt = "➜";
        var path = "~";

        var commandHistory = [];
        var historyIndex = 0;

        var command = "";
        var commands = [{
                        "name": "clear",
                        "function": clear
                }, {
                        "name": "help",
                        "function": help
                }, {
                        "name": "list",
                        "function": list
                }, {
                        "name": "fortune",
                        "function": fortune
                }, {
                        "name": "echo",
                        "function": echo
                }];

        var hintMessage = "Try 'help' or 'list'";

function processCommand() {
        var isValid = false;

        // Create args list by splitting the command
        // by space characters and then shift off the
        // actual command.

        var args = command.split(" ");
        var cmd = args[0];
        args.shift();

        // Iterate through the available commands to find a match.
        // Then call that command and pass in any arguments.
        for (var i = 0; i < commands.length; i++) {
                if (cmd === commands[i].name) {
                        commands[i].function(args);
                        isValid = true;
                        break;
                }
        }

        // No match was found...
        if (!isValid) {
                terminal.append("zsh: command not found: " + command + "\n");
        }

        // Add to command history and clean up.
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        command = "";
}

function displayPrompt() {
        terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
        terminal.append("<span class=\"path\">" + path + "</span> ");
}

// Delete n number of characters from the end of our output
function erase(n) {
        command = command.slice(0, -n);
        terminal.html(terminal.html().slice(0, -n));
}

function clearCommand() {
        if (command.length > 0) {
                erase(command.length);
        }
}

function appendCommand(str) {
        terminal.append(str);
        command += str;
}

/*
    //  Keypress doesn't catch special keys,
    //  so we catch the backspace here and
    //  prevent it from navigating to the previous
    //  page. We also handle arrow keys for command history.
    */

$(document).keydown(function(e) {
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // BACKSPACE
        if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
                if (command !== "") {
                        erase(1);
                }
        }

        // UP or DOWN
        if (keyCode === 38 || keyCode === 40) {
                // Move up or down the history
                if (keyCode === 38) {
                        // UP
                        historyIndex--;
                        if (historyIndex < 0) {
                                historyIndex++;
                        }
                } else if (keyCode === 40) {
                        // DOWN
                        historyIndex++;
                        if (historyIndex > commandHistory.length - 1) {
                                historyIndex--;
                        }
                }

                // Get command
                var cmd = commandHistory[historyIndex];
                if (cmd !== undefined) {
                        clearCommand();
                        appendCommand(cmd);
                }
        }
});
// terminal
$(document).keypress(function(e) {
        // Make sure we get the right event
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // Which key was pressed?
        switch (keyCode) {
                // ENTER
                case 13:
                        {
                                terminal.append("\n");

                                processCommand();
                                displayPrompt();
                                break;
                        }
                default:
                        {
                                appendCommand(String.fromCharCode(keyCode));
                        }
        }
});

// Set the window title
title.text("urname@dvmrt: ~");

// Get the date for our fake last-login
var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and promt
terminal.append("Last login: " + date + "\n" + hintMessage + "\n"); displayPrompt();
});   
    }

    