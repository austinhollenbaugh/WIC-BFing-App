angular.module('bfing-app')
  .service('tipService', function() {
    this.tips = [{
        text: 'attend breastfeeding class',
        whenToSend: 90
      },
      {
        text: 'growth spurt',
        whenToSend: 3 //in days from birth of baby
      },
      {
        text: 'hunger strike',
        whenToSend: 270
      },
      {
        text: 'growth spurt',
        whenToSend: 14
      },
      {
        text: 'cluster-feeding',
        whenToSend: 2
      }];

  });
