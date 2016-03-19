

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
		return 'testdata/courses.json';
	},
	parse: function(response) {
    	var data = _.map(response, function(val, key){ 
    		return val; }
    		);
    	return data;
  	},
  	parentUniversity : 'hello'
});

