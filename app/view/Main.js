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
            html: 'Hier kommt die Wetter Info rein'
        },{
            itemId: 'mainview',
            cls: 'textview'
        }]
    }
});
 