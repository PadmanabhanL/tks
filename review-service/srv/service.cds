   using { sap.capire.reviews as db } from '../db/schema';

    // Define Books Service
    service ReviewService {
        entity Reviews as projection on db.Reviews;
    }