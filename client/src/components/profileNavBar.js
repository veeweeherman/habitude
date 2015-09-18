var ProfNav = React.createClass({
  render: function() {
    return (
      <div>
      <div className="navbar navbar-main navbar-primary navbar-fixed-top" role="navigation">
            <div className="container-fluid">


              <div className="navbar-header">

                <a href="#sidebar-menu" data-effect="st-effect-1" data-toggle="sidebar-menu" className="toggle pull-left visible-xs"><i className="fa fa-ellipsis-v"></i></a>
                
                <a href="#sidebar-chat" data-toggle="sidebar-menu" data-effect="st-effect-1" className="toggle pull-right visible-xs"><i className="fa fa-comments"></i></a>
                <a className="navbar-brand" href="index.html">Habitude</a>
              </div>



              <div className="collapse navbar-collapse" id="main-nav">
                <ul className="nav navbar-nav">
                  <li><a href="../../../index.html">About</a></li>
                
                 
                </ul>
                <ul className="nav navbar-nav navbar-right">
                 
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle user" data-toggle="dropdown">
                      <img src="https://31.media.tumblr.com/avatar_b7c10b711491_128.png" alt="Bill" className="img-circle" width="40" /> R Kelly <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" role="menu">
                      <li className="active"><a href="user-private-profile.html">Profile</a></li>
                      <li><a href="login.html">Logout</a></li>
                    </ul>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <div className="st-pusher" id="content">
      <div className="st-content">
        <div className="st-content-inner">
          <nav className="navbar navbar-subnav navbar-static-top" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#subnav">
                  <span className="sr-only"></span>
                  <span className="fa fa-ellipsis-h"></span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </div>

    )
  }
});

React.render(<ProfNav/>, document.getElementById('profnavbar'))


