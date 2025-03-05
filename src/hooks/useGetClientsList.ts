import React, { SetStateAction, useEffect, useState } from "react";
import { Client } from "../types/client";
import { mockClientService } from "../services/mockClientService";

interface ClientStats {
        totalClients: number;
        activeClients: number;
        totalRevenue: number;
        outstandingBalance: number
}

export const useGetClientsList = ( setFilteredClients: React.Dispatch<SetStateAction<Client[]>>) => {
    const [clients, setClients] = useState<Client[]>([]);

     // Load clients
     useEffect(() => {
      const allClients = mockClientService.getAllClients();
      setClients(allClients);
      setFilteredClients(allClients);
}, []);

    return { clients };
}