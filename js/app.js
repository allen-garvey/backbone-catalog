var App = Marionette.Application.extend({
	initialize: function(options) {
		this.addRegions({
  							mainRegion: "#main-content",
  							headerRegion: "#universities-header",
  							universityDescriptionRegion : '#university-description',
  							courseListRegion : '#courses-container'
						});
		this.config = options.config;
  	},
  	start : function(){
  		this.universities = new App.UniversitiesCollection();
		var promise = this.universities.fetch();
		this.currentUniversityIndex = 0;
		var app = this;
		promise.done(function(){
			app.universitiesView = new App.UniversitiesCollectionView({collection: app.universities});
			app.headerRegion.show(app.universitiesView);
			$('#universities-header').flipster({onItemSwitch: app.universityClicked, start: app.currentUniversityIndex });
			app.displayCurrentUniversity(app.currentUniversityIndex);
		});
		
  		Backbone.history.start();
  		
  	},
  	displayCurrentUniversity : function(index){
  		this.currentUniversityIndex = index;
  		//display university description
  		var university = this.universities.at(index);
  		this.universityDescriptionView = new App.UniversityDescriptionView({model : university});
  		this.universityDescriptionRegion.show(this.universityDescriptionView);

  		//display that universities courses
  		var courses = new App.CoursesCollection();
  		if(this.config.env != 'local'){
  			var courses_url_suffix = courses.url();
  			courses.url =  function(){ return university.get('url') + courses_url_suffix };
  		}
		var promise = courses.fetch();
  		var app = this;
  		promise.done(function(){
  			var coursesView = new App.CoursesCollectionView({collection: courses});
  			app.courseListRegion.show(coursesView);
  		});


  	},
  	universityClicked : function(currentItem, previousItem){
  		var parentList = $('#universities-nav li');
  		app.displayCurrentUniversity(parentList.index(currentItem));
  	}
});


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
    	return response.data;
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



App.UniversityItemView = Marionette.ItemView.extend({
  tagName : 'li',
  template: function(data){ 
  		var template = _.template($('#university-item-template').html());
  		return  template({model: data});
	}
});


App.UniversitiesCollectionView = Marionette.CollectionView.extend({
	tagName : 'ul',
	id : 'universities-nav',
	childView: App.UniversityItemView

});

App.CourseItemView = Marionette.ItemView.extend({
  tagName : 'li',
  className : 'course_box',
  template: function(data){ 
  		var template = _.template($('#course-template').html());
  		return  template({model: data});
	}
});

App.CoursesCollectionView = Marionette.CollectionView.extend({
	tagName : 'ul',
	id : 'university-course-list',
	className: 'container',
	childView: App.CourseItemView

});

App.UniversityDescriptionView = Marionette.ItemView.extend({
  template: function(data){ 
  		var template = _.template($('#university-description-template').html());
  		return  template({model: data});
	}
});








