<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Liste des clients</h2>
        <table class="table table-striped mt-4">
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
                <router-link :to="`/client/${client.idclient}`" class="btn btn-primary btn-sm">Éditer</router-link>
                <button @click="deleteClient(client.idclient)" class="btn btn-danger btn-sm ml-2">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 d-flex justify-content-end">
          <button @click="addClient" class="btn btn-success">Ajouter un client</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClientStore } from '@/stores/client';
import { onMounted } from 'vue';
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

    const addClient = () => {
      router.push('/client/new');
    };

    const deleteClient = async (id) => {
      await clientStore.deleteClient(id);
      fetchClients(); // Rafraîchir la liste des clients après suppression
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
