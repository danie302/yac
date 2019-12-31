// Dependencies
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { store } from '../redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// Components
import Navbar from '@components/navbar';
import Footer from '@components/footer';

export default withRedux(store, { debug: false })(
    class MyApp extends App {
        constructor(props) {
            super(props);
            this.persistor = persistStore(props.store);
        }
        static async getInitialProps({ Component, ctx }) {
            return {
                pageProps: {
                    ...(Component.getInitialProps
                        ? await Component.getInitialProps(ctx)
                        : {})
                }
            };
        }
        render() {
            const { Component, pageProps, store } = this.props;
            return (
                <Provider store={store}>
                    <PersistGate
                        loading={<Component {...pageProps} />}
                        persistor={this.persistor}
                    >
                        <Navbar />
                        <Component {...pageProps} />
                        <Footer />
                    </PersistGate>
                </Provider>
            );
        }
    }
);
