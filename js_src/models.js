
App.University = Backbone.Model.extend({
	parse : function(data, options){
		var obj = data.attributes;
		obj.id = data.id;
		obj.url = obj.url.replace(/^http:/, 'https:'); //make sure url is https for ajax purposes
		return obj;
	}

});

App.UniversitiesCollection = Backbone.Collection.extend({
	initialize: function(){
	},
	model: App.University,
	url: function(){
		if(app.config.env != 'local'){
			return  'https://development.knowledgelinktv.com/knowledgelink_api/universities';
		}
		return 'testdata-universities.json';
	},
	parse: function(response) {
    	//assume if there is no logo url the university is not set up
    	return _.filter(response.data, function(university){return university.attributes.logo_url;});
  	}
});

App.Course = Backbone.Model.extend({
	parse: function(response){
		response.image_url = response.image_url || '';
		return response;
	}
});

App.CoursesCollection = Backbone.Collection.extend({
	model: App.Course,
	url: function(){
		if(app.config.env != 'local'){
			return '/knowledgelink-api/courses/?courses=all';
		}
		return 'testdata-courses.json';
	},
	parse: function(response) {
    	var data = _.map(response, function(val, key){ 
    		return val; }
    		);
    	return data;
  	},
  	parentUniversity : 'hello'
});
