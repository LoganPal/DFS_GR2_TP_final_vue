<template>
    <tr>
      <td>{{ client.firstName }} {{ client.lastName }}</td>
      <td>{{ client.companyName }}</td>
      <td>
        <router-link :to="{ name: 'edit-client', params: { id: client.idclient } }" class="btn btn-primary">Éditer</router-link>
        <button @click="deleteClient(client.idclient)" class="btn btn-danger">Supprimer</button>
      </td>
    </tr>
  </template>
  
  <script>
  import { useClientStore } from '@/stores/client'
  
  export default {
    props: {
      client: Object
    },
    setup() {
      const clientStore = useClientStore()
      return {
        deleteClient: clientStore.deleteItem
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ajoutez ici vos styles */
  </style>
  