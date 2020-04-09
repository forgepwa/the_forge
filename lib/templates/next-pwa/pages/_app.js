// import App from 'next/app'
import React from "react";
import App, { Container } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../lib/getPageContext";

class MyApp {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }
  pageContext = null;
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <JssProvider
        registry={this.pageContext.sheetsRegistry}
        generatedId={this.pageContext.generateClassName}
      >
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on the server side. */}
          <Component pageContext={this.pageContext} {...pageProps} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
