Ext.define('weatherimages.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            mainView: 'main',
            infoView: 'infoview',
         
            btnInfo: 'main button[action=info]',
            btnBack: 'infoview button[action=back]'            
        },
        control: {

            'btnInfo': {
                tap: 'onInfoBtnTap'
            },
            'btnBack': {
                tap: 'onBackBtnTap'
            },
            'mainView': {
                activeitemchange: 'onCarouselChange'
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log('controller kicked');
        weatherimages.utils.Functions.getGeoLocation();
    }
});
