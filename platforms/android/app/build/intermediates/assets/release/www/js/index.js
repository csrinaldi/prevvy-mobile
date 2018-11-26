/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    options: {
        quality: 100,
        correctOrientation: true,
        destinationType: Camera.DestinationType.FILE_URI
    },


    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    onClick: function (event) {

        if (!navigator.camera) {
            alert("Camera API not supported", "Error");
            return;
        }

        navigator.camera.getPicture(app.onCameraSuccess, app.onCameraFail, app.options);
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        var statusOCR = "OCR ";

        try {
            if (textocr) {
                $("#ocr").text(statusOCR + " ONLINE");
                $("#recognizerAction").css({ 'display': "block" });
                $("#recognizerAction").click( function(event) {
                    app.onClick(event);
                });
            } else {
                $("#ocr").text(statusOCR + " OFFLINE");
            }
        }catch(error){
            alert(error);
        }

        try {
            if (TesseractPlugin) {
                $("#tesseract").text(statusOCR + " ONLINE");
               /* TesseractPlugin.loadLanguage("eng", function(response) {
                    $("#tesseract").text(statusOCR + " TESSERACT ONLINE");
                    $("#recognizerTesseractAction").css({ 'display': "block" });
                    $("#recognizerTesseractAction").click( function(event) {
                        navigator.camera.getPicture(app.onCameraTesseractSuccess, app.onCameraFail, app.options);                     
                    });
                 }, function(reason) {
                    $("#tesseract").text(statusOCR + " OFFLINE");
                    alert('Error on loading OCR file for your language. ' + reason);
                 });*/
                
            } else {
                $("#tesseract").text(statusOCR + " OFFLINE");
            }
        }catch(error){
            alert(error);
        }

        console.log('Received Event: ' + id);
    },

    onCameraSuccess: function (imgData) {
        textocr.recText(0, 3, imgData, app.onOCRSuccess, app.onOCRFail);
    },

    /*onCameraTesseractSuccess: function(imgData) {
        TesseractPlugin.recognizeText(imgData, "eng", function(recognizedText) {
            $(".textTesseractRecognized").text(recognizedText);
          }, function(reason) {
                alert('Error on recognizing text from image. ' + reason);
          });
    },*/

    onCameraFail: function (error) {
        alert(error, "Error");
    },

    onOCRSuccess: function (text) {

        $(".textRecognized").text(text);
        

    },

    onOCRFail: function (error) {
        alert(error, "Error");
    }

};
