// var KudosButton = React.createClass({
// 		giveKudos: function(updateID){ // method gets fires on button-click
//       console.log('updateID',updateID)
// 		$.ajax({
//       url: '/api/giveKudos',
//       type: 'POST',   // PUT request to update kudos_count value in the db
//       contentType: 'application/json',
//       dataType: 'json',
//       success: function(data) { // IDK why no success msg sent but in console success message from db-query
//       	this.setState({data:data})
//         console.log('successful thumbs up')
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
// 	},

// 	render: function(){
//     console.log('what is this',this)
//     return (
//     	<div >
// 	  		<button type="submit" onClick={this.giveKudos.bind(activity)}>THUMBS UP</button>
//       </div>
//     ) 
//   }
// })

var ActivityFeed = React.createClass({ //parent component

	loadActivitiesFromServer: function() { //loads data for the activity feed
    $.ajax({
      url: '/api/activityFeed',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('success from the load activities DATA', data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  giveKudos: function(updateID){ // method gets fires on button-click
    console.log('updateID',updateID)
    $.ajax({
      type: 'POST',   // PUT request to update kudos_count value in the db
      data: updateID,
      dataType: 'json',
      url: '/api/giveKudos',
      success: function(updateID) { // IDK why no success msg sent but in console success message from db-query
        console.log('data',updateID)
        // this.setState({data:data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() { // initial state is empty until our get request returns with the data
    return {data: []};
  },
  componentDidMount: function() { // this method fires before the intitial render
    this.loadActivitiesFromServer();
  },
        	// <table><tbody>
         //    <tr>
         //      <td>{activity.username+': '+activity.habit+' at '+activity.update_time+' with '+activity.kudos_count+' kudos'}</td>
         //      <td><button type="submit" onClick={this.giveKudos.bind(this,activity.update_id)}>THUMBS UP</button></td>
         //    </tr>
         //  </tbody></table>
  render: function() {
    var activityNodes = this.state.data.map(function(activity,i,list){ //iterating thru array of objects returned from db query, and gives each activity its own kudos button
      return (
        
          <div className="row">
                <div>
                  <div className="panel panel-default">
                    <div className="table-responsive">
                      <table className="table v-middle">
                        <thead>
                          <tr>
                            <th width="20">
                            </th>
                            <th>Date</th>
                            <th>Username</th>
                            <th>Habit</th>
                            <th className="text-right">Kudos</th>
                          </tr>
                        </thead>
                        <tbody id="responsive-table-body">
                          <tr>
                            <td>
                            </td>
                            <td><span className="label label-default">{activity.update_time}</span></td>
                            <td>{activity.username}</td>
                            <td>{activity.habit}</td>
      
                            <td className="text-right">
                              <a href="#" className="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-thumbs-o-up"></i></a>
                              
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
              </div>
       );
    }.bind(this));
    return (
      <div className="ActivityFeed"><h1>Activity Feed</h1>{activityNodes}</div>  
    );
  }
})

React.render(<ActivityFeed  />, document.getElementById('activityfeed'))