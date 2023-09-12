import { Client } from "@/resources/client/client.interface";
import { ClientOutput } from "@/resources/client/client.model";

export const toClient = (client: ClientOutput): Client => {
    return {
        id: client.id,
        name: client.name,
        kind: client.kind,
        logo: client.logo,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
    }
}
