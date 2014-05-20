Ext.define('weatherimages.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            mainView: 'main',
            infoView: 'infoview',
         
            btnInfo: 'main button[action=info]',
            btnBack: 'main button[action=back]'            
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
    
    /* Make the infoview the active item */
    onInfoBtnTap: function() {
        console.log('Info button tapped');
        this.getMainView().setActiveItem(0);
    },
    /* Make the mainview the active item */
    onBackBtnTap: function() {
        console.log('btnBack button tapped');
        this.getMainView().setActiveItem(1);
    },

     /* Based on the carousel change (drag up or down), it knows
    * to show and hide the back button and update the titlebar
    */
    onCarouselChange: function(carousel, newVal, oldVal) {
        if (newVal.getItemId() == "mainview") {
            this.getBtnBack().hide();
            this.getBtnInfo().show();

            Ext.ComponentQuery.query('titlebar')[0].setTitle('Weather Images');
        } else {
            this.getBtnBack().show();
            this.getBtnInfo().hide();

            Ext.ComponentQuery.query('titlebar')[0].setTitle('Info');
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log('controller kicked');
        this.getMainView().setActiveItem(1);
        weatherimages.utils.Functions.getGeoLocation();
    }
});
