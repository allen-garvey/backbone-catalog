

App.CourseItemView = Marionette.ItemView.extend({
  tagName : 'li',
  className : 'course_box',
  template: function(data){ 
        var template = Marionette.TemplateCache.get('#course-template');
  		return  template({model: data});
	}
});

App.CoursesCollectionView = Marionette.CollectionView.extend({
	tagName : 'ul',
	id : 'university-course-list',
	className: 'container',
	childView: App.CourseItemView

});