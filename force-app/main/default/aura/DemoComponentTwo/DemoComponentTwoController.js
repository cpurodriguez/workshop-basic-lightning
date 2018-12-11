({
    init : function(component, event, helper) {
        helper.loadColumns(component, helper)
    },
    
    handleDemoEvent : function(component, event, helper) {

        var accountId = event.getParam('accountId');
        console.log("accountId", accountId);

        helper.loadOpportunities(component, helper, {accountId: accountId})
        .then(function(opportunitiesResult) {

            component.set('v.opportunities', opportunitiesResult);
            helper.showToast('info', 'Go Opps!');
        })
        .then(function() {
            console.log('All Done!');
        })        
        .catch(function(result) {
            $A.reportError(result);
        })        

    },

})
