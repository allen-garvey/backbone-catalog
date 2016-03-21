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
        var universitiesController = new App.UniversitiesController(this);
        this.universitiesController = universitiesController;
        
        this.universitiesRouter = new Marionette.AppRouter({
                controller: universitiesController,
                appRoutes: {
                                "university/:id": "showUniversity"
                            }
        });
		Backbone.history.start();
	}
});


