var myModel, myView, myCollection, collectionView;

$(function() {

  myCollection = new MovieCollection();

  myCollection.fetch().then(function (data) {
    console.log(data);
    collectionView = new MovieCollectionView({collection: myCollection});
  })

  $('body').on('click', '#sortingTitle', function(e) {
    e.preventDefault();

    myCollection.fetch().then(function (data) {
      console.log(data);
      var sortedCollection = _.sortBy(data, 'Title');
      for (var i = 0; i < sortedCollection.length; i++) {
        myCollection.models[i].attributes = sortedCollection[i];
      }
      console.log(myCollection);

      collectionView = new MovieCollectionView({collection: myCollection});
    })
  });

  $('body').on('click', '#sortingYear', function(e) {
    e.preventDefault();

    myCollection.fetch().then(function (data) {
      console.log(data);
      var sortedCollection = _.sortBy(data, 'Year');
      for (var i = 0; i < sortedCollection.length; i++) {
        myCollection.models[i].attributes = sortedCollection[i];
      }
      console.log(myCollection);

      collectionView = new MovieCollectionView({collection: myCollection});
    })
  });

  $('body').on('click', '#sortingGenre', function(e) {
    e.preventDefault();

    myCollection.fetch().then(function (data) {
      console.log(data);
      var sortedCollection = _.sortBy(data, 'Genre');
      for (var i = 0; i < sortedCollection.length; i++) {
        myCollection.models[i].attributes = sortedCollection[i];
      }
      console.log(myCollection);

      collectionView = new MovieCollectionView({collection: myCollection});
    })
  });

  $('body').on('click', '#sortingRating', function(e) {
    e.preventDefault();

    myCollection.fetch().then(function (data) {
      console.log(data);
      var sortedCollection = _.sortBy(data, 'Metascore');
      for (var i = 0; i < sortedCollection.length; i++) {
        myCollection.models[i].attributes = sortedCollection[i];
      }
      console.log(myCollection);

      collectionView = new MovieCollectionView({collection: myCollection});
    })
  });

});
