// var Sentence = React.createClass({ // 
//   render: function() {
//     var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
//     return (
//       <div className="sentence">
//       <h2 className="user_id">{this.props.user_id}</h2>
//       <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
//       </div>
//       );
//   }
// });

// var ActivityFeed = React.createClass({ // parent component
//   loadSentencesFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data}); //TODO check over this
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url);
//         console.error(status);
//         console.log(err.toString());
//       }.bind(this)
//     });
//   },
//   getInitialState: function() {
//     return {data: []}; // TODO: check over this
//   },
//   componentDidMount: function() {
//     this.loadSentencesFromServer();
//     setInterval(this.loadSentencesFromServer, this.props.pollInterval); // retrieves habits from db on interval
//   },
//   render: function(){
//     return (
//     	<div>
// 	      <h3>Activity Feed</h3>
//       </div>
//     ) 
//   }
// })

// var SentenceList = React.createClass({ // updates the habits db with new entry and maps over the entire list of habits and displays to page

//   giveKudos: function(sentence, update){
//     $.ajax({
//       url: '/api/giveKudos',
//       type: 'PUT',
//       data: sentence,
//       dataType: 'json',
//       success: function(data) {
//       	this.setState()
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });

//   },
//   getInitialState: function(){
//   	return {user_id: 1}
//   },

//   render: function() {

//     var sentenceNodes = this.props.data.map(function(sentence, index) {
//       if (sentence.count === undefined) {
//         sentence.count = 0;
//       }
//       return (
//         <table><tbody>
//         <tr><td>
//         <button type="submit" formMethod="post" onClick={this.giveKudos.bind(this, sentence)}>GIVE KUDOS</button></td><td>
//         <Sentence user_id={sentence.user_id} key={index}>
//         {sentence.sentence+' '+(sentence.count-1)} 
//         </Sentence></td>
//       	</tr>
//         </tbody></table>
//         );
//     }.bind(this));
//     return (
//       <div className="SentenceList">{sentenceNodes}</div>
//       );
//   }
// });

var ActivityFeed = React.createClass({
	giveKudos: function(){
		console.log('THIS',this);
		console.log('arguemnts',arguments)
		$.ajax({
      url: '/api/giveKudos',
      type: 'PUT',
      
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
      	this.setState({data:data})
    	console.log('some shit might be working?')
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	// getInitialState: function(){
	// 	return {data:''}
	// },
	render: function(){
    return (
    	<div>
	      <h3>Activity Feed</h3>
	      <button type="submit" onClick={this.giveKudos.bind(this)}>THUMBS UP</button>
      </div>
    ) 
  }
})

React.render(<ActivityFeed pollInterval={1000} url={'/api/giveKudos'} count={0}/>, document.getElementById('activityfeed'))