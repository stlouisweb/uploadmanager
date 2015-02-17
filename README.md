# uploadmanager
This plugin implements the example from https://github.com/tomitrescak/meteor-uploads, providing a user based upload manager.
Currently Bootstrap is required.

#Usage

Add then bootstrap framework in your project.
```
$ meteor add twbs:bootstrap
```
or
```
$ meteor add nemo64:bootstrap
```

Add the packages.
```
$ meteor add tomi:upload-server
$ meteor add tomi:upload-jquery
$ meteor add jplack:uploadmanager
```
Add the file uploader and uploads list in your template.
```
{{> upload_bootstrap fileTypes='image/*' formData=myFormData }}
{{> uploadedInfo uploads }}
```
Add this in your controller:
```

Template.templatename.helpers({
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id };
  }
});
```

The package creates a folder .uploads in your project root where files are stored. 
The package creates and makes available two mongo collections, usertemp (accessible via the variable UserTemp) and Uploads (accessible via the variable Uploads), both collections store infromation related to the uploaded files. uploads stores information about the uploaded file. The usertemp collection stores the file url, file path, the _id of the file in uploads and the Meteor userId of the user who uploaded the file, which is useful for keeping track of images that will be attached to a yet to be published post.
