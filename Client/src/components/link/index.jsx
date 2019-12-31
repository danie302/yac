// Dependencies
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import NextLink from 'next/link';

class Link extends PureComponent {
    render() {
        const { href, children, className, onClick } = this.props;
        const linkProps = {
            onClick,
            className
        };

        return (
            <NextLink as={href} href={href}>
                <a {...linkProps}>{children}</a>
            </NextLink>
        );
    }
}

Link.propTypes = {
    children: propTypes.oneOfType([
        propTypes.array,
        propTypes.element,
        propTypes.string
    ]).isRequired,
    className: propTypes.string,
    onClick: propTypes.func
};

export default Link;
