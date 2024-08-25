#import "AppDelegate.h"
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
// #import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>


@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"zoopTime";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
[AppCenterReactNative register];
[AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
[AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

@implementation UIViewController (CustomHomeIndicator)
- (BOOL)prefersHomeIndicatorAutoHidden {
  return YES; // Hides the home indicator
}


@end
