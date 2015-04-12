$(document).ready(function() {
  //set default hash to worldclock app
  window.location.hash = "#worldclock";
  //create a timer app
  var timer = new Timer();
  //create a stopwatch app
  var stopwatch = new Stopwatch();
  
  //handle click event for timer app's start button
  $("#timerStart").click(function(e) {    
    timer.startTimer();
  });
  
  //handle click event for timer app's pause button
  $("#timerPause").click(function(e) {
    timer.pauseTimer();
  });
  
  //handle click event for timer app's resume button
  $("#timerResume").click(function(e) {
    timer.resumeTimer();
  });
  
  //handle click event for timer app's cancel button
  $("#timerCancel").click(function(e) {
    timer.cancelTimer();
  });
    
  //handle click event for stopwatch app's start button
  $("#swStart").click(function(e) {
    stopwatch.startTimer();
  });  
  
  //handle click event for stopwatch app's stop button
  $("#swStop").click(function(e) {
    stopwatch.stopTimer();
  });
  
  //handle click event for stopwatch app's lap button
  $("#swLap").click(function(e) {
    stopwatch.lapTimer();
  });  
  
  //handle click event for stopwatch app's reset button
  $("#swReset").click(function(e) {
    stopwatch.resetTimer();
  });  
});

$(window).on('hashchange', function(e) {
  //store hash from URL
  var hash = window.location.hash;
  //create a world clock app
  var worldclock = new WorldClock(citiesList);
  
  //hide all apps
  $('.content').removeClass('show');

  //show and run worldclock app
  if (hash == "#worldclock") {
    $('#worldclock').addClass('show');
    $('h1.app-label').html("World Clock");
    $('body').css({"background-color": "#ffffff"});
    worldclock.start();
  }
  
  //show timer app
  if (hash == "#timer") {
    $('#timer').addClass('show');
    $('h1.app-label').html("Timer");
  }
  
  //show stopwatch app
  if (hash == "#stopwatch") {
    $('#stopwatch').addClass('show');
    $('h1.app-label').html("Stopwatch");
    $('body').css({"background-color": "#efefef"});
  }
});

//worldclock app
var WorldClock = function(cities) {
  this.self = this;
  this.localOffSet = 0;
  this.currentTime = new Date();
  this.cities = cities;
  
  //start clock app
  this.start = function() {
    this.setLocalOffSet();
    this.runClocks(this);    
  }
  
  //run clock app
  this.runClocks = function(self) {  
    self.refreshClocks();
    self.showClocks();
    setTimeout(function(obj){self.runClocks(obj)}, 1000, self);
  }

  //refresh properties for each city
  this.refreshClocks = function() {
    this.setDay();
    this.setHours();
    this.setIsAhead();
    this.setIsLocalTime();
    
    for (var i = 0; i < this.cities.length; i++) {
      var city = this.cities[i];
      var currentTime = new Date();
      
      if (city.placeholderIsLocalTime) {
        city.placeholderTime = currentTime.toLocaleTimeString();
      }
      else {
        currentTime.setTime(currentTime.getTime()+(city.placeholderHours * 60 * 60 * 1000));
        city.placeholderTime = currentTime.toLocaleTimeString();
      }
      
      var strLen = city.placeholderTime.length;
      city.placeholderTime = 
        city.placeholderTime.substring(0, (strLen-6)) + 
        city.placeholderTime.substring(strLen-3, strLen);
    }
  }
  
  //set local offset for this instance
  this.setLocalOffSet = function() {
    this.localOffSet = this.currentTime.getTimezoneOffset();
  }
  
  //set placeholderDay for each city
  this.setDay = function() {
    for (var i = 0; i < this.cities.length; i++) {
      var city = this.cities[i];
      var cityDate = new Date();
      cityDate.setTime(cityDate.getTime() + (city.placeholderHours * 60 * 60 * 1000));
      if (cityDate.getDay() > this.currentTime.getDay()) {
        city.placeholderDay = "Tomorrow";
      }
      else if (cityDate.getDay() < this.currentTime.getDay()) {
        city.placeholderDay = "Yesterday";
      }
      else {
        city.placeholderDay = "Today";
      }
    }    
  }
  
  //set placeholderHours for each city
  this.setHours = function() {
    for (var i = 0; i < this.cities.length; i++) {
      var city = this.cities[i];      
      city.placeholderHours = (this.localOffSet + city.timezoneOffset) / 60;
    }    
  }
  
  //set placeholderIsAhead for each city
  this.setIsAhead = function() {
    for (var i = 0; i < this.cities.length; i++) {
      var city = this.cities[i];
      
      if ((this.localOffSet + city.timezoneOffset) >= 0) {
        city.placeholderIsAhead = true;
      }
      else if ((this.localOffSet + city.timezoneOffset) < 0) {
        city.placeholderIsAhead = false;
      }
    }
  }
  
  //set placeholderIsLocalTime for each city
  this.setIsLocalTime = function() {
    for (var i = 0; i < this.cities.length; i++) {
      var city = this.cities[i];
      
      if ((this.currentTime.getTimezoneOffset() + city.timezoneOffset) == 0) {
        city.placeholderIsLocalTime = true;
      }
      else {
        city.placeholderIsLocalTime = false;
      }
    }
  }  
  
  //show clock info for each city
  this.showClocks = function() {
    $(".cities-list").html("");
    for (var i = 0; i < this.cities.length; i++) {
      var city = this.cities[i];
      $(".cities-list").append(
        "<div class='city-entry'>" +
          "<span class='city-name'>" + city.cityName + "</span>" +
		  "<span class='city-time'>" + city.placeholderTime + "</span>" +
		  "<br />" +
		  "<span class='city-day'>" + city.placeholderDay + "</span>" +
		  "<span class='city-time-diff' id='cityTimeDiff" + i + "'>, " + city.placeholderHours + " hours " +
              (city.placeholderIsAhead?"ahead":"behind") + "</span>" +
        "</div><!-- city-entry -->"
      )
      
      if (city.placeholderIsLocalTime) {
        $("#cityTimeDiff" + i).html("");
      }
    }
  }
}

//stopwatch app
var Stopwatch = function() {
  this.self = this;
  this.state = "INIT";
  this.startTime;
  this.startLap;
  this.timeElapsed = new Date(0);
  this.lapElapsed = new Date(0);
  this.lap = 1;

  //run stopwatch app
  this.runTimer = function(self) {
    if (self.state == "RUNNING") {
      self.calcElapsedTime();
      self.calcElapsedLap();
      self.refreshElapsedTime();
      self.refreshElapsedLap();
      setTimeout(function(obj){obj.runTimer(obj)}, 10, self);
    }
  }  
    
  //start stopwatch app
  this.startTimer = function() {
    this.startTime = new Date();
    this.startLap = new Date();
    
    if (this.state == "STOPPED") {
      this.startTime.setTime(this.startTime.getTime() - this.timeElapsed.getTime());
      this.startLap.setTime(this.startLap.getTime() - this.lapElapsed.getTime());
    }
    
    this.state = "RUNNING";
    this.showStpWtchStopButton();
    this.showStpWtchLapButton();
    this.runTimer(this.self);
  }
  
  //stop stopwatch app
  this.stopTimer = function() {
    this.state = "STOPPED";
    this.showStpWtchStartButton();
    this.showStpWtchResetButton();
  }
  
  //show last lap time; track next lap time
  this.lapTimer = function() {    
    $(".laps-list").append(
      "<div class='lap'>" +
        "<span class='lap-num'>Lap " + this.lap + "</span>" +
		"<span class='lap-time'>" + this.formattedLap() + "</span>" +
      "</div>"
    );
    
    this.startLap = new Date();
    this.calcElapsedLap();
    this.refreshElapsedLap();
    this.lap++;
  }
  
  //reset stopwatch app
  this.resetTimer = function() {
    this.state = "INIT";
    this.startTime = new Date();
    this.startLap = new Date();
    this.lap = 1;
    this.calcElapsedTime();
    this.calcElapsedLap();
    this.refreshElapsedTime();
    this.refreshElapsedLap();
    this.showStpWtchStartButton
    this.showStpWtchLapButton();
    $(".laps-list").html("");
  }
  
  //calculate time elapsed for stopwatch
  this.calcElapsedTime = function() {
    var currentTime = new Date();
    this.timeElapsed.setTime(currentTime.getTime() - this.startTime.getTime());
  }
  
  //calculate time elapsed for current lap
  this.calcElapsedLap = function() {
    var currentTime = new Date();
    this.lapElapsed.setTime(currentTime.getTime() - this.startLap.getTime());
  }
  
  //refresh elapsed time value used for display
  this.refreshElapsedTime = function() {
    $(".elapsed-time").html(this.formattedTime(this.timeElapsed));
  }
  
  //refresh lap time value used for display
  this.refreshElapsedLap = function() {
    $(".elapsed-lap").html(this.formattedLap(this.lapElapsed));
  }
  
  //format elapsed time for display
  this.formattedTime = function() {
    hundredthSeconds = Math.round(this.timeElapsed.getMilliseconds() / 10);
    seconds = this.timeElapsed.getSeconds();
    minutes = this.timeElapsed.getMinutes();
    
    if (hundredthSeconds < 10) {hundredthSeconds = "0" + hundredthSeconds;}    
    if (seconds < 10) {seconds = "0" + seconds;}    
    if (minutes < 10) {minutes = "0" + minutes;}
    
    return (minutes + ":" + seconds + "." + hundredthSeconds);
  }
  
  //format lap time for display
  this.formattedLap = function() {
    hundredthSeconds = Math.round(this.lapElapsed.getMilliseconds() / 10);
    seconds = this.lapElapsed.getSeconds();
    minutes = this.lapElapsed.getMinutes();
    
    if (hundredthSeconds < 10) {hundredthSeconds = "0" + hundredthSeconds;}    
    if (seconds < 10) {seconds = "0" + seconds;}    
    if (minutes < 10) {minutes = "0" + minutes;}
    
    return (minutes + ":" + seconds + "." + hundredthSeconds);
  }  

  //show start button, hide stop button
  this.showStpWtchStartButton = function() {
    $(".stopwtch-stop").hide();
    $(".stopwtch-start").show();        
  }
  
  //show stop button, hide start button
  this.showStpWtchStopButton = function() {
    $(".stopwtch-start").hide();
    $(".stopwtch-stop").show();
  }  
  
  //show lap button, hide reset button
  this.showStpWtchLapButton = function() {
    if (this.state == "RUNNING") {$(".lap-icon").css({'color': 'black', 'border-color': 'black' });}
    else {$(".lap-icon").css({'color': 'lightgray', 'border-color': 'lightgray' });}
    $(".stopwtch-reset").hide();
    $(".stopwtch-lap").show();    
  }
  
  //show reset button, hide lap button
  this.showStpWtchResetButton = function() {
    $(".stopwtch-lap").hide();
    $(".stopwtch-reset").show();    
  }  
}

//timer app
var Timer = function() {
  this.self = this;
  this.state = "INIT";
  this.timeRemaining = new Date(0);
  
  //set target for timer
  this.setTimer = function() {
    this.timeRemaining.setTime(this.calcInputTime());
  }
  
  //run timer app
  this.runTimer = function (self) {
    if (self.state == "RUNNING") {
      if (self.timeRemaining.getTime() >= 0) {
        self.refreshRemainingTime();
        self.decRemainingTime();
        setTimeout(function(obj){obj.runTimer(obj)}, 1000, this.self);
      }
      else {
        self.cancelTimer();
      }
    }
  }
  
  //start timer app
  this.startTimer = function() {
    this.setTimer();
    
    if (this.timeRemaining.getTime() > 0) {
      this.state = "RUNNING";
      this.showTimerRunState();      
      this.runTimer(this.self);
    }
  }
  
  //cancel timer
  this.cancelTimer = function() {
    if (this.state == "RUNNING" || this.state == "PAUSED") {
      this.state = "INIT";      
      this.timeRemaining.setTime(null);
      this.showTimerInitState();
      this.showTimerPauseButton();
    }
  }
  
  //pause timer
  this.pauseTimer = function() {
    if (this.state == "RUNNING") {
      this.state = "PAUSED";
      this.showTimerResumeButton();
    }
  }
  
  //resume timer
  this.resumeTimer = function() {
    if (this.state == "PAUSED") {
      this.state = "RUNNING";
      this.showTimerPauseButton();
      this.runTimer(this.self);      
    }
  }
  
  //show buttons for initial state
  this.showTimerInitState = function() {
    $(".timer-cancel").hide();
    $(".timer-resume").hide();
    $(".timer-remaining").hide();
    $(".timer-start").show();
    $(".timer-pause").show();
    $(".timer-minutes").show();
    $(".timer-hours").show();
  }
  
  //show buttons for running state
  this.showTimerRunState = function() {
    $(".timer-start").hide();
    $(".timer-minutes").hide();
    $(".timer-hours").hide();
    $(".timer-cancel").show();
    $(".timer-remaining").show();
    this.showTimerPauseButton();
  }
  
  //show resume button, hide pause button
  this.showTimerResumeButton = function() {
    $(".timer-paused").hide();
    $(".timer-resume").show();
  }
  
  //show pause button, hide resume button
  this.showTimerPauseButton = function() {
    if (this.state == "RUNNING") {$(".pause-icon").css({"color": "black", "border-color": "black"});}
    else {$(".pause-icon").css({"color": "lightgray", "border-color": "lightgray"});}
    $(".timer-resume").hide();
    $(".timer-paused").show();
  }
  
  //refresh remaining time value used for display
  this.refreshRemainingTime = function() {
    $(".timer-label").html(this.timeRemaining.toUTCString().split(" ")[4])
  }
    
  //decrement remaining time value from target
  this.decRemainingTime = function() {
    this.timeRemaining.setTime(
      this.timeRemaining.getTime() - 1000
    );
  }
  
  //capture user defined values and set target remaining time
  this.calcInputTime = function() {
    var inputTime = new Date();
  
    inputTime.setTime(
      (this.getInputHours() * 60 * 60 * 1000) + 
      (this.getInputMinutes() * 60 * 1000)
    );
  
    return inputTime;
  }

  //capture user defined hours for target
  this.getInputHours = function() {
    var hours = $("input[name='hours']").val();
    if (!hours) {hours = 0;}
    return hours;
  }

  //capture user defined minutes for target
  this.getInputMinutes = function() {
    var minutes = $("input[name='minutes']").val();
    if (!minutes) {minutes = 0;}
    return minutes;
  }
}

//fixture city values provided by Professor Bergstrom
var citiesList = [
  {
    cityName: 'Cupertino',
    timezoneOffset: -420,
    cityNameId: 'cupertino',
    placeholderTime: '12:47 PM',
    placeholderDay: 'Today', 
    placeholderHours: '0',
    placeholderIsAhead: true,
    placeholderIsLocalTime: true
  },
  {
    cityName: 'Stockholm',
    timezoneOffset: 120,
    cityNameId: 'stockholm',
    placeholderTime: '9:47 PM',
    placeholderDay: 'Today', 
    placeholderHours: '9',
    placeholderIsAhead: true,
    placeholderIsLocalTime: false
  },
  {
    cityName: 'São Paulo',
    timezoneOffset: -180,
    cityNameId: 'sao_paulo',
    placeholderTime: '4:47 PM',
    placeholderDay: 'Today', 
    placeholderHours: '4',
    placeholderIsAhead: true,
    placeholderIsLocalTime: false
    
  },
  {
    cityName: 'Tokyo',
    timezoneOffset: 540,
    cityNameId: 'tokyo',
    placeholderTime: '4:47 AM',
    placeholderDay: 'Tomorrow', 
    placeholderHours: '16',
    placeholderIsAhead: true,
    placeholderIsLocalTime: false
    
  },
  {
    cityName: 'New York',
    timezoneOffset: -240,
    cityNameId: 'new_york',
    placeholderDay: 'Today', 
    placeholderHours: '3',
    placeholderIsAhead: true,
    placeholderIsLocalTime: false
  },
  {
    cityName: 'Bucharest',
    timezoneOffset: 180,
    cityNameId: 'bucharest',
    placeholderTime: '10:47 PM',
    placeholderDay: 'Today', 
    placeholderHours: '10',
    placeholderIsAhead: true,
    placeholderIsLocalTime: false
  }
];