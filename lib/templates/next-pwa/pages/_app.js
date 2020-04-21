import React from 'react'
import App, { Container } from 'next/app'

import Header from '../components/Header'
import OfflineSupport from '../components/OfflineSupport'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Header />
        <OfflineSupport />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default CustomApp
