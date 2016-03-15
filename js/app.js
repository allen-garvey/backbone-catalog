var App = Marionette.Application.extend({
	initialize: function(options) {
		this.addRegions({
  							mainRegion: "#main-content"
						});
  	},
  	start : function(){
  		this.universities = new App.UniversitiesCollection();
		var promise = this.universities.fetch();
		var app = this;
		promise.done(function(){
			console.log(app.universities);
			app.universitiesView = new App.UniversitiesCollectionView({collection: app.universities});
			app.mainRegion.show(app.universitiesView);
		});
		
  		Backbone.history.start();
  		console.log(this.universitiesView);
  		
  	}
});



App.University = Backbone.Model.extend({
	parse : function(data, options){
		var obj = {
			id : data.id,
			name : data.attributes.name,
			blog_id : data.attributes.blog_id,
			url : data.attributes.url,
			logo_url : data.attributes.logo_url,
			site_color : data.attributes.site_color
		};
		return obj;
	}


});

App.UniversitiesCollection = Backbone.Collection.extend({
	initialize: function(){
	},
	model: App.University,
	// url : 'https://development.knowledgelinktv.com/knowledgelink_api/universities',
	url: 'http://localhost/marketing_affiliates/testdata.json',
	parse: function(response) {
    	return response.data;
  	}
});



App.UniversityItemView = Marionette.ItemView.extend({
  tagName : 'li',
  template: function(data){ 
  		var template = _.template($('#university-item').html());
  		return  template({model: data});
	},
	onRender : function(){
		console.log("Item Being rendered");
	}
});


App.UniversitiesCollectionView = Marionette.CollectionView.extend({
	tagName : 'ul',
	childView: App.UniversityItemView,
	onRender : function(){
		console.log("Being rendered");
	}

});



var app = new App();
app.start();





