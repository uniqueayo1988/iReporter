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
}

export default new Redflag();
