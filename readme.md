# Deprecated sample - not maintained anymore (Summer 2016)

# ReactJS w. RefluxJS View&Data Gallery

> A sample web application for View&Data with uni-directional dataflow application architecture inspired by ReactJS [Flux](http://facebook.github.io/react/blog/2014/05/06/flux.html)

> _[RefluxJS](https://github.com/spoike/refluxjs)_

**This sample is now retired, it is not maintained anymore.** It is provided as-is and we discourage using it in your production code.

##Description


A comprehensive sample using Autodesk View & Data API powered by Node.js/MongoDb backend and React frontend

##Setup/Usage Instructions


* Install Node.js
* Run "npm install" command from the project directory to resolve Node dependencies
* Replace the place holder with your own credentials in credentials.js
* The backend expects a locally running MongoDB database to connect to, so you will need to Install and run MongoDB, see [their tutorial] (http://docs.mongodb.org/manual/tutorial/) for instructions.
* You will need to populate your database, check the response from that [REST API](http://viewer.autodesk.io/node/angular-view/api/models) to see how a populated database needs to look like.
* In order to populate your database, you need to upload models through the View & Data WebService. See "Uploading your models to View & Data Web Service" section below.
* Set your database settings in config-server.js acoording to your MongoDb install
* Run the server: "node server.js" from command line
* Connect to server locally using a WebGL-compatible browser: http://localhost:3000/node/angular-view

Uploading your models to View & Data Web Service:

* Apply for your own credentials at http://developer.autodesk.com
* Upload some models to your account and get their URN: see the [View & Data step by step guide](https://developer.autodesk.com/api/view-and-data-api/) for more details.
* Alternatively, use one of our other samples to easily upload your models: [this workflow sample in .net winform application](https://github.com/Developer-Autodesk/workflow-dotnet-winform-view.and.data.api/) if you are using windows or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac.
* Get your model URN from the API or sample and use it to populate your MongoDB database

##Test the Live version

[React Gallery](http://viewer.autodesk.io/node/react-gallery/#/home)


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


##Written by

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)
