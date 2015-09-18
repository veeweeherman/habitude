var Counter = React.createClass({ 
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div className="count">
        
        {this.state.count}  <input type="image" className="thumb" onClick={this.incrementCount} src="https://www.emojibase.com/resources/img/emojis/android/1f44d.png" alt="Submit" width="20" height="20"/>
      </div>
    );
  }
});
        // <p>{this.state.count} kudos</p>

var ActivityFeed = React.createClass({ //parent component

  loadActivitiesFromServer: function() { //loads data for the activity feed
    $.ajax({
      url: '/api/activityFeed',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  giveKudos: function(updateID){ // method gets fired on button-click
    $.ajax({
      type: 'POST',   // PUT request to update kudos_count value in the db
      data: updateID,
      dataType: 'json',
      url: '/api/giveKudos',
      success: function(updateID) { 
        console.log('Successfully gave kudos');
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
                            <td><span className="label label-default">{(new Date(activity.update_time)).toString().substring(0,24)}</span></td>
                            <td>{activity.username}</td>
                            <td>{activity.habit}</td>
      
                            <td className="text-right">
                              <Counter/>
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

                              // <a href="#" className="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Edit">+1</a>
React.render(<ActivityFeed />, document.getElementById('activityfeed'))
