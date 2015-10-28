People = new Mongo.Collection('people');

PeopleIndex = new EasySearch.Index({
  collection: People,
  fields: ['name'],
  defaultSearchOptions: {
    limit: 20
  },
  engine: new EasySearch.MongoDB()
});

if (Meteor.isServer) {
  if (People.find().count() === 0) {
    _.times(500, () => People.insert({ name: Fake.user().fullname }));
  }
} else {
  Template.searchA.helpers({
    index: PeopleIndex
  });
  Template.searchB.helpers({
    index: PeopleIndex
  });
}
