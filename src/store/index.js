import Wilddog from 'wilddog';
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import _ from 'underscore'

const ref = new Wilddog("https://vote160314.wilddogio.com/shake");
const store = new EventEmitter();
export default store;

store.shakeKeys = [];


//监听是否新创建了摇一摇活动
var isLastShake = true;
ref.limitToLast(1).on('child_added',function(snap){
  if( isLastShake ) {
    isLastShake = false;
  } else {
    console.log('new shake record', snap.key());
  }
});


//监听是否新增了用户
store.listenUser = function(shakeId){
  var userRef = ref.child(shakeId + '/users');
  userRef.limitToLast(1).on('child_added', function(){
    store.emit("userUpdated");
  });
}

//停止监听新增用户



store.createShake = function(id){
  return new Promise(function(resolve,reject){
    var nowTime = Date.now();
    ref.child(id).set({'createAt':nowTime,'switch':false},function(err){
      if(err == null){
        resolve();
      }else{
        reject(err)
      }
    })
  })
};

store.createUser = function(shakeId,uid){
  ref.child(shakeId+'/users/'+uid).set({'value':0})
}


// 查询用户信息
store.fetchUsers = function(shakeId){
  return new Promise(function(resolve,reject){
    var usersLink = shakeId + '/users';
    var usersRef = ref.child(usersLink);
    usersRef.once('value',
      function(snap){
        resolve(snap.val());
      },
      function(err){
        if(err){
          reject(err);
        }
      }
    )
  })

};

//监听用户摇动

store.listenShake = function(shakeId,userId){
  var userLink =  shakeId + '/users/' + userId + '/value'
  var userRef = ref.child(userLink);
  userRef.transaction(
    function(currentRank){
      console.log('currentRank:'+currentRank);
      if(currentRank === null){
        return 1;
      }else{
        return currentRank + 1;
      }
    },
    function(err,committed,snapshot){
      if (err) {
        console.log(err);
      } else if (!committed) {
        console.log('is committed')
      } else {
        console.log('snapshot：'+snapshot);
        store.emit('userShake-update');
      }
    }
  )
};

store.setStart = function(shakeId,isStart){
  ref.child(shakeId.switch).set(isStart)
}