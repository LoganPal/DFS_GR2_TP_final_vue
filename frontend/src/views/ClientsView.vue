<template>
  <div>
    <h2>Liste des clients</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Entreprise</th>
          <th>Date d'ajout</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.idclient">
          <td>{{ client.firstName }} {{ client.lastName }}</td>
          <td>{{ client.companyName }}</td>
          <td>{{ client.dateAdded }}</td>
          <td>
            <router-link :to="`/client/${client.idclient}`" class="btn btn-primary">Éditer</router-link>
            <button @click="deleteClient(client.idclient)" class="btn btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addClient" class="btn btn-success">Ajouter un client</button>
  </div>
</template>

<script>
import { useClientStore } from '@/stores/client';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const clientStore = useClientStore();
    const router = useRouter();

    const fetchClients = async () => {
      await clientStore.fetchClients();
    };

    onMounted(() => {
      fetchClients();
    });

    watch(() => clientStore.clients, () => {
      fetchClients();
    });

    const addClient = () => {
      router.push('/client/new');
    };

    const deleteClient = async (id) => {
      await clientStore.deleteClient(id);
    };

    return {
      clients: clientStore.clients,
      deleteClient,
      addClient,
    };
  }
};
</script>

<style scoped>
/* Ajoutez ici les styles pour votre composant */
</style>
