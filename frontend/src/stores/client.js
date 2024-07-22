import { defineStore } from 'pinia';
import axios from 'axios';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    client: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchClients() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/clients');
        this.clients = response.data;
        console.log('Clients fetched:', this.clients);
      } catch (error) {
        this.error = error;
        console.error('Error fetching clients:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchClient(id) {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/clients/${id}`);
        this.client = response.data;
        console.log('Client fetched:', this.client);
      } catch (error) {
        this.error = error;
        console.error('Error fetching client:', error);
      } finally {
        this.loading = false;
      }
    },
    async createClient(clientData) {
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:3000/clients', clientData);
        this.clients.push(response.data);
        await this.fetchClients(); 
        this.error = error;
        console.error('Error creating client:', error);
      } finally {
        this.loading = false;
      }
    },
    async updateClient(id, clientData) {
      this.loading = true;
      try {
        const response = await axios.patch(`http://localhost:3000/clients/${id}`, clientData);
        const index = this.clients.findIndex(client => client.idclient === id);
        if (index !== -1) {
          this.clients[index] = response.data;
          await this.fetchClients();
        }
      } catch (error) {
        this.error = error;
        console.error('Error updating client:', error);
      } finally {
        this.loading = false;
      }
    },
    async deleteClient(id) {
      this.loading = true;
      try {
        await axios.delete(`http://localhost:3000/clients/${id}`);
        this.clients = this.clients.filter(client => client.idclient !== id);
        await this.fetchClients(); 
      } catch (error) {
        this.error = error;
        console.error('Error deleting client:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
