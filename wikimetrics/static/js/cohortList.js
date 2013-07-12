$(document).ready(function(){
    
    var viewModel = {
        cohorts: ko.observableArray([]),
        
        view: function(cohort){
            if (cohort.wikiusers && cohort.wikiusers().length > 0) { return; }
            
            $.get('/cohorts/detail/' + cohort.id)
                .done(site.handleWith(function(data){
                    cohort.wikiusers(data.wikiusers);
                }))
                .fail(site.failure);
        },
        
        viewFull: function(cohort, event){
            $.get('/cohorts/detail/' + cohort.id + '?full_detail=true')
                .done(site.handleWith(function(data){
                    cohort.wikiusers(data.wikiusers);
                    $(event.target).remove()
                }))
                .fail(site.failure);
        },
    };
    
    // fetch this user's cohorts
    $.get('/cohorts/list/')
        .done(site.handleWith(function(data){
            setWikiusers(data.cohorts);
            viewModel.cohorts(data.cohorts);
        }))
        .fail(site.failure);
    
    ko.applyBindings(viewModel);
    
    function setWikiusers(list){
        bareList = ko.utils.unwrapObservable(list);
        ko.utils.arrayForEach(bareList, function(item){
            item.wikiusers = ko.observableArray([]);
        });
    };
});
