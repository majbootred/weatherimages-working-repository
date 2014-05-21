Ext.define('weatherimages.view.Main', {
    extend: 'Ext.Carousel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        direction: 'vertical',
        items: [
        {
            xtype: 'titlebar',
            cls: 'title',
            docked: 'top',
            title: 'weatherimages',
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
            html: '<div class=\"container\"><div class=\"main\">Weather Images App by Marlen Jacob. The app uses APIs from <a href=\"http://www.weatheronline.com\">weatheronline.com</a> and <a href=\"http://www.flickr.com\">flickr.com.</a> The weather data are based on the nearest weather checkpoint. The background image is the latest image on flickr.com which was taken in 1 km arround the device. The default background image is my home alley in Hamburg, Germany.</div></div>'
        },{
            itemId: 'mainview',
            cls: 'textview'
        }]
    }
});
 