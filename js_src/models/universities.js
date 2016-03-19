
App.University = Backbone.Model.extend({
	initialize : function(options){
		this.coursesCollection = new App.CoursesCollection({parentUniversity: this});
		this.coursesFetched = false;
	},
	parse : function(data, options){
		var obj = data.attributes;
		obj.id = data.id;
		obj.url = obj.url.replace(/^http:/, 'https:'); //make sure url is https for ajax purposes
		return obj;
	},
	//takes a function and passes courses collection into callback
	//if courses have not been fetched will fetch first
	actionForCourses : function(callback){
		if(this.coursesFetched){
			callback(this.coursesCollection);
			return;
		}
		var university = this;
		var promise = this.coursesCollection.fetch();
  		promise.done(function(){
 			university.coursesFetched = true;
  			callback(university.coursesCollection);
  		});
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