public with sharing class DemoObjectHandler {

    public static SObject[] getRecords(String objectName) {

        return getRecords(objectName, 10);
    }

    public static SObject[] getRecordsByAccountId(String objectName, Id accountId) {

        return getRecordsByAccountId(objectName, 10, accountId);
    }    

    public static SObject[] getRecords(String objectName, Integer size) {

        return Database.query('SELECT Name FROM ' + objectName + ' LIMIT ' + size);
    }

    public static SObject[] getRecordsByAccountId(String objectName, Integer size, Id accountId) {

        return Database.query('SELECT Name FROM ' + objectName + ' WHERE AccountId = :accountId LIMIT ' + size);
    }    
}
