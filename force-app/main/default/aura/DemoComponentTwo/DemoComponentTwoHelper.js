({

    showToast : function(type, message) {

        var toastEvent = $A.get("e.force:showToast");

        toastEvent.setParams({
            type: type,
            title: "Success!",
            message: message
        });

        toastEvent.fire();
    },

    loadColumns : function(component) {

        var columns = [{label: 'Record Name', fieldName: 'Name', type: 'text'}];
        component.set('v.columns', columns);
    },

    loadOpportunities : function(component, helper, params) {

        console.log('loadOpportunities');

        return new Promise(function(resolve, reject) {

            helper.runApex(component, 'getOpportunities', params)
            .then(function(result) {
                resolve(result);
            })
            .catch(function(result) {
                reject(result);
            })
        });
    },    

    runApex: function(component, methodName, params) {

        return new Promise(function(resolve, reject) {

            var action = component.get("c." + methodName);
            action.setParams(params);

            action.setCallback(this, function(response) {

                var state = response.getState();

                if (state === "SUCCESS") {
                
                    var result = response.getReturnValue()
                    resolve(result);
                }
                else if (state === "ERROR") {

                    var errors = response.getError();
                    reject(errors);
                }
                else {
                    reject();
                }
            });

            $A.enqueueAction(action);

        });
    }

})
