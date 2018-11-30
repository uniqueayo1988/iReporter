import moment from 'moment';

import uuid from 'uuid';

class Redflag {
  constructor() {
    this.redflags = [];
  }

  create(data) {
    const newRedflag = {
      id: uuid.v4(),
      createdOn: moment.now(),
      createdBy: 127,
      type: 'Red-flag',
      location: data.location,
      status: 'draft',
      image: data.image,
      title: data.title,
      comment: data.comment
    };
    this.redflags.push(newRedflag);
    return newRedflag;
  }

  findAll() {
    return this.redflags;
  }

  findOne(id) {
    return this.redflags.find(redflag => redflag.id === id);
  }

  update(id, data) {
    const redflag = this.findOne(id);
    const index = this.redflags.indexOf(redflag);
    this.redflags[index].location = data.location || redflag.location;
    this.redflags[index].comment = data.comment || redflag.comment;
    this.redflags[index].title = data.title || redflag.title;
    return this.redflags[index];
  }

  delete(id) {
    const redflag = this.findOne(id);
    const index = this.redflags.indexOf(redflag);
    this.redflags.splice(index, 1);
    return {};
  }
}

export default new Redflag();
