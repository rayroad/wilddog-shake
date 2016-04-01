import Wilddog from 'wilddog';
import { EventEmitter } from 'events'

const storeEvent = new EventEmitter();

function store(shakeId){
  this.shakeId = shakeId;
  this.ref = new Wilddog("https://vote160314.wilddogio.com/shake/"+this.shakeId);
}

store.prototype.listenUser = function(){
  var _that = this;
  var userRef = this.ref.child('user');
  var isLastUser = true;
  userRef.limitToLast(1).on('child_added',function(snap){
    if( isLastUser ) {
      isLastUser = false;
    } else {
      var eventTag = _that.shakeId + '-userUpdated';
      storeEvent.emit(eventTag);
    }
  });
}

module.exports = {store,storeEvent};
