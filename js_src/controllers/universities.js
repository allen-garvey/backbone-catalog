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

  		//display that universities courses
  		var courses = new App.CoursesCollection();
  		if(this.app.config.env != 'local'){
  			var courses_url_suffix = courses.url();
  			courses.url =  function(){ return university.get('url') + courses_url_suffix };
  		}
  		var controller = this;
		var promise = courses.fetch();
  		promise.done(function(){
  			var coursesView = new App.CoursesCollectionView({collection: courses});
  			controller.app.courseListRegion.show(coursesView);
  		});


  	};

	this.universityClicked = function(currentItem, previousItem){
  		var parentList = $('#universities-nav li');
  		controller.displayCurrentUniversity(parentList.index(currentItem));
  	}


};