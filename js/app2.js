var data = new Backbone.Collection([
    { "name": "Bill", "lastName": "Smith" }, 
    { "name": "Mary", "lastName": "Johnson" }, 
    { "name": "Sally", "lastName": "Jones" }
]);

var MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    mainRegion: '#main-content'
});



var AppItemView = Backbone.Marionette.ItemView.extend({
    template: function(data){ 
        console.log(data);
        var template = _.template($('#university-item').html());
        return template({model: data});
    }
});

var AppCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: AppItemView,

    collection: data
});

var appCollectionView = new AppCollectionView();


MyApp.mainRegion.show(appCollectionView);
MyApp.start();