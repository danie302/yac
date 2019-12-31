// Dependencies
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { store } from '../redux';

// Components
import Navbar from '@components/navbar';
import Footer from '@components/footer';

export default withRedux(store, { debug: false })(
    class MyApp extends App {
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
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </Provider>
            );
        }
    }
);
