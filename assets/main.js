$(function() {
   // the code here initialises the zendesk session with the app
   // There are many functions which can be applied to the client variable
   var client = ZAFClient.init();
   client.invoke('resize', { width: '100%', height: '120px' });
   //client call to get the user id for the current user
   client.get('ticket.requester.id').then(
    function(data) {
      var user_id = data['ticket.requester.id'];
      requestUserInfo(client, user_id);
    })
 });
 
 function showInfo() {
  var requester_data = {
    'name': 'Jane Doe',
    'tags': ['tag1', 'tag2'],
    'created_at': 'November 20, 2014',
    'last_login_at': 'June 27, 2016'
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}


function showError() {
  var error_data = {
    'status': 404,
    'statusText': 'Not found'
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

//function to get user id from Zendesk REST API
function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };
//Either displays customer data or error response
  client.request(settings).then(
    function(data) {
      console.log(data);
    },
    function(response) {
      console.error(response);
    }
  );
}
