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

    loadColumns : function(component, helper) {

        return new Promise(function(resolve, reject) {
            var columns = [{label: 'Record Id', fieldName: 'Id', type: 'text'},
                            {label: 'Name', fieldName: 'Name', type: 'text'}];
            resolve(columns);
        });
    },

    loadAccounts : function(component, helper) {

        return new Promise(function(resolve, reject) {

            helper.runApex(component, 'getAccounts', {})
            .then(function(result) {
                resolve(result);
            })
            .catch(function(result) {
                reject(result);
            })
        });
    },    

    loadContacts : function(component, helper) {

        return new Promise($A.getCallback(function(resolve, reject) {

            helper.runApex(component, 'getContacts', {})
            .then(
                
                $A.getCallback(function(result) {
                    resolve(result);
                })
            )
            .catch(

                $A.getCallback(function(result) {
                    reject(result);
                })
            )

        }));
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
