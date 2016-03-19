
App.UniversityItemView = Marionette.ItemView.extend({
  tagName : 'li',
  template: function(data){ 
  		var template = Marionette.TemplateCache.get('#university-item-template');
  		return  template({model: data});
	}
});


App.UniversitiesCollectionView = Marionette.CollectionView.extend({
	tagName : 'ul',
	id : 'universities-nav',
	childView: App.UniversityItemView

});


App.UniversityDescriptionView = Marionette.ItemView.extend({
  template: function(data){ 
  		var template = Marionette.TemplateCache.get('#university-description-template'); 
  		return  template({model: data});
	}
});


