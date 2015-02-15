Package.describe({
  name: 'jplack:uploadmanager',
  version: '0.0.3',
  summary: 'adds upload manager for tomi:upload-server.',
  git: 'https://github.com/stlouisweb/uploadmanager',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use([
      'mongo', 
      'templating', 
      'tomi:upload-server@1.1.1', 
      'tomi:upload-jquery@2.0.0',
      'iron:router@1.0.7',
      'accounts-base',
      'mizzao:bootboxjs@4.3.0',
  ], ['client', 'server']);
    
  api.use(['twbs:bootstrap@3.3.2', 'nemo64:bootstrap@3.3.1_1'], 'client', {weak: true});
    
  api.imply('templating')
  api.add_files(['uploadmanager.html', 'uploadmanager.js'], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jplack:uploadmanager');
  api.addFiles('jplack:uploadmanager-tests.js');
});
