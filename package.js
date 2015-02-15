Package.describe({
  name: 'jplack:uploadmanager',
  version: '0.0.1',
  summary: 'adds upload manager for tomi:upload-server.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use(['mongo', 'templating', 'tomi:upload-server@1.1.1', 'tomi:upload-jquery@2.0.0'], ['client', 'server']);
  api.imply('templating')
  api.add_files(['uploadmanager.html', 'uploadmanager.js'], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jplack:uploadmanager');
  api.addFiles('jplack:uploadmanager-tests.js');
});
