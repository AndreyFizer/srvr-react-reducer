import React from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
    class Auth extends React.Component {
        
        static get contextTypes() {
            return {
                router: React.PropTypes.object
            }
        }
        
        componentWillMount() {
            if (!this.props.auth) {
                this.context.router.push('/welcome');
            }
        }
        
        componentWillUpdate(nextProps) {
            if (!nextProps.auth) {
                this.context.router.push('/welcome');
            }
        }
        
        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    
    function mapStateToProps(state) {
        return {auth: state.auth.authenticated};
    }
    
    return connect(mapStateToProps)(Auth);
}
