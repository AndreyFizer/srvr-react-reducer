import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component {
    
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <li>
                    <Link className="btn-flat" to="/signout">Sign out</Link>
                </li>
            );
        }
    
        return [
            <li>
                <Link key={1} className="btn-flat" to="signin">Sign in</Link>
            </li>,
            <li>
                <Link key={2} className="btn-flat" to="signup">Sign up</Link>
            </li>
        ];
    }
    
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">React Sever App</Link></li>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Header);
