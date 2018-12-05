import moment from 'moment';

class Redflag {
  constructor(id = 0) {
    this.redflags = [];
    this.id = id;
  }

  create(data) {
    const newRedflag = {
      id: this.id += 1,
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
    return this.redflags.find(redflag => redflag.id === parseInt((id), 10));
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
