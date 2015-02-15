# uploadmanager
This plugin implements the example from https://github.com/tomitrescak/meteor-uploads, providing a user based upload manager.
Currently Bootstrap is required.

#Usage
Add the bootstrap framework to your project.
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
<<<<<<< HEAD
Template.AddProduct.helpers({
=======
Template.templatename.helpers({
>>>>>>> b41e1f4c7d724c87de948d31c5c680eac86dde92
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id };
  }
});
```
