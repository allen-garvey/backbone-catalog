
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