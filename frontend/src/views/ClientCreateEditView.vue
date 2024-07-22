<template>
  <div>
    <h2>{{ isEditing ? 'Modifier le client' : 'Ajouter un client' }}</h2>
    <form @submit.prevent="saveClient">
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" v-model="client.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input type="text" id="lastName" v-model="client.lastName" required />
      </div>
      <div class="form-group">
        <label for="function">Fonction</label>
        <input type="text" id="function" v-model="client.function" />
      </div>
      <div class="form-group">
        <label for="phone">Téléphone</label>
        <input type="text" id="phone" v-model="client.phone" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="client.email" />
      </div>
      <div class="form-group">
        <label for="companyName">Entreprise</label>
        <input type="text" id="companyName" v-model="client.companyName" />
      </div>
      <div class="form-group">
        <label for="address1">Adresse 1</label>
        <input type="text" id="address1" v-model="client.address1" />
      </div>
      <div class="form-group">
        <label for="address2">Adresse 2</label>
        <input type="text" id="address2" v-model="client.address2" />
      </div>
      <div class="form-group">
        <label for="postalCode">Code Postal</label>
        <input type="text" id="postalCode" v-model="client.postalCode" />
      </div>
      <div class="form-group">
        <label for="city">Ville</label>
        <input type="text" id="city" v-model="client.city" />
      </div>
      <div class="form-group">
        <label for="country">Pays</label>
        <input type="text" id="country" v-model="client.country" />
      </div>
      <div class="form-group">
        <label for="dateAdded">Date d'ajout</label>
        <input type="date" id="dateAdded" v-model="client.dateAdded" />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Enregistrer' : 'Ajouter' }}</button>
    </form>
  </div>
</template>

<script>
import { useClientStore } from '@/stores/client';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const clientStore = useClientStore();
    const router = useRouter();
    const client = ref({
      firstName: '',
      lastName: '',
      function: '',
      phone: '',
      email: '',
      companyName: '',
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      country: 'FRANCE',
      dateAdded: new Date().toISOString().split('T')[0]
    });
    const isEditing = ref(false);

    const fetchClient = async () => {
      if (props.id !== 'new') {
        isEditing.value = true;
        await clientStore.fetchClient(props.id);
        client.value = { ...clientStore.client };
      }
    };

    const saveClient = async () => {
      if (isEditing.value) {
        await clientStore.updateClient(client.value.idclient, client.value);
      } else {
        await clientStore.createClient(client.value);
      }
      router.push('/clients');
    };

    onMounted(() => {
      fetchClient();
    });

    return {
      client,
      isEditing,
      saveClient,
    };
  }
};
</script>

<style scoped>
/* Ajoutez ici les styles pour votre composant */
</style>
