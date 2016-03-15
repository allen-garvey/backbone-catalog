var App = Marionette.Application.extend({
	initialize: function(options) {
		this.addRegions({
  							mainRegion: "#main-content",
  							headerRegion: "#universities-header"
						});
  	},
  	start : function(){
  		this.universities = new App.UniversitiesCollection();
		var promise = this.universities.fetch();
		var app = this;
		promise.done(function(){
			app.universitiesView = new App.UniversitiesCollectionView({collection: app.universities});
			app.headerRegion.show(app.universitiesView);
			$('#universities-header').flipster({onItemSwitch: app.universityClicked });
		});
		
  		Backbone.history.start();
  		
  	},
  	universityClicked : function(currentItem, previousItem){

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
	url: 'http://localhost/marketing_affiliates/testdata-universities.json',
	parse: function(response) {
    	return response.data;
  	}
});

App.Course = Backbone.Model.extend({

});

App.CoursesCollection = Backbone.Collection.extend({
	initialize: function(){
	},
	model: App.Course,
	url: 'http://localhost/marketing_affiliates/testdata-courses.json',
	parse: function(response) {
    	var data = _.map(response, function(val, key){ 
    		return val; }
    		);
    	return data;
  	}
});



App.UniversityItemView = Marionette.ItemView.extend({
  tagName : 'li',
  template: function(data){ 
  		var template = _.template($('#university-item').html());
  		return  template({model: data});
	}
});


App.UniversitiesCollectionView = Marionette.CollectionView.extend({
	tagName : 'ul',
	id : 'universities-nav',
	childView: App.UniversityItemView

});


var app = new App();
app.start();





