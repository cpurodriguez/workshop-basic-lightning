public with sharing class DemoAuraController {

    @AuraEnabled
    public static SObject[] getAccounts() {

        return DemoObjectHandler.getRecords('Account', 1);
    }

    @AuraEnabled
    public static SObject[] getOpportunities(String accountId) {

        return DemoObjectHandler.getRecordsByAccountId('Opportunity', accountId);
    }

    @AuraEnabled
    public static SObject[] getContacts() {

        return DemoObjectHandler.getRecords('Contact');
    }


}
