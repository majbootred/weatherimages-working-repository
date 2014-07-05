Ext.define('weatherimages.utils.Functions', {
    singleton: true,
    //copy and paste these contents into Utils.Functions static class.

    requires: [
            'Ext.data.JsonP',
            'Ext.device.Geolocation',
            'Ext.MessageBox'
    ],


    getGeoLocation: function() {
        
        console.log("getGeoLocation kicked");

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            indicator: true,
            message: 'Detecting location...'
        });

        Ext.device.Geolocation.getCurrentPosition({
            timeout: 5000,
            maximumAge: 10000,
            success: function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude
                var place = latitude + "," + longitude;
                
                console.log(place);
                
                weatherimages.utils.Functions.getWeather(place);

                weatherimages.utils.Functions.getImage(latitude,longitude);

                Ext.Viewport.unmask();
            },
            failure: function() {
                Ext.Viewport.unmask();
                Ext.Msg.alert('Timeout', 'Can not retrieve position, please retry.');
            }
        });
    },

    // weather
    getWeather: function(place) {
        Ext.data.JsonP.request({
            url: '//api.worldweatheronline.com/free/v1/weather.ashx',
            params: {
                key: '6ryebv7zqfdydtfxzzf5t9zz',
                q: place,
                format: 'json',
                num_of_days: 1,
                includelocation: 'yes',
                date: 'today',
                extra: 'localObsTime,isDayTime'
            },


            success: function(result, request) {
                // console.log(result.data);
                Ext.Viewport.unmask();
                try {
                    var weather = result.data;

                    

                    var desc = weather.current_condition[0].weatherDesc[0].value;
                    var location = weather.nearest_area[0].region[0].value + ", " + weather.nearest_area[0].areaName[0].value + ", " + weather.nearest_area[0].country[0].value;
                    var localObsTime = weather.current_condition[0].localObsDateTime;
                    var cloudCover = weather.current_condition[0].cloudcover + "%";
                    var humidity = weather.current_condition[0].humidity + "%";
                    var tempC = weather.current_condition[0].temp_C + "°C";
                    var visibility = weather.current_condition[0].visibility + "km";
                    var icon = weather.current_condition[0].weatherIconUrl[0].value;

                    weatherimages.utils.Functions.createTemplate(desc,location,localObsTime,cloudCover,humidity,tempC,visibility,icon);


                    console.log("getWeather kicked");
                    //console.log(weather);
                    /*console.log(desc);
                    console.log(location);
                    console.log(localObsTime);
                    console.log(cloudCover);
                    console.log(humidity);
                    console.log(tempC);
                    console.log(visibility);
                    console.log(icon);*/

                } catch (e) {
                    if(result.data.error){
                        Ext.Msg.alert("Error", result.data.error[0].msg);
                    } else {
                        Ext.Msg.alert("Oops", e);
                    }
                }
            },
            failure: function(e) {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Oops", "Can not request data from worldweatheronline.com");
            }
        });
    },

    createTemplate: function(desc,location,localObsTime,cloudCover,humidity,tempC,visibility,icon) {

        output = "<div class=\"container\">";
        output += "<div class=\"main\">";
        output += "Location ";
        output += "<span class= \"highlight\">" + location + " </span> <br/>"; 
        output += "Weather Condition ";
        output += "<span class= \"highlight\">" + desc +"</span> and <span class= \"highlight\"> " + tempC +"</span><br/>";  
        output += "Cloud Cover ";
        output += "<span class= \"highlight\">" + cloudCover+ "</span><br/>";
        output += "Humidity ";
        output += "<span class= \"highlight\">" + humidity+ "</span><br/>";
        output += "Visibility ";
        output += "<span class= \"highlight\">" + visibility+ "</span><br/>";
        output += "</div></div>";

        Ext.ComponentQuery.query('main')[0].getActiveItem().setHtml(output);
    },


    // image   
    getImage: function(latitude,longitude){
        console.log(latitude +" "+ longitude);
        Ext.data.JsonP.request({
            url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json',
            callbackKey: 'jsoncallback',
            params: {
                api_key: '19097922acb7e2c6de8b3852845e1299',
                lat: latitude,
                lon: longitude,
                sort: 'date-posted-desc',
                media: 'photos',
                radius: '1',
                extras: 'date_upload,date_taken,description',
                per_page: '1',
                page: '1'
            },

            callback: function(successful, data ) {
               

                Ext.Viewport.unmask();

                try {
                    console.log('++++++++');
                    //console.log(data);
                    console.log('++++++++');


                    var farmid = data.photos.photo[0].farm;
                    var serverid = data.photos.photo[0].server;
                    var id = data.photos.photo[0].id;
                    var secret = data.photos.photo[0].secret;
                    var dateposted = data.photos.photo[0].dateupload;

                    var d = new Date();
                    d.setTime(dateposted);

                    var url = "https://farm"+farmid+".staticflickr.com/"+serverid+"/"+id+"_"+secret+"_b.jpg";

                    document.getElementsByClassName('x-layout-card-item')[0].style.backgroundImage = "url("+url+")";

                    console.log("flickr url: " + url);

                } catch (e) {
                    if(data.stat){
                        Ext.Msg.alert("Error", data.message);
                    } else {
                        Ext.Msg.alert("Oops", e);
                    }
                }
            },

            failure: function(e) {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Oops", "Can not request data from flickr.com");
            }
        });
    }
});