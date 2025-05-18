import * as clientServices from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientServices.getClients();
    if (!clients) {
      return res.status(404).json({ message: "Clients not found" });
    }
    res.status(200).json(clients);
  } catch (err) {
    console.error("Error fetching clients", err);
    res.status(500).json({ message: "Internal Server" });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const client = await clientServices.createClient(clientData);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error creating client", error);
    res.status(500).json({ message: "Internal Server" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const clientData = req.body;
    const clientId = req.params.id;
    const client = await clientServices.updateClient(clientId, clientData);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error updating client", error);
    res.status(500).json({ message: "Internal Server" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await clientServices.deleteClient(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error deleting client", error);
    res.status(500).json({ message: "Internal Server" });
  }
};

export const searchClients = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const clients = await clientServices.searchClients(searchTerm);
    if (!clients) {
      return res.status(404).json({ message: "Clients not found" });
    }
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients", error);
    res.status(500).json({ message: "Internal Server" });
  }
};
