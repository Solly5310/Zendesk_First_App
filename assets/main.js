$(function() {
   // the code here initialises the zendesk session with the app
   // There are many functions which can be applied to the client variable
   var client = ZAFClient.init();
   client.invoke('resize', { width: '100%', height: '120px' });
 });
 