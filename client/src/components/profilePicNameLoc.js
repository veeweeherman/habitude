var ProfilePicture = React.createClass({
	  getInitialState: function(){ // SET INITIAL STATE TO INCLUDE THE PARAMS OF THE ITEMS YOU NEED FROM THE DB-RETURN-OBJECT 
    return {username: '',location: ''}
  }, 
  
  componentDidMount: function() {

    $.ajax({
        type: 'GET',
        url: '/api/nameAndLoc', /* NEEDS THE GET REQUEST FOR USERNAME AND LOCATION */
        dataType: 'json',
        success: function(data) { // After the query has returned the object, set the state's keys and values to equal the values needed from the db-query-object VERY IMPORTANT
          this.setState({
            username: data[0].username, 
            location: data[0].location
          })
          console.log('successfully retrieved username and location from the database!')
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
          console.log('failed to retrieve username and location from db :( ');
        }.bind(this)
    })
  },
	render: function(){
		return (
			<div>
        <img className="img-circle" src={'http://thesource.com/wp-content/uploads/2015/05/R_-Kelly-new-album-buffet-110x110.jpg'} />
        <p>Hello, {this.state.username}!</p>
        <p>LOCATION: {this.state.location}</p>
          <div className="panel-body">
            <div className="expandable expandable-indicator-white expandable-trigger">
              <div className="expandable-content">
                <p>Aloha! Im Robert and I like to make music.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem delectus dolorum necessitatibus neque odio quam quas qui quod soluta? Aliquid eius esse minima.</p>
              </div>
            </div>
          </div>
      </div>
    ) 
	}
})// pulls the image for user's profile
// TODO: photo needs to be queried from db of users'profile photos
React.render(<ProfilePicture/>, document.getElementById("picnameloc"))




