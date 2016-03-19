var App = Marionette.Application.extend({
	initialize: function(options) {
		this.config = options.config;
        this.addRegions({
  							mainRegion: "#main-content",
  							headerRegion: "#universities-header",
  							universityDescriptionRegion : '#university-description',
  							courseListRegion : '#courses-container'
						});
		
  	},
  	start : function(){
        this.universitiesController = new App.UniversitiesController(this);
		
  		Backbone.history.start();
  		
  	}
});





