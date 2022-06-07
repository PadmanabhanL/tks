package com.sap.refapps.espm.logisticsservice.service;

import com.sap.refapps.espm.logisticsservice.model.ShipmentMode;
import org.springframework.stereotype.Service;

@Service
public class LogisticsService {

    public String getShipmentMode(String origin, String destination) {
        if (origin.equals(destination)) {
            return ShipmentMode.LAND.name();
        }

        return ShipmentMode.AIR.name();
    }

}
