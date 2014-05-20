Ext.define('weatherimages.view.Main', {
    extend: 'Ext.Carousel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        direction: 'vertical',
        items:
          [
            {
                xtype: 'titlebar',
                cls: 'title',
                docked: 'top',
                title: 'Weather Images',
                items: [{
                   cls: 'back',
                   hidden: true,
                   ui: 'back',
                   action: 'back',
                   align: 'left',
                   text: 'back'
                },
                {
                   iconCls: 'info',
                   action: 'info',
                   ui: 'plain',
                   align: 'right'
                }]
            },
            {
                html: '<div style=\"background-color:#F5DCB3;opacity:0.9;\">Weather Images App by Marlen Jacob.<br/>Used APIs are from <a href=\"http://www.weatheronline.com\">weatheronline.com</a> and <a href=\"http://www.flickr.com\">flickr.com.</a> <br/>The weather data are the latest weather information based on the nearest checkpoint based on your location. <br/>The background image is the latest image on flickr.com taken in 1 km arround you. <br/> The default background image is my home alley in Hamburg, Germany.</div>'
            },{
                itemId: 'mainview',
                cls: 'textview'
            }
        ]
    }
});
 