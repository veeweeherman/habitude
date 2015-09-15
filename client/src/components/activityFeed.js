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

var ActivityFeed = React.createClass({ //parent component
	loadActivitiesFromServer: function() {
    console.log('inside ajax call')
    $.ajax({
      url: '/api/activityFeed',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('success from the load activities DATA', data);
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
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() { // this function is disabled by Glennrique and Vy because loadActivitiesFromServer does not have functionality yet 
    console.log('is this first?')
    this.loadActivitiesFromServer();
    // setInterval(this.loadActivitiesFromServer, this.props.pollInterval); // retrieves habits from db on interval
  },
  render: function() {
    console.log('inside render func')
    return (

      <div>{this.state.data.map(function(activity){
        return activity.habit
      })}
      <div className="ActivityFeed">
      <h1>Activity Feed</h1>
      	<table><tbody>
	  			<tr>
	      	<td></td>
	      	<td><Activities /></td>
	      	</tr>
	  		</tbody></table>
      </div>
      </div>
      );
  }
})

React.render(<ActivityFeed username={'glennrique'} habit={'droppin beats'} date={'2015-09-14'} />, document.getElementById('activityfeed'))