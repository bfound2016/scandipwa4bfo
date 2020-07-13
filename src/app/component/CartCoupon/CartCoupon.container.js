/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import CartCoupon from './CartCoupon.component';

/** @namespace Component/CartCoupon/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    applyCouponToCart: couponCode => CartDispatcher.applyCouponToCart(dispatch, couponCode),
    removeCouponFromCart: () => CartDispatcher.removeCouponFromCart(dispatch)
});

/** @namespace Component/CartCoupon/Container */
export class CartCouponContainer extends ExtensiblePureComponent {
    static propTypes = {
        couponCode: PropTypes.string,
        applyCouponToCart: PropTypes.func.isRequired,
        removeCouponFromCart: PropTypes.func.isRequired
    };

    static defaultProps = {
        couponCode: ''
    };

    containerFunctions = {
        handleApplyCouponToCart: this.handleApplyCouponToCart.bind(this),
        handleRemoveCouponFromCart: this.handleRemoveCouponFromCart.bind(this)
    };

    state = { isLoading: false };

    handleApplyCouponToCart(couponCode) {
        const { applyCouponToCart } = this.props;

        this.setState({ isLoading: true });

        applyCouponToCart(couponCode).then(
            /** @namespace Component/CartCoupon/Container/applyCouponToCartThen */
            () => this.setState({ isLoading: false })
        );
    }

    handleRemoveCouponFromCart() {
        const { removeCouponFromCart } = this.props;

        this.setState({ isLoading: true });

        removeCouponFromCart().then(
            /** @namespace Component/CartCoupon/Container/removeCouponFromCartThen */
            () => this.setState({ isLoading: false })
        );
    }

    render() {
        return (
            <CartCoupon
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

/** @namespace Component/CartCoupon/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartCouponContainer);