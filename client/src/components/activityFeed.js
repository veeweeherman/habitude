var Activities = React.createClass({
		giveKudos: function(){ // method gets fires on button-click
		$.ajax({
      url: '/api/giveKudos',
      type: 'PUT',   
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
// <p>{username} checked in today for: {biking}. {username} did it on: {2015-09-14}</p>
var ActivityFeed = React.createClass({ //parent component
	loadActivitiesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        // console.error(this.props.url);
        // console.error(status);
        // console.log(err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadActivitiesFromServer();
    setInterval(this.loadActivitiesFromServer, this.props.pollInterval); // retrieves habits from db on interval
  },
  render: function() {
    return (
      <div className="ActivityFeed">
      <h1>Activity Feed</h1>
      	<table><tbody>
	  			<tr>
	      	<td>{this.props.username} checked in today for: {this.props.habit}. {this.props.username} did it on: {this.props.date}</td>
	      	<td><Activities /></td>
	      	</tr>
	  		</tbody></table>
      </div>
      );
  }
})

React.render(<ActivityFeed username={'glennrique'} habit={'droppin beats'} date={'2015-09-14'} />, document.getElementById('activityfeed'))