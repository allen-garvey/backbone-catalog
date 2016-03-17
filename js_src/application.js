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