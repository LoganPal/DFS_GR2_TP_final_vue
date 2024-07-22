const clientInterface = {
  idclient: Date.now(),
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
  dateAdded: new Date().toISOString().slice(0, 10)
};

export { clientInterface };
