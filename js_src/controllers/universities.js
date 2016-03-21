App.UniversitiesController = function(app){
	this.app = app;
	this.universities = new App.UniversitiesCollection();
	var promise = this.universities.fetch();
	var controller = this;
	promise.done(function(){
		controller.universitiesView = new App.UniversitiesCollectionView({collection: controller.universities});
		app.headerRegion.show(controller.universitiesView);
        $('#universities-header').flipster({onItemSwitch: controller.universityClicked});
        
        if(_.isUndefined(controller.currentUniversityId)){
            var currentUniversity = controller.universities.at(0);
            controller.currentUniversityId = currentUniversity.get('id');
        }
        else{
            var currentUniversity = controller.universities.get(controller.currentUniversityId);
        }
		controller.displayUniversity(currentUniversity);
	});

	
	this.displayUniversity = function(university){
        this.app.universitiesRouter.navigate('university/' + university.get('id'));
        $('#universities-header').flipster('jump', this.universities.findIndex(university));

    	this.universityDescriptionView = new App.UniversityDescriptionView({model : university});
    	this.app.universityDescriptionRegion.show(this.universityDescriptionView);

    	var controller = this;
    	university.actionForCourses(function(courses){
    		var coursesView = new App.CoursesCollectionView({collection: courses});
    		controller.app.courseListRegion.show(coursesView);
    	});
    };

    this.showUniversity = function(id){
        this.currentUniversityId = id;
        var university = this.universities.get(id);
        //universities haven't loaded yet via ajax
        if(_.isUndefined(university)){
            return;
        }
        
        this.displayUniversity(university);
    };

    //can't use `this` because function is called from flipster jQuery plugin
    this.universityClicked = function(currentItem, previousItem){
    	var parentList = $('#universities-nav li');
        var currentUniversity = controller.universities.at(parentList.index(currentItem));
        controller.currentUniversity = currentUniversity;
    	controller.displayUniversity(currentUniversity);
    }
};


