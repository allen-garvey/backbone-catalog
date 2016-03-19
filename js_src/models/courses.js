

App.Course = Backbone.Model.extend({
	parse: function(response){
		response.image_url = response.image_url || '';
		return response;
	}
});

App.CoursesCollection = Backbone.Collection.extend({
	initialize: function(options){
		this.parentUniversity = options.parentUniversity;
	},
	model: App.Course,
	url: function(){
		if(app.config.env != 'local'){
			return this.parentUniversity.get('url') + '/knowledgelink-api/courses/?courses=all';
		}
		return 'testdata/courses' + _.random(1, 10) + '.json';
	},
	parse: function(response) {
    	var data = _.map(response, function(val, key){ 
    		return val; }
    		);
    	return data;
  	}
});

