// Show routine info
function showRoutine(id) {	
	
	// Store the selected id in session storage to pass data between pages
	sessionStorage.routineId = id;
	
	// Redirect to show routine page
	//$.mobile.changePage("show_routine.html");
		
};


$(document).on('pagecreate', '[data-role="page"]', function(){                
    $('<div>').attr({'id':'mypanel','data-role':'panel'}).appendTo($(this));
    $(document).on('click', '#open-panel', function(){   
         $.mobile.activePage.find('#mypanel').panel("open");       
    });    
});