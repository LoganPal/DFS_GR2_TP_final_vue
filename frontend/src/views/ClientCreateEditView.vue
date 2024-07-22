<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{{ isEditing ? 'Modifier le client' : 'Ajouter un client' }}</h2>
        <form @submit.prevent="saveClient" class="space-y-4">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="firstName" class="form-label">Prénom</label>
              <input type="text" id="firstName" v-model="client.firstName" required class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="lastName" class="form-label">Nom</label>
              <input type="text" id="lastName" v-model="client.lastName" required class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="companyName" class="form-label">Entreprise</label>
              <input type="text" id="companyName" v-model="client.companyName" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="function" class="form-label">Fonction</label>
              <input type="text" id="function" v-model="client.function" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="phone" class="form-label">Téléphone</label>
              <input type="text" id="phone" v-model="client.phone" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="client.email" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="address1" class="form-label">Adresse 1</label>
              <input type="text" id="address1" v-model="client.address1" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="address2" class="form-label">Adresse 2</label>
              <input type="text" id="address2" v-model="client.address2" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="postalCode" class="form-label">Code Postal</label>
              <input type="text" id="postalCode" v-model="client.postalCode" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="city" class="form-label">Ville</label>
              <input type="text" id="city" v-model="client.city" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="country" class="form-label">Pays</label>
              <input type="text" id="country" v-model="client.country" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="dateAdded" class="form-label">Date d'ajout</label>
              <input type="date" id="dateAdded" v-model="client.dateAdded" class="form-control" />
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Enregistrer' : 'Ajouter' }}</button>
          </div>
        </form>
      </div>
    </div>
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
      companyName: '',
      function: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      country: 'FRANCE',
      dateAdded: new Date().toISOString().split('T')[0],
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
