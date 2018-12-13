const Seed = {
  userDetails: {
    firstname: 'ade',
    lastname: 'segun',
    othernames: 'olude',
    email: 'adeb@gmail.com',
    phoneNumber: '0808080',
    username: 'adesegun',
    password: 'adeb'
  },

  invalidEmail: {
    firstname: 'ade',
    lastname: 'segun',
    othernames: 'olude',
    email: 'adeb@.com',
    phoneNumber: '0808080',
    username: 'adesegun',
    password: 'adeb'
  },

  noFirstname: {
    lastname: 'segun',
    othernames: 'olude',
    email: 'adeb@.com',
    phoneNumber: '0808080',
    username: 'adesegun',
    password: 'adeb'
  },

  noLastname: {
    firstname: 'ade',
    othernames: 'olude',
    email: 'adeb@.com',
    phoneNumber: '0808080',
    username: 'adesegun',
    password: 'adeb'
  },

  noEmail: {
    firstname: 'ade',
    lastname: 'segun',
    othernames: 'olude',
    phoneNumber: '0808080',
    username: 'adesegun',
    password: 'adeb'
  },

  noPhoneNumber: {
    firstname: 'ade',
    lastname: 'segun',
    othernames: 'olude',
    email: 'adeb@.com',
    username: 'adesegun',
    password: 'adeb'
  },

  noUsername: {
    firstname: 'ade',
    lastname: 'segun',
    othernames: 'olude',
    email: 'adeb@.com',
    phoneNumber: '0808080',
    password: 'adeb'
  },

  noPassword: {
    firstname: 'ade',
    lastname: 'segun',
    othernames: 'olude',
    email: 'adeb@.com',
    phoneNumber: '0808080',
    username: 'adesegun'
  },

  redflag: {
    title: 'water',
    location: 'coke',
    image: 'pix.jpg',
    comment: 'hello how are'
  }

};

export default Seed;
