var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var executeCallback = function(callback, message) {
    if (typeof callback === 'function') {
        callback(message);
    }
};

var ApplePay = {

    PAYMENTS_AVAILABLE: 'available',
    PAYMENTS_NOT_SUPPORTED: 'not_supported',
    PAYMENTS_UNSUPPORTED_CARDS: 'unsupported_cards',

    /**
     * Determines if the current device supports Apple Pay and has a supported card installed.
     * @param {Function} [successCallback] - Optional success callback, recieves message object.
     * @param {Function} [errorCallback] - Optional error callback, recieves message object.
     * @returns {Promise}
     */
    canMakePayments: function(successCallback, errorCallback) {
        return new Promise(function(resolve, reject) {
            exec(function(message) {
                executeCallback(successCallback, message);
                resolve(message);
            }, function(message) {
                executeCallback(errorCallback, message);
                reject(message);
            }, 'ApplePay', 'canMakePayments', []);
        });

    },

    /**
     * Opens the Apple Pay sheet and shows the order information.
     * @param {Function} [successCallback] - Optional success callback, recieves message object.
     * @param {Function} [errorCallback] - Optional error callback, recieves message object.
     * @param {Function} [updateCallback] - Optional update callback, recieves event object when an user changes the Apple Pay form.
     * @returns {Promise}
     */
    makePaymentRequest: function(order, successCallback, errorCallback, updateCallback) {

        if (order) {
            order.triggerSelect = !!updateCallback;
        }

        return new Promise(function(resolve, reject) {
            exec(function(message) {
                if (message && message.event) {
                    executeCallback(updateCallback, message);
                } else {
                    executeCallback(successCallback, message);
                    resolve(message);
                }
            }, function(message) {
                executeCallback(errorCallback, message);
                reject(message);
            }, 'ApplePay', 'makePaymentRequest', [order]);
        });

    },

    /**
     * While the Apple Pay sheet is still open, and the callback from the `makePaymentRequest` has completed,
     * this call will pass the status to the sheet and close it if successfull.
     * @param {Function} [successCallback] - Optional success callback, recieves message object.
     * @param {Function} [errorCallback] - Optional error callback, recieves message object.
     * @returns {Promise}
     */
    completeLastTransaction: function(status, successCallback, errorCallback) {

        return new Promise(function(resolve, reject) {
            exec(function(message) {
                executeCallback(successCallback, message);
                resolve(message);
            }, function(message) {
                executeCallback(errorCallback, message);
                reject(message);
            }, 'ApplePay', 'completeLastTransaction', [status]);
        });

    },

    /**
     * Every time the user select a different shipping method a callback is issued on makePaymentRequest
     * @param {Function} [successCallback] - Optional success callback, recieves message object.
     * @param {Function} [errorCallback] - Optional error callback, recieves message object.
     * @returns {Promise}
     */
    completeLastSelectShippingMethod: function(status, summaryItems, successCallback, errorCallback) {

        return new Promise(function(resolve, reject) {
            exec(function(message) {
                executeCallback(successCallback, message);
                resolve(message);
            }, function(message) {
                executeCallback(errorCallback, message);
                reject(message);
            }, 'ApplePay', 'completeLastSelectShippingMethod', [{ status: status, items: summaryItems }]);
        });

    }

};

module.exports = ApplePay;
