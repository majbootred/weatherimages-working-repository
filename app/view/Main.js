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
            html: 'incoming weather data ...'
        },{
            itemId: 'mainview',
            cls: 'textview'
        }]
    }
});
 