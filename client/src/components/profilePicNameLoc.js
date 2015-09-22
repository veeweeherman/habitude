var ProfilePicture = React.createClass({
	  getInitialState: function(){ // SET INITIAL STATE TO INCLUDE THE PARAMS OF THE ITEMS YOU NEED FROM THE DB-RETURN-OBJECT 
    return {username: '',location: ''}
  }, 
  
  componentDidMount: function() {

    $.ajax({
        type: 'GET',
        url: '/api/nameAndLoc', 
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
			<div className="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-visible-desktop sidebar-visible-mobile sidebar-skin-dark" id="sidebar-menu">
        <div data-scrollable>
          <div className="sidebar-block">
            <div className="profile">  
              <h1>.</h1>
              <img className="img-circle" src={'http://i.imgur.com/eWVQuDJ.png'} />
              <h4>{this.state.username}</h4>
              <p>{this.state.location}</p>
              <p>Hello from the profilepicname component</p>
               <div className="panel-body">
                  <div className="expandable expandable-indicator-white expandable-trigger">
              <div className="expandable-content">
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    ) 
	}

})// pulls the image for user's profile
// TODO: photo needs to be queried from db of users'profile photos

React.render(<ProfilePicture/>, document.getElementById("picnameloc"))

