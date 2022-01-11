$(function() {
   // The code here initialises the zendesk session with the app
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
 
 function showInfo(data) {
  var requester_data = {
    //Passes the data element, which is the user data object, drilling down to the specific user variables needed
    'name': data.user.name,
    'tags': data.user.tags,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at)
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}


function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

//Function to get user id from Zendesk REST API
function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };
//Either displays customer data or error response
  client.request(settings).then(
    function(data) {
      showInfo(data);
    },
    function(response) {
      showError(response);
    }
  );
}

function formatDate(date) {
  // Formates date info into an object,
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  // The object is then converted into a string 
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}