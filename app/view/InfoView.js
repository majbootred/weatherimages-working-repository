Ext.define('weatherimages.view.InfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'infoview',
 
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        //direction: 'vertical',
        items: [
        {
            xtype: 'titlebar',
            cls: 'title',
            docked: 'top',
            title: 'Weather Images',
            items: [{
               cls: 'back',
               //hidden: true,
               ui: 'back',
               action: 'back',
               align: 'left',
               text: 'back'
            }]
        },
        {
            html: 'Hier kommt die App Info rein'
        },{
            itemId: 'infoview',
            cls: 'textview'
        }]
    }
});