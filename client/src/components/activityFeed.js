

var ActivityFeed = React.createClass({
	giveKudos: function(){ // method gets fires on button-click
		$.ajax({
      url: '/api/giveKudos',
      type: 'PUT',   
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) { // IDK why no success msg sent but in console success message from db-query
      	this.setState({data:data})
    	console.log('successfull thumbs up')
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},

	render: function(){
    return (
    	<div>
	      <h3>Activity Feed</h3>
	      <button type="submit" onClick={this.giveKudos.bind(this)}>THUMBS UP</button>
      </div>
    ) 
  }
})

React.render(<ActivityFeed/>, document.getElementById('activityfeed'))