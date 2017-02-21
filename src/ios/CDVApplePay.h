#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>

#import <PassKit/PassKit.h>

NSString* const AP_PAYMENTS_AVAILABLE = @"available";
NSString* const AP_PAYMENTS_NOT_SUPPORTED = @"not_supported";
NSString* const AP_PAYMENTS_UNSUPPORTED_CARDS = @"unsupported_cards";

typedef void (^ARAuthorizationBlock)(PKPaymentAuthorizationStatus);
typedef void (^ARAuthorizationSelectShippingMethodBlock)(PKPaymentAuthorizationStatus, NSArray<PKPaymentSummaryItem *> *);

@interface CDVApplePay : CDVPlugin <PKPaymentAuthorizationViewControllerDelegate>
{
    PKMerchantCapability merchantCapabilities;
    NSArray<NSString *>* supportedPaymentNetworks;
}

@property (nonatomic, strong) ARAuthorizationBlock paymentAuthorizationBlock;
@property (nonatomic, strong) ARAuthorizationSelectShippingMethodBlock paymentAuthorizationSelectShippingMethodBlock;

@property (nonatomic, strong) NSString* paymentCallbackId;

- (void)makePaymentRequest:(CDVInvokedUrlCommand*)command;
- (void)canMakePayments:(CDVInvokedUrlCommand*)command;
- (void)completeLastTransaction:(CDVInvokedUrlCommand*)command;
- (void)completeLastSelectShippingMethod:(CDVInvokedUrlCommand*)command;

@end
