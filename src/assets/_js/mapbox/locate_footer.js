import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlText from '@mapbox/react-control-text';
import validateRequired from '@mapbox/frontend-util-validators/dist/validate-required';
import validateEmail from '@mapbox/frontend-util-validators/dist/validate-email';
import Form from '@mapbox/react-form';

import { Limiter } from '../../components/limiter';
import { LocateFooterGraphic } from '../../svg/components/locate_footer_graphic';

let LocateFooter = class LocateFooter extends Component {
  fallbackTimeout = null;
  state = {
    isRegistrationStatusDetermined: false,
    isFormSubmitted: false
  };

  componentDidMount() {
    // Only after analytics.ready is analytics.user available to us. So we want
    // to wait for that.
    analytics.ready(() => {
      this.determineRegistrationStatus();
    });
    this.fallbackTimeout = setTimeout(() => {
      if (!this.state.isRegistrationStatusDetermined) {
        this.determineRegistrationStatus();
      }
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.fallbackTimeout);
  }

  determineRegistrationStatus = () => {
    // Attempt to retrieve a custom attribute from the Segment-identified user.
    const user = typeof analytics.user === 'function' && analytics.user();
    if (user) {
      const hasRegisteredForLocate =
        typeof user.traits === 'function' &&
        user.traits().registered_for_locate === true;
      this.setState({
        isRegistrationStatusDetermined: true,
        isFormSubmitted: hasRegisteredForLocate
      });
    } else {
      this.setState({ isRegistrationStatusDetermined: true });
    }
  };

  handleFormSubmit = formData => {
    this.setState({ isFormSubmitted: true });
    analytics.identify(formData.email, {
      registered_for_locate: true,
      email: formData.email
    });
    analytics.track('Registered for Event', {
      conference: 'user-conference'
    });
  };

  renderForm = (getControlProps, onSubmit) => {
    return (
      <div>
        <p className="txt-bold mb12">Sign up for updates</p>
        <div className="flex-parent-mm">
          <div className="flex-child-mm flex-child--grow-mm">
            <ControlText
              {...getControlProps('email')}
              themeControlInput="txt-m py3 px12 pr0-mm input input--locate border border--blue border--2 border-r--0-mm round unround-tr-mm unround-br-mm color-white placeholder-white"
            />
          </div>
          <div className="flex-child-mm flex-child--no-shrink-mm mt12 mt0-mm">
            <button
              className="btn btn--stroke btn--stroke--2 border--blue txt-s txt-m py3 px24 round unround-tl-mm unround-bl-mm h36 w-full w-auto-mm"
              type="submit"
              onClick={onSubmit}
            >
              <span className="color-white">Tell me more</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderSignupForm() {
    if (!this.state.isRegistrationStatusDetermined) {
      return <div className="loading loading--dark" />;
    }

    if (this.state.isFormSubmitted) {
      return <p className="txt-bold">Stay tuned for updates!</p>;
    }

    const formConfig = {
      email: {
        placeholder: 'Enter your email',
        validator: [validateRequired('email'), validateEmail],
        type: 'email',
        initialValue: this.props.user ? this.props.user.email : ''
      }
    };

    return (
      <Form
        handleFormData={this.handleFormSubmit}
        config={formConfig}
        renderForm={this.renderForm}
      />
    );
  }

  render() {
    return (
      <div className="flex-child flex-child--no-grow bg-black color-white relative z1">
        <Limiter extraClasses="pt60 py120">
          <div className="flex-parent-mxl flex-parent--space-between-main-mxl">
            <div className="flex-child-mxl mb36 mb0-mxl">
              <div className="mb12">
                <a className="txt-l txt-bold link" href="/locate">
                  Locate 2018
                </a>
              </div>
              <a
                className="block inline-block-mm link link--white mb12 mb0-mm mr36-mm"
                href="/locate/faq"
              >
                FAQ
              </a>
              <a
                className="block inline-block-mm link link--white mb12 mb0-mm mr36-mm"
                href="/locate/terms"
              >
                Terms &amp; Conditions
              </a>
              <a
                className="block inline-block-mm link link--white mb12 mb0-mm mr36-mm"
                href="/locate/conduct"
              >
                Code of Conduct
              </a>
              <a
                className="block inline-block-mm link link--white"
                href="mailto:locate@mapbox.com"
              >
                locate@mapbox.com
              </a>
            </div>
            <div className="flex-child-mxl relative hmin36 w360-mm">
              {this.renderSignupForm()}
            </div>
          </div>
        </Limiter>
        <div className="w-full h30 relative">
          <LocateFooterGraphic
            className="absolute h30 wmin-full offset-50p-xy"
            style={{ left: '50%', top: '50%' }}
          />
        </div>
      </div>
    );
  }
};

// function mapStateToProps(state): { user: ?User } {
//   return {
//     user: state.user
//   };
// }

LocateFooter = connect(mapStateToProps)(LocateFooter);

export { LocateFooter };