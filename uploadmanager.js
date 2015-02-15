Items = new Mongo.Collection('items');
Uploads = new Mongo.Collection('uploads');
UserTemp = new Mongo.Collection('usertemp');

Uploads.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true
  }
});
UserTemp.allow({
  insert: function (userId, doc) {
    return true;
  }
});

//Router.route('/', function () {
//  this.render('Home');
//});
//if (! Router.route('/')){
//    Router.route('/', function () {
//  this.render('Home');
//});
//}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Uploader.finished = function(index, file, userId) {
      Uploads.insert(file);
      var upload = Uploads.findOne({path: file.path});
      var imgId = upload._id;
      UserTemp.insert({user: Meteor.userId(), file: file.name, url: file.url, path: file.path, imgId: imgId});
    }
  });
  Meteor.subscribe('items');
  Meteor.subscribe('uploads');
  Meteor.subscribe('usertemp');
  Template.uploadedInfo.helpers({
    userTemp: function () {
      return UserTemp.find({user: Meteor.userId()});
    },
    src: function() {
      if (this.type.indexOf('image') >= 0) {
        return 'upload/' + this.path;
      } else return 'file_icon.png';
    }
  });

  Template.uploadedInfo.events({
    'click .deleteUpload':function() {
      if (confirm('Are you sure?')) {
        Meteor.call('deleteFile', this.imgId);
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // init items collection
    if (Items.find().count() == 0) {
      Items.insert({name: 'My Item', uploads: []});
    }

    UploadServer.init({
      tmpDir: process.env.PWD + '/.uploads/tmp',
      uploadDir: process.env.PWD + '/.uploads/',
      checkCreateDirectories: true,
      getDirectory: function(fileInfo, formData) {
        if (formData && formData.directoryName != null) {
          return formData.directoryName;
        }
        return "";
      },
      getFileName: function(fileInfo, formData) {
        if (formData && formData.prefix != null) {
          return formData.prefix + '_' + fileInfo.name;
        }
        return fileInfo.name;
      },
      finished: function(fileInfo, formData) {
        if (formData && formData._id != null) {
          Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
          console.log(formData);
        }
      }
    });
  });

  Meteor.methods({
    'deleteFile': function(imgId) {
      check(imgId, String);
      var upload = Uploads.findOne({_id: imgId});
      if (upload == null) {
        throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
      }

      UploadServer.delete(upload.path);
      Uploads.remove({_id: imgId});
      UserTemp.remove({imgId: imgId});
    }
  })

  Meteor.publish('items', function() {
    return Items.find();
  });

  Meteor.publish('uploads', function() {
    return Uploads.find();
  })
  Meteor.publish('usertemp', function() {
    return UserTemp.find();
  })
}
