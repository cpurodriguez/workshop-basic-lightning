public class DemoRecordWrapper {

    public SObject record {get; set;}
    public Boolean isSelected {get; set;}
    
    public DemoRecordWrapper(SObject record) {
        this.record = record;
        isSelected = false;
    }
}