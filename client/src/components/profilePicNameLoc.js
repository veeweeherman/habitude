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

    //ENTIRE PROF SIDEBAR GOES HERE

		return (
			<div className="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-visible-desktop sidebar-visible-mobile sidebar-skin-dark" id="sidebar-menu">
        <div data-scrollable>
          <div className="sidebar-block">
            <div className="profile">  
              <img className="img-circle" src={'http://thesource.com/wp-content/uploads/2015/05/R_-Kelly-new-album-buffet-110x110.jpg'} />
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


// <div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-visible-desktop sidebar-visible-mobile sidebar-skin-dark" id="sidebar-menu">
          // <div data-scrollable>
          //   <div class="sidebar-block">
          //      <div class="profile">
                // <img src="https://31.media.tumblr.com/avatar_b7c10b711491_128.png" alt="people" class="img-circle" />
                // <h4>R Kelly</h4>
                // <p>Berkeley, CA</p>
                // <p>Hi, my name is Robert and I want to develop better habits</p>
      //          </div>
      //       </div>
              
      //     </div>
      // </div>














