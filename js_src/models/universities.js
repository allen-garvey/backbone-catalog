
App.University = Backbone.Model.extend({
	parse : function(data, options){
		var obj = data.attributes;
		obj.id = data.id;
		obj.url = obj.url.replace(/^http:/, 'https:'); //make sure url is https for ajax purposes
		return obj;
	}

});

App.UniversitiesCollection = Backbone.Collection.extend({
	model: App.University,
	url: function(){
		if(app.config.env != 'local'){
			return  'https://development.knowledgelinktv.com/knowledgelink_api/universities';
		}
		return 'testdata/universities.json';
	},
	parse: function(response) {
    	//assume if there is no logo url the university is not set up
    	return _.filter(response.data, function(university){return university.attributes.logo_url;});
  	}
});