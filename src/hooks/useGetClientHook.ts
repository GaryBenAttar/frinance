import { useEffect, useState } from "react";
import { Client } from "../types/client";
import { mockClientService } from "../services/mockClientService";
import { useParams } from "react-router-dom";

export const useGetClientHook = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        if (clientId) {
          const clientData = mockClientService.getClientById(clientId);
          setClient(clientData || null);
        }
      }, [clientId]);

      return { client };
}