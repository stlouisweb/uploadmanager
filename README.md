# uploadmanager
This plugin implements the example from https://github.com/tomitrescak/meteor-uploads, providing a user based upload manager.
Currently Bootstrap is required.

#Usage
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
Template.AddProduct.helpers({
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id };
  }
});
```
