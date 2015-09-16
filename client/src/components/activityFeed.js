var KudosButton = React.createClass({
		giveKudos: function(){ // method gets fires on button-click
		$.ajax({
      url: '/api/giveKudos',
      type: 'PUT',   // PUT request to update kudos_count value in the db
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) { // IDK why no success msg sent but in console success message from db-query
      	this.setState({data:data})
        console.log('successful thumbs up')
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},

	render: function(){
    return (
    	<div >
	  		<button type="submit" onClick={this.giveKudos.bind(this)}>THUMBS UP</button>
      </div>
    ) 
  }
})

var ActivityFeed = React.createClass({ //parent component
	loadActivitiesFromServer: function() { //loads data for the activity feed
    console.log('inside ajax call')
    $.ajax({
      url: '/api/activityFeed',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('success from the load activities DATA', data);
        console.log('this inside succcess',this)
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        // console.error(this.props.url);
        // console.error(status);
        // console.log(err.toString());
        console.log('DOUBLE EWE TEE EFF');
      }.bind(this)
    });
  },
  getInitialState: function() { // initial state is empty until our get request returns with the data
    return {data: []};
  },
  componentWillMount: function() { // this method fires before the intitial render
    this.loadActivitiesFromServer();
  },
  render: function() {
    console.log('this.state.data',this.state.data)
    var activityNodes = this.state.data.map(function(activity){ //iterating thru array of objects returned from db query, and gives each activity its own kudos button
      return (
      
        	<table><tbody>
            <tr>
              <td>{activity.username+': '+activity.habit+' at '+activity.update_time}</td>
              <td><KudosButton/></td>
            </tr>
          </tbody></table>
       );
    }.bind(this));
    return (
      <div className="ActivityFeed"><h1>Activity Feed</h1>{activityNodes}</div>  
    );
  }
})

React.render(<ActivityFeed  />, document.getElementById('activityfeed'))