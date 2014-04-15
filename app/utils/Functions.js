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
                var place = position.coords.latitude + "," + position.coords.longitude;
                
                console.log(place);
                
                weatherimages.utils.Functions.getWeather(place);
                
                Ext.Viewport.unmask();
            },
            failure: function() {
                Ext.Viewport.unmask();
                Ext.Msg.alert('Timeout', 'Can not retrieve position, please retry.');
            }
        });
    },

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
                    var location = weather.nearest_area[0].region[0].value + " " + weather.nearest_area[0].areaName[0].value + ", " + weather.nearest_area[0].country[0].value;
                    var localObsTime = weather.current_condition[0].localObsDateTime;
                    var cloudCover = weather.current_condition[0].cloudcover + "%";
                    var humidity = weather.current_condition[0].humidity + "%";
                    var tempC = weather.current_condition[0].temp_C + "°C";
                    var visibility = weather.current_condition[0].visibility + "km";
                    var icon = weather.current_condition[0].weatherIconUrl[0].value;

                    weatherimages.utils.Functions.createTemplate(desc,location,localObsTime,cloudCover,humidity,tempC,visibility,icon);


                    console.log("getWeather kicked");
                    console.log(weather);
                    console.log(desc);
                    console.log(location);
                    console.log(localObsTime);
                    console.log(cloudCover);
                    console.log(humidity);
                    console.log(tempC);
                    console.log(visibility);
                    console.log(icon);

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

        output = "<img src=\"" + icon +"\">";    
        output += "<strong>Weather Desc: " + desc +"</strong>";
        output += "<br/> Location: " + location; 
        output += "<br/> Local Observation Time: " + localObsTime;
        output += "<br/> Cloud Cover: " + cloudCover;
        output += "<br/> Humidity: " + humidity;
        output += "<br/> Temp C: " + tempC;
        output += "<br/> Visibility: " + visibility;

        Ext.ComponentQuery.query('main')[0].getActiveItem().setHtml(output);
    }
});