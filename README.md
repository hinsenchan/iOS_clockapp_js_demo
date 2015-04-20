# What is iOS Clock App JavaScript Demo?

It is a lightweight, web app demonstration of the clock app from iOS written in HTML5, CSS3, JavaScript, and jQuery. The clock app is built on a single web page as a native-style mobile and desktop web app. The web app is modeled after a MVC framework, and components are modularized to ensure its maintainability, reusability, and extendability. The clock app contains a World Clock, Timer, and Stopwatch function. Each of these functions appear as its own page to the user. The state of each clock function can operate individually, so all 3 "pages" may run at the same time. This implementation allows you to move between each function without terminating its previously set states. The World Clock and Timer refreshes its display time every second using JavaScript's setTimeout() function. The Stopwatch refreshes every 1/100 of a second.

Check out the Ember.js version of my clock app for a more advanced version which includes more features!

[https://github.com/hinsenchan/iOS_clockapp_emberjs_demo](https://github.com/hinsenchan/iOS_clockapp_emberjs_demo)

## Mobile Version

![mobile_collage](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/mobile_collage.png)

## Desktop Version

![desktop_collage](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/desktop_collage.png)

# Features

## World Clock

The World Clock will load a list of cities along with its GMT time offsets. The app will update each fixture item in real time and calculate the local offset in the timezone relative to the system time. In this release, the user cannot add or remove cities to and from the list. World Clock will continue to run even if the user switches to the Timer or Stopwatch function.

![img1_worldclock_mobile](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img1_worldclock_mobile.png)

## Timer

The Timer can be running, cancelled, paused, and resumed. Hours and minutes can be used to set the total countdown time. The timer will continue to operate even if the user switches to the World Clock or Stopwatch function.

![img2_timer_mobile](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img2_timer_mobile.png)

### Setup: select time to countdown

![img7_timer_setup](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img7_timer_setup.png)

### Running: timer is counting down

![img8_timer_running](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img8_timer_running.png)

### Paused: timer is paused

![img9_timer_paused](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img9_timer_paused.png)

### Resumed: timer is resumed

![img10_timer_resumed](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img10_timer_resumed.png)

### Cancelled: countdown is cancelled

![img11_timer_cancelled](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img11_timer_cancelled.png)

## Stopwatch

The Stopwatch can be running, stopped, resumed, lapped, and reset. Lap will record the elapsed time since the last lap was recorded. Stopwatch will continue to operate even if the user swithces to the World Clock or Timer function.

![img3_stopwatch_mobile](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img3_stopwatch_mobile.png)

### Running: stopwatch is running

![img12_stopwatch_running](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img12_stopwatch_running.png)

### Stopped: stopwatch is stopped

![img13_stopwatch_stopped](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img13_stopwatch_stopped.png)

### Resumed: stopwatch is resumed

![img14_stopwatch_resumed](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img14_stopwatch_resumed.png)

### Lapped: stopwatch records lap times

![img15_stopwatch_lapped](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img15_stopwatch_lapped.png)

### Reset: stopwatch resets all elapsed time

![img3_stopwatch_mobile](https://github.com/hinsenchan/iOS_clockapp_js_demo/blob/master/readme/img3_stopwatch_mobile.png)

# Reference

* w3Schools: http://www.w3schools.com/

# Credits

This software was developed by Hinsen Chan at Santa Clara University in Summer 2014.
