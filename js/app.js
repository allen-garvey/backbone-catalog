var App = Marionette.Application.extend({
	initialize: function(options) {
		this.addRegions({
  							mainRegion: "#main-content",
  							headerRegion: "#universities-header",
  							universityDescriptionRegion : '#university-description',
  							courseListRegion : '#courses-container'
						});
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
  		var university = this.universities.at(index);
  		this.universityDescriptionView = new App.UniversityDescriptionView({model : university});
  		this.universityDescriptionRegion.show(this.universityDescriptionView);

  		var courses = new App.CoursesCollection();
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
		return obj;
	}

});

App.UniversitiesCollection = Backbone.Collection.extend({
	initialize: function(){
	},
	model: App.University,
	// url : 'https://development.knowledgelinktv.com/knowledgelink_api/universities',
	url: 'testdata-universities.json',
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
	url: 'testdata-courses.json',
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
  initialize : function(){
  },
  template: function(data){ 
  		var template = _.template($('#university-description-template').html());
  		return  template({model: data});
	}
});


var app = new App();
app.start();





