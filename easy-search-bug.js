People = new Mongo.Collection('people');

PeopleIndex = new EasySearch.Index({
  collection: People,
  fields: ['name'],
  defaultSearchOptions: {
    limit: 20
  },
  engine: new EasySearch.MongoDB({
    // Workaround:
    // transform(doc) {
    //   var transformedDoc = People._transform(doc);
    //   doc.firstName = transformedDoc.firstName();
    //   return doc;
    // }
  })
});

People.helpers({
  firstName() {
    return this.name.split(/\s/)[0];
  }
});

if (Meteor.isServer) {
  if (People.find().count() === 0) {
    _.times(500, () => People.insert({ name: Fake.user().fullname }));
  }
} else {
  Template.searchB.helpers({
    index: PeopleIndex
  });
}
