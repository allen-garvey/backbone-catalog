var App = Marionette.Application.extend({
	initialize: function(options) {
  	},
  	start : function(){
  		var universities = new App.UniversitiesCollection();
		universities.fetch();
		console.log(universities);
  		Backbone.history.start();
  	}
});

App.University = Backbone.Model.extend({
	parse : function(data, options){
		var obj = {
			id : data.id,
			blog_id : data.attributes.blog_id,
			url : data.attributes.url,
			logo_url : data.attributes.logo_url,
			site_color : data.attributes.site_color
		};
		return obj;
	}


});

App.UniversitiesCollection = Backbone.Collection.extend({
	model: App.University,
	// url : 'https://development.knowledgelinktv.com/knowledgelink_api/universities',
	url: 'http://localhost/marketing_affiliates/testdata.json',
	parse: function(response) {
    	return response.data;
  	}
});

var app = new App();
app.start();





