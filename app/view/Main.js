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
            html: '<div class=\"container\"><div class=\"main\" style=\"font-size:1em\">Weather Images App by Marlen Jacob (<a href=\"mailto:maj@bootred.de\">maj@bootred.de</a>). The app uses APIs from <a href=\"http://www.weatheronline.com\">weatheronline.com</a> and <a href=\"http://www.flickr.com\">flickr.com.</a> The weather data are based on the nearest weather checkpoint. The background image is the latest image on flickr.com which was taken in 1 km arround the device. The default background image is my home alley in Hamburg, Germany. <br/> This version is not build for production because the build for production causes error which seems to be a sencha bug <a href=\"http://www.sencha.com/forum/showthread.php?255828-Build-production-error-SyntaxError-Unexpected-identifier\">as discussed here</a>. I used build for package as suggested in this case.</div></div>'
        },{
            itemId: 'mainview',
            cls: 'textview'
        }]
    }
});
 