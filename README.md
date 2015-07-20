Developer Quiz
===================

Interactive Quiz using AngularJS UI-Router

Dependencies
------------
 To run this application you must have [npm](https://www.npmjs.com/) and [bower](http://bower.io/) installed locally on your machine. Please refer to their respective sites on how to install. 

## Running the Application ##

**Install Dependencies**

Install the depdencies by running

    npm install && bower install

**Gulp**

 To run this application in development mode you can simply execute the connect gulp task:

    gulp connect
This will launch a local server mounted to the root directory.

To run the production build you can run the gulp build task which will perform a series of tasks for optimizing production assets.

    gulp build

**Without Gulp**

You can also run this without gulp by executing run.sh

    ./run.sh
This will start a Python SimpleHTTPServer after installing the npm/bower dependencies. 
