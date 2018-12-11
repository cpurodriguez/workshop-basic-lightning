({
    init : function(component, event, helper) {

        helper.loadColumns(component, helper)
        .then(function(columnsResult) {

            console.log('Promise 1');
            component.set('v.columns', columnsResult);
            return helper.loadAccounts(component, helper)
        })
        .then(function(accountsResult) 
        {
            console.log('Promise 2');
            component.set('v.accounts', accountsResult);
            return helper.loadContacts(component, helper);
        })
        .then(function(contactResult) {

            console.log('Promise 3');
            component.set('v.contacts', contactResult);
            return 'Thanks!';
        })
        .then(function(helloResult) {
            
            console.log('All Done! ' + helloResult);
        })
        .catch(function(result) {

            $A.reportError(result);
        })
    },

    handleRowSelection : function(component, event, helper) {

        var rows = event.getParam('selectedRows');

        console.log(rows);

        if (rows.length > 0) {

            helper.showToast('success', 'You selected something!');
            var accountId = rows[0].Id;
            var appEvent = $A.get("e.c:DemoEvent");
            appEvent.setParams({ "accountId" : accountId });
            appEvent.fire();
        }
        else {
            helper.showToast('warning', 'You deselected something....');
        }
            
    }

})
