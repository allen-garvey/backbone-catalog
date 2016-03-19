App.UniversitiesController = function(app){
	this.app = app;
	this.currentUniversityIndex = 0;
	this.universities = new App.UniversitiesCollection();
	var promise = this.universities.fetch();
	var controller = this;
	promise.done(function(){
		controller.universitiesView = new App.UniversitiesCollectionView({collection: controller.universities});
		app.headerRegion.show(controller.universitiesView);
		$('#universities-header').flipster({onItemSwitch: controller.universityClicked, start: controller.currentUniversityIndex });
		controller.displayCurrentUniversity(controller.currentUniversityIndex);
	});

	
	this.displayCurrentUniversity = function(index){
  		this.currentUniversityIndex = index;
  		//display university description
  		var university = this.universities.at(index);
  		this.universityDescriptionView = new App.UniversityDescriptionView({model : university});
  		this.app.universityDescriptionRegion.show(this.universityDescriptionView);

  		var controller = this;
  		university.actionForCourses(function(courses){
  			var coursesView = new App.CoursesCollectionView({collection: courses});
  			controller.app.courseListRegion.show(coursesView);
  		});
  	};

  	//can't use `this` because function is called from flipster jQuery plugin
	this.universityClicked = function(currentItem, previousItem){
  		var parentList = $('#universities-nav li');
  		controller.displayCurrentUniversity(parentList.index(currentItem));
  	}
};


