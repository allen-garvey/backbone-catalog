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
        this.universitiesController = new App.UniversitiesController(this);
		
  		Backbone.history.start();
  		
  	}
});





