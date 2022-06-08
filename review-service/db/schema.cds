namespace sap.capire.reviews;
using {
managed
} from '@sap/cds/common';

entity Reviews : managed {
 	productId : String;
 	rating  : Integer;
 	customerName: String; 
 	comments  : String;
}