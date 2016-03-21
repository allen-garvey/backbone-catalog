App.UniversitiesController = function(app){
	this.app = app;
	this.universities = new App.UniversitiesCollection();
	var promise = this.universities.fetch();
	var controller = this;
	promise.done(function(){
		controller.universitiesView = new App.UniversitiesCollectionView({collection: controller.universities});
		app.headerRegion.show(controller.universitiesView);
		$('#universities-header').flipster({onItemSwitch: controller.universityClicked, start: 0 });
		controller.displayUniversity();
	});

	
	this.displayUniversity = function(university){
        if(_.isUndefined(university)){
            university = this.universities.at(0);
        }
        this.app.universitiesRouter.navigate('university/' + university.get('id'));

    	this.universityDescriptionView = new App.UniversityDescriptionView({model : university});
    	this.app.universityDescriptionRegion.show(this.universityDescriptionView);

    	var controller = this;
    	university.actionForCourses(function(courses){
    		var coursesView = new App.CoursesCollectionView({collection: courses});
    		controller.app.courseListRegion.show(coursesView);
    	});
    };

    this.showUniversity = function(id){
        var university = this.universities.get(id);
        $('#universities-header').flipster('jump', this.universities.findIndex(university));
        this.displayUniversity(university);
    };

    //can't use `this` because function is called from flipster jQuery plugin
    this.universityClicked = function(currentItem, previousItem){
    	var parentList = $('#universities-nav li');
        var currentUniversity = controller.universities.at(parentList.index(currentItem));
    	controller.displayUniversity(currentUniversity);
    }
};


