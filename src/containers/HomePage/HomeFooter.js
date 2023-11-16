import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class HomeFooter extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2023 nhanlunars. More infomation, please visit my facebook.
                    <a target='_blank' href='https://www.facebook.com/nhanlunars'> &#8594; Click here &#8592; </a> </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
